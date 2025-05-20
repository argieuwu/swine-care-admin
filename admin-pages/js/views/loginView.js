class LoginView {
    constructor() {
        this.form = document.getElementById("loginForm");
        this.inputs = this.form.querySelectorAll('input');
        
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        
        const submitButton = this.form.querySelector(".btn");
        this.form.insertBefore(this.errorMessage, submitButton);
        
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
        
        this.bindInputEvents();
        this.bindPasswordToggle();
        this.bindFormSubmit();
    }
    
    // Handle input focus and blur events
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
                
                passwordInput.type = isPassword ? 'text' : 'password';
                
                toggle.textContent = isPassword ? 'Hide' : 'Show';
                
                toggle.setAttribute('aria-label', 
                    isPassword ? 'Hide password' : 'Show password');
            });
        }
    }
    
    // Handle form submission
    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            this.clearError();
            
            const username = this.form.querySelector('#username').value.trim();
            const password = this.form.querySelector('#password').value.trim();
            
            if (!username || !password) {
                this.displayError("Please enter both username and password.");
                return;
            }
            
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            
            setTimeout(() => {
                button.classList.remove("loading");
                
                window.location.href = "overview.html";
            }, 1500);
        });
    }
    
    displayError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = "block";
    }
    
    clearError() {
        this.errorMessage.textContent = "";
        this.errorMessage.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new LoginView();
});