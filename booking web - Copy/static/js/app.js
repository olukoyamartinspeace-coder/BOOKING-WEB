
// API Configuration
const API_BASE = '/api';

// State
let currentDate = new Date();
let currentFilter = 'all';
let selectedSlot = null;
let allSlots = [];

// DOM Elements
const slotsContainer = document.getElementById('slots-container');
const currentDateDisplay = document.getElementById('current-date-display');
const studioFilter = document.getElementById('studio-filter');
const modal = document.getElementById('booking-modal'); // Assuming I forgot id="booking-modal" in CSS/HTML connection? No, I added it.
const modalSlotDetails = document.getElementById('modal-slot-details');
const bookingForm = document.getElementById('booking-form');
const toast = document.getElementById('toast');

// Initial Setup
const init = () => {
    updateDateDisplay();
    loadSlots();

    // Event Listeners
    document.getElementById('prev-date').addEventListener('click', () => changeDate(-1));
    document.getElementById('next-date').addEventListener('click', () => changeDate(1));

    // Admin Login Trigger
    const adminBtn = document.getElementById('admin-login-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            window.location.href = '/dashboard';
        });
    }

    studioFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderSlots();
    });

    // Close modal on outside click
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
};

const updateDateDisplay = () => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    currentDateDisplay.textContent = currentDate.toLocaleDateString('en-US', options);
};


const changeDate = (days) => {
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    loadSlots(); // Reload new random slots for the new date
};

const loadSlots = async () => {
    slotsContainer.innerHTML = '<div class="slot-loading"><div class="spinner"></div><p>Loading...</p></div>';

    try {
        const dateStr = currentDate.toISOString().split('T')[0];
        const response = await fetch(`${API_BASE}/slots?date=${dateStr}`);

        if (!response.ok) throw new Error('Failed to fetch slots');

        allSlots = await response.json();
        renderSlots();
    } catch (error) {
        console.error('Error:', error);
        slotsContainer.innerHTML = '<div class="slot-loading"><p>Error loading slots</p></div>';
    }
};

const renderSlots = () => {
    slotsContainer.innerHTML = '';

    const filteredSlots = allSlots.filter(slot => {
        if (currentFilter === 'all') return true;
        return slot.type === currentFilter;
    });

    if (filteredSlots.length === 0) {
        slotsContainer.innerHTML = '<p class="no-slots">No slots available for this filter.</p>';
        return;
    }

    filteredSlots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = `slot-card ${slot.status}`;
        if (slot.status === 'booked') {
            slotEl.classList.add('booked');
            slotEl.innerHTML = `
                <div class="slot-time">${slot.displayTime}</div>
                <div class="slot-status">Booked</div>
            `;
        } else {
            slotEl.onclick = () => openBookingModal(slot);
            slotEl.innerHTML = `
                <div class="slot-time">${slot.displayTime}</div>
                <div class="slot-status">Available</div>
                <div class="slot-type">${slot.type === 'studio-a' ? 'Studio A' : 'Radio 101'}</div>
            `;
        }
        slotsContainer.appendChild(slotEl);
    });
};

const openBookingModal = (slot) => {
    selectedSlot = slot;
    modal.classList.add('active'); // Wait, check CSS for .active
    document.querySelector('.modal').classList.add('active'); // Wait, modal *is* element with class 'modal'

    // It seems I have <div id="booking-modal" class="modal hidden"> in HTML
    const m = document.getElementById('booking-modal');
    m.classList.remove('hidden');
    m.classList.add('active');

    modalSlotDetails.textContent = `${slot.type === 'studio-a' ? 'Recording Studio A' : 'Radio Station 101'} • ${slot.displayTime} • ${slot.price}`;
};

const closeModal = () => {
    const m = document.getElementById('booking-modal');
    m.classList.remove('active');
    setTimeout(() => m.classList.add('hidden'), 300); // Allow animation to finish
    selectedSlot = null;
    bookingForm.reset();
};

const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) return;

    // Simulate API Submission
    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bookingData,
                slotId: selectedSlot.id
            })
        });

        const result = await response.json();

        if (result.success) {
            closeModal();
            showToast('Booking Confirmed!');
            // Refresh slots to see the newly booked slot
            loadSlots();
        } else {
            alert(result.message || 'Booking failed');
        }
    } catch (error) {
        console.error('Booking Error:', error);
        alert('An error occurred while booking. Please try again.');
    }
};

const showToast = (message) => {
    const t = document.getElementById('toast');
    const msgEl = t.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;

    t.classList.remove('hidden');
    // Force reflow to enable transition from hidden state if needed
    void t.offsetWidth;
    t.classList.add('active');

    setTimeout(() => {
        t.classList.remove('active');
        setTimeout(() => {
            if (!t.classList.contains('active')) {
                t.classList.add('hidden');
            }
        }, 500); // Wait for transition to finish
    }, 3000);
};

// Utils
const scrollToBooking = () => {
    const el = document.getElementById('booking');
    el.scrollIntoView({ behavior: 'smooth' });
};

// Run Init
window.addEventListener('DOMContentLoaded', init);
