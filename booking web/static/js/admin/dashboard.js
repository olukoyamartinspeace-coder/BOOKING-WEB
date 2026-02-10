document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);

    // Placeholder for fetching stats
    console.log('Admin Dashboard Loaded');
});

// Logout function placeholder
document.querySelector('.logout-btn').addEventListener('click', (e) => {
    // In a real app, this would clear the session token
    console.log('Logging out...');
});
