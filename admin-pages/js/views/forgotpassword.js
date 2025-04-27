class ForgotPasswordView {
    constructor() {
        this.form = document.getElementById("forgotPasswordForm");
        this.inputs = this.form.querySelectorAll('input');
        
        // Create error message element
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        
        // Create success message element
        this.successMessage = document.createElement("div");
        this.successMessage.className = "success-message";
        
        // Insert messages before the button
        const submitButton = this.form.querySelector(".btn");
        this.form.insertBefore(this.errorMessage, submitButton);
        this.form.insertBefore(this.successMessage, submitButton);
        
        // Initialize the input states
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
        
        // Set up event listeners
        this.bindInputEvents();
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
    
    // Handle form submission
    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            // Clear any existing messages
            this.clearMessages();
            
            // Get email value
            const email = this.form.querySelector('#email').value.trim();
            
            // Basic validation
            if (!email) {
                this.displayError("Please enter your email address.");
                return;
            }
            
            // Email format validation
            if (!this.isValidEmail(email)) {
                this.displayError("Please enter a valid email address.");
                return;
            }
            
            // Show loading state
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            
            // Simulate password reset request delay
            setTimeout(() => {
                // Remove loading state
                button.classList.remove("loading");
                
                // Show success message
                this.displaySuccess("Password reset link has been sent to your email address. Please check your inbox.");
                
                // Clear the form
                this.form.reset();
                this.inputs.forEach(input => {
                    const formGroup = input.closest('.form-group');
                    this.updateLabelState(input, formGroup);
                });
                
                // After a few seconds, redirect back to login page
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 5000);
            }, 1500);
        });
    }
    
    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Display error message
    displayError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = "block";
    }
    
    // Display success message
    displaySuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = "block";
    }
    
    // Clear all messages
    clearMessages() {
        this.errorMessage.textContent = "";
        this.errorMessage.style.display = "none";
        
        this.successMessage.textContent = "";
        this.successMessage.style.display = "none";
    }
}

// Initialize the forgot password view when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ForgotPasswordView();
});