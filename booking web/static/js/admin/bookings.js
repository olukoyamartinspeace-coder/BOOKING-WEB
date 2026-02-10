document.addEventListener('DOMContentLoaded', () => {
    console.log('Bookings Manager Loaded');

    // Example: Delete button confirmation
    const deleteButtons = document.querySelectorAll('.btn-icon.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
                // Remove row simply for demo
                e.target.closest('tr').remove();
                // In real app -> call API
            }
        });
    });
});
