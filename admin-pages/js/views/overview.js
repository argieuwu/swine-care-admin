class OverviewView {
    constructor() {
        this.statsCards = document.querySelector(".stats-cards");
        this.reportsTableBody = document.querySelector(".reports-table tbody");
        this.alertsContainer = document.getElementById("alerts-container");
        this.dateFilter = document.getElementById("date-range");
        this.logoutBtn = document.getElementById("logout-btn"); // Still binds to sidebar button
        this.renderStats();
        this.renderReports();
        this.renderAlerts();
        this.bindDateFilter();
        this.bindViewDetails();
        this.bindLogout();
    }

    renderStats() {
        this.statsCards.innerHTML = `
            <div class="stat-card">
                <h3>Total Cases</h3>
                <div class="stat-value">147</div>
                <div class="stat-trend positive">+5 Today</div>
            </div>
            <div class="stat-card">
                <h3>Active Outbreaks</h3>
                <div class="stat-value">24</div>
                <div class="stat-trend negative">+2 Today</div>
            </div>
            <div class="stat-card">
                <h3>Affected Farms</h3>
                <div class="stat-value">89</div>
                <div class="stat-trend positive">+3 Today</div>
            </div>
            <div class="stat-card">
                <h3>Containment Rate</h3>
                <div class="stat-value">76%</div>
                <div class="stat-trend positive">+1% Today</div>
            </div>
        `;
    }

    renderReports() {
        this.reportsTableBody.innerHTML = `
            <tr>
                <td>Feb 24, 2025</td>
                <td>Juan Dela Cruz</td>
                <td>FARM-238</td>
                <td>Panabo City</td>
                <td><span class="status confirmed">Confirmed</span></td>
                <td>45 pigs</td>
                <td><button class="action-btn" data-id="1">View Details</button></td>
            </tr>
            <tr>
                <td>Feb 22, 2025</td>
                <td>Maria Santos</td>
                <td>FARM-112</td>
                <td>Tagum City</td>
                <td><span class="status suspected">Suspected</span></td>
                <td>23 pigs</td>
                <td><button class="action-btn" data-id="2">View Details</button></td>
            </tr>
            <tr>
                <td>Feb 20, 2025</td>
                <td>Pedro Reyes</td>
                <td>FARM-097</td>
                <td>Carmen</td>
                <td><span class="status resolved">Resolved</span></td>
                <td>32 pigs</td>
                <td><button class="action-btn" data-id="3">View Details</button></td>
            </tr>
        `;
    }

    renderAlerts() {
        const alerts = [
            { message: "High-risk ASF case detected in Panabo City (FARM-238)", level: "high-risk" },
            { message: "Suspected outbreak in Tagum City (FARM-112)", level: "suspected" }
        ];
        this.alertsContainer.innerHTML = alerts.map(alert => `
            <div class="alert ${alert.level}">
                <span>⚠️</span> ${alert.message}
            </div>
        `).join('');
    }

    bindDateFilter() {
        this.dateFilter.addEventListener("change", (event) => {
            const value = event.target.value;
            alert(`Date filter applied (mock): Showing data for ${value === "custom" ? "custom range" : `last ${value} days`}.`);
        });
    }

    bindViewDetails() {
        this.reportsTableBody.addEventListener("click", (event) => {
            if (event.target.classList.contains("action-btn")) {
                const id = event.target.getAttribute("data-id");
                const details = {
                    1: "Farmer: Juan Dela Cruz\nFarm: FARM-238\nLocation: Panabo City\nResult: Confirmed ASF\nAffected: 45 pigs\nImages: Skin, Leg, Nose, Ear",
                    2: "Farmer: Maria Santos\nFarm: FARM-112\nLocation: Tagum City\nResult: Suspected ASF\nAffected: 23 pigs\nImages: Skin, Leg, Nose, Ear",
                    3: "Farmer: Pedro Reyes\nFarm: FARM-097\nLocation: Carmen\nResult: Resolved\nAffected: 32 pigs\nImages: Skin, Leg, Nose, Ear"
                };
                alert(`Details for ID ${id}:\n${details[id] || "No details available."}`);
            }
        });
    }

    bindLogout() {
        this.logoutBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = "../login.html"; // Mock logout
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new OverviewView();
});