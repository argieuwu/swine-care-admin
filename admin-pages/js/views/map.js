class MapView {
    constructor() {
        this.map = null;
        this.markersLayer = L.layerGroup(); 
        this.dateFilter = document.getElementById("date-range");
        this.riskFilter = document.getElementById("risk-level");
        this.logoutBtn = document.getElementById("logout-btn");
        this.summaryItems = document.querySelectorAll(".map-summary p.clickable");
        this.markersData = [
            { lat: 7.4475, lng: 125.8070, farmer: "Juan Dela Cruz", farmId: "FARM-238", result: "High Risk", date: "Mar 17, 2025" }, 
            { lat: 7.4469, lng: 125.8090, farmer: "Maria Santos", farmId: "FARM-112", result: "Moderate Risk", date: "Mar 16, 2025" }, 
            { lat: 7.3167, lng: 125.6833, farmer: "Pedro Reyes", farmId: "FARM-097", result: "Low Risk", date: "Mar 15, 2025" } 
        ];
        this.initMap();
        this.updateMap("all"); 
        this.bindDateFilter();
        this.bindRiskFilter();
        this.bindSummaryClicks();
        this.bindLogout();
    }

    initMap() {
        this.map = L.map('map').setView([7.3082, 125.6816], 10); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        this.markersLayer.addTo(this.map);
    }

    updateMap(riskLevel) {
        this.markersLayer.clearLayers(); 
        const filteredMarkers = riskLevel === "all" 
            ? this.markersData 
            : this.markersData.filter(marker => marker.result.toLowerCase().includes(riskLevel));

        filteredMarkers.forEach(marker => {
            const color = marker.result === "High Risk" ? 'red' : marker.result === "Moderate Risk" ? 'orange' : 'green';
            L.marker([marker.lat, marker.lng], {
                icon: L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff;"></div>`
                })
            }).addTo(this.markersLayer)
            .bindPopup(`
                <b>Farmer:</b> ${marker.farmer}<br>
                <b>Farm ID:</b> ${marker.farmId}<br>
                <b>Result:</b> ${marker.result}<br>
                <b>Date:</b> ${marker.date}
            `);
        });

        // Update summary counts
        document.getElementById("total-farms").textContent = filteredMarkers.length;
        document.getElementById("high-risk").textContent = filteredMarkers.filter(m => m.result === "High Risk").length;
        document.getElementById("moderate-risk").textContent = filteredMarkers.filter(m => m.result === "Moderate Risk").length;
        document.getElementById("low-risk").textContent = filteredMarkers.filter(m => m.result === "Low Risk").length;
    }

    bindDateFilter() {
        this.dateFilter.addEventListener("change", (event) => {
            const value = event.target.value;
            alert(`Date filter applied (mock): Showing map data for ${value === "custom" ? "custom range" : `last ${value} days`}.`);
           
        });
    }

    bindRiskFilter() {
        this.riskFilter.addEventListener("change", (event) => {
            const riskLevel = event.target.value;
            this.updateMap(riskLevel);
        });
    }

    bindSummaryClicks() {
        this.summaryItems.forEach(item => {
            item.addEventListener("click", () => {
                const riskLevel = item.getAttribute("data-risk");
                this.riskFilter.value = riskLevel; 
                this.updateMap(riskLevel);
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new MapView();
});