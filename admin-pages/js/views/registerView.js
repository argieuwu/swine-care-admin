class RegisterView {
    constructor() {
        this.form = document.getElementById("registerForm");
        this.inputs = this.form.querySelectorAll('input');
        this.errorMessage = document.createElement("div");
        this.errorMessage.className = "error-message";
        this.form.insertBefore(this.errorMessage, this.form.querySelector(".btn"));
        this.bindInputEvents();
        this.bindPasswordToggle();
        this.bindFormSubmit();

        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            this.updateLabelState(input, formGroup);
        });
    }

    bindInputEvents() {
        this.inputs.forEach(input => {
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

    updateLabelState(input, formGroup) {
        const hasValue = input.value.trim() !== '';
        formGroup.classList.toggle('has-filled', hasValue);
    }

    bindPasswordToggle() {
        const toggle = this.form.querySelector('.toggle-password');
        const passwordInput = this.form.querySelector('#password');
        if (toggle && passwordInput) {
            toggle.addEventListener('click', () => {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                toggle.querySelector('.toggle-text').textContent = isPassword ? 'Hide' : 'Show';
                toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });
        }
    }

    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.clearError();

            const username = this.form.querySelector('#username').value.trim();
            const email = this.form.querySelector('#email').value.trim();
            const password = this.form.querySelector('#password').value.trim();

            if (username.length < 3) {
                this.displayError("Username must be at least 3 characters long.");
                return;
            }
            if (!this.isValidEmail(email)) {
                this.displayError("Please enter a valid email address.");
                return;
            }
            if (password.length < 6) {
                this.displayError("Password must be at least 6 characters long.");
                return;
            }

            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            setTimeout(() => {
                button.classList.remove("loading");
                alert("Registration successful (mock)! Redirecting to login...");
                window.location.href = "login.html";
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

    clearError() {
        this.errorMessage.textContent = "";
        this.errorMessage.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new RegisterView();
});