class LoginView {
    constructor() {
      this.form = document.getElementById("loginForm");
      this.usernameInput = document.getElementById("username");
      this.passwordInput = document.getElementById("password");
      this.errorMessage = document.createElement("div");
      this.errorMessage.className = "error-message";
      this.form.insertBefore(this.errorMessage, this.form.querySelector(".form-group"));
    }
  
    bindLogin() {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();
        // Mock login: Redirect to dashboard if credentials match "admin"/"admin123"
        if (username === "admin" && password === "admin123") {
          this.clearError();
          window.location.href = "dashboard.html";
        } else {
          this.displayError("Invalid username or password. Try 'admin'/'admin123' for demo.");
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