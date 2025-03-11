document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
      const view = new LoginView();
      view.bindLogin();
    } else if (document.getElementById("registerForm")) {
      const view = new RegisterView();
      view.bindRegister();
    } else if (document.querySelector(".dashboard-content")) {
      const view = new DashboardView();
      view.renderStats();
      view.renderReports();
      view.bindDateFilter();
      view.bindViewDetails();
    }
  });