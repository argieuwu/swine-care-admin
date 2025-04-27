class LoginView {
    constructor() {
        this.form = document.getElementById("loginForm");
        this.inputs = this.form.querySelectorAll('input');
        
        // Create error message element if it doesn't exist yet
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        
        // Insert error message before the button
        const submitButton = this.form.querySelector(".btn");
        this.form.insertBefore(this.errorMessage, submitButton);
        
        // Initialize the input states
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
        
        // Set up event listeners
        this.bindInputEvents();
        this.bindPasswordToggle();
        this.bindFormSubmit();
    }
    
    // Handle input focus and blur events
    bindInputEvents() {
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            // Handle input changes
            input.addEventListener('input', () => {
                this.updateLabelState(input, formGroup);
            });
            
            // Handle focus
            input.addEventListener('focus', () => {
                formGroup.classList.add('has-filled');
            });
            
            // Handle blur
            input.addEventListener('blur', () => {
                this.updateLabelState(input, formGroup);
            });
        });
    }
    
    // Update the state of labels based on input value
    updateLabelState(input, formGroup) {
        if (input.value.trim() !== '') {
            formGroup.classList.add('has-filled');
        } else {
            formGroup.classList.remove('has-filled');
        }
    }
    
    // Handle password visibility toggle
    bindPasswordToggle() {
        const toggle = this.form.querySelector('.toggle-password');
        if (toggle) {
            const passwordInput = this.form.querySelector('#password');
            
            toggle.addEventListener('click', () => {
                const isPassword = passwordInput.type === 'password';
                
                // Toggle password visibility
                passwordInput.type = isPassword ? 'text' : 'password';
                
                // Update button text
                toggle.textContent = isPassword ? 'Hide' : 'Show';
                
                // Update accessibility label
                toggle.setAttribute('aria-label', 
                    isPassword ? 'Hide password' : 'Show password');
            });
        }
    }
    
    // Handle form submission
    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            // Clear any existing errors
            this.clearError();
            
            // Get input values
            const username = this.form.querySelector('#username').value.trim();
            const password = this.form.querySelector('#password').value.trim();
            
            // Basic validation
            if (!username || !password) {
                this.displayError("Please enter both username and password.");
                return;
            }
            
            // Show loading state
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            
            // Simulate authentication delay
            setTimeout(() => {
                // Remove loading state
                button.classList.remove("loading");
                
                // Redirect to dashboard
                window.location.href = "overview.html";
            }, 1500);
        });
    }
    
    // Display error message
    displayError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = "block";
    }
    
    // Clear error message
    clearError() {
        this.errorMessage.textContent = "";
        this.errorMessage.style.display = "none";
    }
}

// Initialize the login view when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new LoginView();
});