class ForgotPasswordView {
    constructor() {
        this.form = document.getElementById("forgotPasswordForm");
        this.inputs = this.form.querySelectorAll('input');
        
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        
        this.successMessage = document.createElement("div");
        this.successMessage.className = "success-message";
        
        const submitButton = this.form.querySelector(".btn");
        this.form.insertBefore(this.errorMessage, submitButton);
        this.form.insertBefore(this.successMessage, submitButton);
        
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
        
        this.bindInputEvents();
        this.bindFormSubmit();
    }

    bindInputEvents() {
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('input', () => {
                this.updateLabelState(input, formGroup);
            });
            
            input.addEventListener('focus', () => {
                formGroup.classList.add('has-filled');
            });
            
            input.addEventListener('blur', () => {
                this.updateLabelState(input, formGroup);
            });
        });
    }
    
    updateLabelState(input, formGroup) {
        if (input.value.trim() !== '') {
            formGroup.classList.add('has-filled');
        } else {
            formGroup.classList.remove('has-filled');
        }
    }
    
    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            this.clearMessages();
            
            const email = this.form.querySelector('#email').value.trim();
            
            if (!email) {
                this.displayError("Please enter your email address.");
                return;
            }
            
            if (!this.isValidEmail(email)) {
                this.displayError("Please enter a valid email address.");
                return;
            }
            
            const button = this.form.querySelector(".btn");
            button.classList.add("loading"); 
  
            setTimeout(() => {
                button.classList.remove("loading");
                this.displaySuccess("Password reset link has been sent to your email address. Please check your inbox.");
                this.form.reset();
                this.inputs.forEach(input => {
                    const formGroup = input.closest('.form-group');
                    this.updateLabelState(input, formGroup);
                });
                

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 5000);
            }, 1500);
        });
    }
 
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    displayError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = "block";
    }

    displaySuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = "block";
    }  

    clearMessages() {
        this.errorMessage.textContent = "";
        this.errorMessage.style.display = "none";
        
        this.successMessage.textContent = "";
        this.successMessage.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    new ForgotPasswordView();
});