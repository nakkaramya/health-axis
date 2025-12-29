

/

// Initialize Firebase
const app = initializeApp(firebaseConfig);// Emergency button logic
function emergencyAI() {
    alert("🚨 Emergency Alert Sent!\nNearby hospitals & parents notified.");
}

// Navigation functions
function goHospitals() {
    window.location.href = "hospital.html";
}

function goDoctors() {
    window.location.href = "doctor.html";
}

function goMedicines() {
    window.location.href = "medicine.html";
}

function goDiet() {
    alert("🥗 AI Diet Plan feature coming soon!");
}

function bookAppointment() {
    alert("📅 Doctor appointment booking coming soon!");
}
function addToCart(productName) {
    alert(productName + " added to cart 🛒");
}
// Predefined contacts
const contacts = [
    { name: "Mom", number: "+911234567890" },
    { name: "Dad", number: "+919876543210" },
];

// Nearby hospitals (example)
const nearbyHospitals = [
    { name: "City Government Hospital", phone: "+910011223344" },
    { name: "LifeCare Multi-Speciality", phone: "+910055667788" },
];
// Send SOS
function handleSOS() {
    console.log("SOS button clicked"); // test if function runs
    // Optional: call backend
    fetch("http://localhost:3000/send-sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: "+919014774418" })
    })
    .then(res => res.json())
    .then(data => {
        console.log("SMS Sent", data);
        document.getElementById("sos-msg").textContent = "SOS alert sent!";
    })
    .catch(err => {
        console.error("Error", err);
        document.getElementById("sos-msg").textContent = "Failed to send SOS.";
    });

    // Optional: call emergency number
    window.location.href = "tel:112";
}



// Google Maps + Nearby Hospitals
function initMap() {
    const defaultLocation = { lat: 17.3850, lng: 78.4867 }; // Hyderabad
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => showMap({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => showMap(defaultLocation)
        );
    } else showMap(defaultLocation);
}

function showMap(location) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location
    });

    new google.maps.Marker({ position: location, map: map, title: "You are here" });

    const hospitals = [
        { name: "City Government Hospital", lat: location.lat + 0.01, lng: location.lng + 0.01 },
        { name: "LifeCare Multi-Speciality", lat: location.lat - 0.01, lng: location.lng - 0.01 }
    ];

    hospitals.forEach(h => {
        new google.maps.Marker({
            position: { lat: h.lat, lng: h.lng },
            map: map,
            title: h.name,
            icon: "http://maps.google.com/mapfiles/ms/icons/hospitals.png"
        });
    });

    // Show hospital cards with animation
    const listEl = document.getElementById("hospital-list");
    listEl.innerHTML = "";
    hospitals.forEach((h, index) => {
        const card = document.createElement("div");
        card.className = "hospital-card";
        card.style.animationDelay = `${index * 0.2}s`; // stagger animation
        card.innerHTML = `<h3>🏥 ${h.name}</h3><p>Emergency Available</p>`;
        listEl.appendChild(card);
    });
}
function bookDoctor() {
    alert("Appointment booked successfully!");
}

function initMap() {
    const defaultLocation = { lat: 17.3850, lng: 78.4867 }; // Hyderabad

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => showMap({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => showMap(defaultLocation)
        );
    } else {
        showMap(defaultLocation);
    }
}

function showMap(location) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location
    });

    new google.maps.Marker({ position: location, map: map, title: "You are here" });

    const hospitals = [
        { name: "City Government Hospital", lat: location.lat + 0.01, lng: location.lng + 0.01, icu: true, rating: 4.5 },
        { name: "LifeCare Multi-Speciality", lat: location.lat - 0.01, lng: location.lng - 0.01, icu: true, rating: 4.6 },
        { name: "Green Cross Medical Center", lat: location.lat + 0.02, lng: location.lng + 0.01, icu: false, rating: 4.2 },
        { name: "Sunrise Hospital", lat: location.lat - 0.02, lng: location.lng - 0.02, icu: true, rating: 4.7 }
    ];

    // Add hospital markers
    hospitals.forEach(h => {
        new google.maps.Marker({
            position: { lat: h.lat, lng: h.lng },
            map: map,
            title: h.name,
            icon: "http://maps.google.com/mapfiles/ms/icons/hospitals.png"
        });
    });

    // Show hospital cards dynamically
    const listEl = document.getElementById("hospital-list");
    listEl.innerHTML = "";

    hospitals.forEach((h, index) => {
        const card = document.createElement("div");
        card.className = "hospital-card";
        card.style.animationDelay = `${index * 0.2}s`; // stagger animation
        card.innerHTML = `
            <h3>🏥 ${h.name}</h3>
            <p>Rating: ⭐ ${h.rating}</p>
            <p>${h.icu ? "ICU Available | 24/7" : "General Services"}</p>
            <span class="hospital-tag">${h.icu ? "ICU" : "Normal"}</span>
        `;
        listEl.appendChild(card);
    });
}
function getDietPlan() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const goal = document.getElementById('goal').value;
    
    let diet = "";
    
    if(goal === "weight_loss") {
        diet = "🥗 Breakfast: Oatmeal with fruits\n🥪 Lunch: Grilled chicken salad\n🥣 Dinner: Steamed vegetables and quinoa";
    } else if(goal === "muscle_gain") {
        diet = "🍳 Breakfast: Eggs and whole grain toast\n🥩 Lunch: Chicken and brown rice\n🥛 Dinner: Protein shake and veggies";
    } else if(goal === "diabetic") {
        diet = "🥒 Breakfast: Greek yogurt with nuts\n🍲 Lunch: Lentil soup with salad\n🥗 Dinner: Grilled fish with steamed vegetables";
    } else if(goal === "heart_health") {
        diet = "🍓 Breakfast: Smoothie with berries and oats\n🥗 Lunch: Grilled salmon with quinoa\n🥦 Dinner: Steamed vegetables with olive oil";
    }

    document.getElementById('diet-output').innerText = `Hi ${name}, your suggested diet plan:\n${diet}`;
}
function showDietPlan() {
    const name = document.getElementById('diet-name').value || "User";
    const age = document.getElementById('diet-age').value || "";
    const goal = document.getElementById('diet-goal').value;

    let meals = {};

    if(goal === "weight_loss") {
        meals = {
            "Breakfast": "Oatmeal with fruits 🍓",
            "Lunch": "Grilled chicken salad 🥗",
            "Dinner": "Steamed vegetables and quinoa 🥦"
        };
    } else if(goal === "muscle_gain") {
        meals = {
            "Breakfast": "Eggs and whole grain toast 🍳",
            "Lunch": "Chicken and brown rice 🥩",
            "Dinner": "Protein shake and veggies 🥗"
        };
    } else if(goal === "diabetic") {
        meals = {
            "Breakfast": "Greek yogurt with nuts 🥛",
            "Lunch": "Lentil soup with salad 🥗",
            "Dinner": "Grilled fish with steamed vegetables 🐟"
        };
    } else if(goal === "heart_health") {
        meals = {
            "Breakfast": "Smoothie with berries and oats 🍓",
            "Lunch": "Grilled salmon with quinoa 🥗",
            "Dinner": "Steamed vegetables with olive oil 🥦"
        };
    }

    const output = document.getElementById('diet-output');
    output.innerHTML = ""; // Clear previous

    for(const [meal, menu] of Object.entries(meals)) {
        const card = document.createElement('div');
        card.className = "diet-card";
        card.innerHTML = `
            <h3>${meal}</h3>
            <p>${menu}</p>
        `;
        output.appendChild(card);
    }
}
function goHome() {
    window.location.href = "index.html";
}


