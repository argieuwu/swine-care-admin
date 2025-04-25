class LogoutView {
    constructor() {
        this.logoutBtn = document.getElementById('logout-btn');
        if (this.logoutBtn) {
            this.bindLogoutEvent();
        }
    }

    bindLogoutEvent() {
        this.logoutBtn.addEventListener('click', () => {
            this.showLogoutConfirmation();
        });
    }

    showLogoutConfirmation() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-dialog">
                <h3>Logout Confirmation</h3>
                <p>Are you sure you want to logout?</p>
                <div class="modal-buttons">
                    <button class="modal-btn confirm">Yes, Logout</button>
                    <button class="modal-btn cancel">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const confirmBtn = modal.querySelector('.confirm');
        const cancelBtn = modal.querySelector('.cancel');

        confirmBtn.addEventListener('click', () => {
            // Redirect to login page
            window.location.href = 'login.html';
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Initialize logout functionality
document.addEventListener('DOMContentLoaded', () => {
    new LogoutView();
}); 