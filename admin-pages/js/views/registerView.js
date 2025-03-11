class RegisterView {
    constructor() {
      this.form = document.getElementById("registerForm");
      this.usernameInput = document.getElementById("username");
      this.emailInput = document.getElementById("email");
      this.passwordInput = document.getElementById("password");
      this.errorMessage = document.createElement("div");
      this.errorMessage.className = "error-message";
      this.form.insertBefore(this.errorMessage, this.form.querySelector(".form-group"));
    }
  
    bindRegister() {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = this.usernameInput.value.trim();
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();
        // Mock registration: Check for duplicate username "admin"
        if (username === "admin") {
          this.displayError("Username 'admin' is already taken. Try another.");
        } else {
          this.clearError();
          alert("Registration successful! Redirecting to login...");
          window.location.href = "login.html";
        }
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