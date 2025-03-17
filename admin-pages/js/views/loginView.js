class LoginView {
    constructor() {
        this.form = document.getElementById("loginForm");
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
            input.addEventListener('input', () => this.updateLabelState(input, formGroup));
            input.addEventListener('focus', () => formGroup.classList.add('has-filled'));
            input.addEventListener('blur', () => this.updateLabelState(input, formGroup));
        });
    }

    updateLabelState(input, formGroup) {
        formGroup.classList.toggle('has-filled', input.value.trim() !== '');
    }

    bindPasswordToggle() {
        const toggle = this.form.querySelector('.toggle-password');
        if (toggle) {
            const passwordInput = this.form.querySelector('#password');
            toggle.addEventListener('click', () => {
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                toggle.textContent = isPassword ? 'Hide' : 'Show';
                toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });
        }
    }

    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const button = this.form.querySelector(".btn");
            button.classList.add("loading");
            setTimeout(() => {
                button.classList.remove("loading");
                window.location.href = "overview.html"; 
            }, 1500);
        });
    }

    bindFormSubmit() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
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