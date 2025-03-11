class DashboardView {
    constructor() {
      this.statsCards = document.querySelector(".stats-cards");
      this.reportsTableBody = document.querySelector(".reports-table tbody");
      this.dateFilter = document.getElementById("date-range");
    }
  
    renderStats() {
      this.statsCards.innerHTML = `
        <div class="stat-card">
          <h3>Total Cases</h3>
          <div class="stat-value">147</div>
          <div class="stat-trend positive">Static Data</div>
        </div>
        <div class="stat-card">
          <h3>Active Outbreaks</h3>
          <div class="stat-value">24</div>
          <div class="stat-trend negative">Static Data</div>
        </div>
        <div class="stat-card">
          <h3>Affected Farms</h3>
          <div class="stat-value">89</div>
          <div class="stat-trend positive">Static Data</div>
        </div>
        <div class="stat-card">
          <h3>Containment Rate</h3>
          <div class="stat-value">76%</div>
          <div class="stat-trend positive">Static Data</div>
        </div>
      `;
    }
  
    renderReports() {
      this.reportsTableBody.innerHTML = `
        <tr>
          <td>Feb 24, 2025</td>
          <td>Panabo City</td>
          <td>FARM-238</td>
          <td><span class="status confirmed">Confirmed</span></td>
          <td>45 pigs</td>
          <td><button class="action-btn" data-id="1">View Details</button></td>
        </tr>
        <tr>
          <td>Feb 22, 2025</td>
          <td>Tagum City</td>
          <td>FARM-112</td>
          <td><span class="status suspected">Suspected</span></td>
          <td>23 pigs</td>
          <td><button class="action-btn" data-id="2">View Details</button></td>
        </tr>
        <tr>
          <td>Feb 20, 2025</td>
          <td>Carmen</td>
          <td>FARM-097</td>
          <td><span class="status resolved">Resolved</span></td>
          <td>32 pigs</td>
          <td><button class="action-btn" data-id="3">View Details</button></td>
        </tr>
      `;
    }
  
    bindDateFilter() {
      this.dateFilter.addEventListener("change", () => {
        // Mock filter: No data change, just UI feedback
        alert("Date filter applied (mock): Showing last 30 days.");
      });
    }
  
    bindViewDetails() {
      this.reportsTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("action-btn")) {
          const id = event.target.getAttribute("data-id");
          alert(`Mock details for ID ${id}: View more information here.`);
        }
      });
    }
  }