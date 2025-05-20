class RegisterView {
    constructor() {
        this.form = document.getElementById("registerForm");
        this.inputs = this.form.querySelectorAll('input, select');
        
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
        this.bindSelectEvents();
    }
    

    bindInputEvents() {
        this.inputs.forEach(input => {
            if (input.type === 'select-one') return; 
            
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('input', () => {
                this.updateLabelState(input, formGroup);
                this.clearError();
            });
            

            input.addEventListener('focus', () => {
                formGroup.classList.add('has-filled');
            });
            

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
            
           
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            
         
            setTimeout(() => {
                
                button.classList.remove("loading");
                
           
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
    new RegisterView();
});