class RegisterView {
    constructor() {
        this.form = document.getElementById("registerForm");
        this.inputs = this.form.querySelectorAll('input, select');
        
        // Create error message element if it doesn't exist yet
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        
        // Insert error message before the button
        const submitButton = this.form.querySelector(".btn");
        this.form.insertBefore(this.errorMessage, submitButton);
        
        // Initialize input states
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
        
        // Set up event listeners
        this.bindInputEvents();
        this.bindPasswordToggle();
        this.bindFormSubmit();
        this.bindSelectEvents();
    }
    
    // Handle input focus and blur events
    bindInputEvents() {
        this.inputs.forEach(input => {
            if (input.type === 'select-one') return; // Skip select elements, handled separately
            
            const formGroup = input.closest('.form-group');
            
            // Handle input changes
            input.addEventListener('input', () => {
                this.updateLabelState(input, formGroup);
                this.clearError();
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
    
    // Handle select element events
    bindSelectEvents() {
        const selectElement = this.form.querySelector('select');
        if (selectElement) {
            const formGroup = selectElement.closest('.form-group');
            
            selectElement.addEventListener('change', () => {
                this.updateSelectState(selectElement, formGroup);
                this.clearError();
            });
            
            selectElement.addEventListener('focus', () => {
                formGroup.classList.add('has-filled');
            });
            
            selectElement.addEventListener('blur', () => {
                this.updateSelectState(selectElement, formGroup);
            });
        }
    }
    
    // Update the state of labels based on input value
    updateLabelState(input, formGroup) {
        if (input.value.trim() !== '') {
            formGroup.classList.add('has-filled');
        } else {
            formGroup.classList.remove('has-filled');
        }
    }
    
    // Update the state of select element labels
    updateSelectState(select, formGroup) {
        if (select.value !== '' && select.value !== null) {
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
            const email = this.form.querySelector('#email').value.trim();
            const password = this.form.querySelector('#password').value.trim();
            const role = this.form.querySelector('#role').value;
            
            // Validation
            if (username.length < 3) {
                this.displayError("Username must be at least 3 characters.");
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.displayError("Please enter a valid email address.");
                return;
            }
            
            if (password.length < 8) {
                this.displayError("Password must be at least 8 characters.");
                return;
            }
            
            if (!role) {
                this.displayError("Please select your role.");
                return;
            }
            
            // Show loading state
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            
            // Simulate registration process
            setTimeout(() => {
                // Remove loading state
                button.classList.remove("loading");
                
                // Show success message and redirect
                alert("Registration request submitted! An administrator will review your request.");
                window.location.href = "login.html";
            }, 1500);
        });
    }
    
    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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

// Initialize the register view when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new RegisterView();
});