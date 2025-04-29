class OverviewView {
    constructor() {
        this.reportsTableBody = document.querySelector(".reports-table tbody");
        this.dateFilter = document.getElementById("date-range");
        this.logoutBtn = document.getElementById("logout-btn");
        this.dialog = document.getElementById("details-dialog");
        this.dialogContent = document.getElementById("dialog-content");
        this.dialogCloseBtn = this.dialog.querySelector(".close-btn");
        this.bindDateFilter();
        this.bindViewDetails();
        this.bindDialogClose();
        this.bindLogout();
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
                    1: {
                        Farmer: "Juan Dela Cruz",
                        Farm: "FARM-238",
                        Location: "Panabo City",
                        Result: "Confirmed ASF",
                        Affected: "45 pigs",
                        Images: "Skin, Leg, Nose, Ear"
                    },
                    2: {
                        Farmer: "Maria Santos",
                        Farm: "FARM-112",
                        Location: "Tagum City",
                        Result: "Suspected ASF",
                        Affected: "23 pigs",
                        Images: "Skin, Leg, Nose, Ear"
                    },
                    3: {
                        Farmer: "Pedro Reyes",
                        Farm: "FARM-097",
                        Location: "Carmen",
                        Result: "Resolved",
                        Affected: "32 pigs",
                        Images: "Skin, Leg, Nose, Ear"
                    }
                };
                const detailData = details[id] || { Error: "No details available" };
                this.dialogContent.innerHTML = Object.entries(detailData).map(([key, value]) => `
                    <li>
                        <strong>${key}:</strong>
                        <span>${value}</span>
                    </li>
                `).join('');
                this.dialog.showModal();
            }
        });
    }

    bindDialogClose() {
        this.dialogCloseBtn.addEventListener("click", () => {
            this.dialog.close();
        });

        this.dialog.addEventListener("click", (event) => {
            if (event.target === this.dialog) {
                this.dialog.close();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new OverviewView();
});