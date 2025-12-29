function openHospital(id) {
    window.location.href = "hospital-details.html?id=" + id;
}
function searchLocation() {
    const place = document.getElementById("locationInput").value;
    if (place === "") {
        alert("Enter location");
        return;
    }

    // Map
    document.getElementById("mapContainer").innerHTML = `
        <iframe width="100%" height="300"
        src="https://www.google.com/maps?q=${place}+hospital&output=embed"></iframe>
    `;

    // Hospital list with distance
    document.getElementById("hospitalList").innerHTML = `
        <div class="hospital-card">
            <h4>Apollo Hospital</h4>
            <p>📍 2.3 km away</p>
            <button onclick="openHospital('apollo')">View Details</button>
        </div>

        <div class="hospital-card">
            <h4>City Care Hospital</h4>
            <p>📍 4.1 km away</p>
            <button onclick="openHospital('citycare')">View Details</button>
        </div>
    `;
}