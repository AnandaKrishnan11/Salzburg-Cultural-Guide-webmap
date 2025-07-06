// Initialize the map with light grey canvas
const map = L.map('map', {
    preferCanvas: true,            // Use canvas for performance on large datasets
    zoomControl: false             // Disable default zoom control (custom controls added later)
}).setView([47.8095, 13.0550], 13); // Centered at Salzburg, Austria

// Add a light grey base map from CARTO
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Add a scale bar
L.control.scale({
    metric: true,
    imperial:true,
    maxWidth: 100,
    position: 'bottomright'}).addTo(map)

// Define custom icons with colored Font Awesome icons
const museumIcon = L.divIcon({
    className: 'museum-marker',
    html: '<i class="fas fa-landmark" style="color: #3498db;"></i>', // Blue
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

const hotelIcon = L.divIcon({
    className: 'hotel-marker',
    html: '<i class="fas fa-hotel" style="color: #2ecc71;"></i>', // Green
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

const restaurantIcon = L.divIcon({
    className: 'restaurant-marker',
    html: '<i class="fas fa-utensils" style="color: #e74c3c;"></i>', // Red
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

// Create individual layer groups for each category
const museumLayer = L.layerGroup().addTo(map);
const hotelLayer = L.layerGroup().addTo(map);
const restaurantLayer = L.layerGroup().addTo(map);

// Store layers in a dictionary for easy toggling later
const layers = {
    museum: museumLayer,
    hotel: hotelLayer,
    restaurant: restaurantLayer
};

// Utility function to load GeoJSON data and bind custom icons and popups
function loadData(url, icon, layerGroup, category) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const features = data.features || data; // Handle both GeoJSON and simple JSON formats

            features.forEach(feature => { //Extract the Geometry
                const coords = feature.geometry?.coordinates || feature.coordinates;
                const properties = feature.properties || feature;
                if (!coords) return; // Skip if no coordinates

                // Create marker with category icon
                const marker = L.marker([coords[1], coords[0]], {
                    icon: icon,
                    riseOnHover: true
                }).addTo(layerGroup);

                // Build rich popup content with badges, address, phone, image, etc.
                let popupContent = `<h3>${properties.name || 'Unnamed'}</h3>`;
                popupContent += `<span style="display: inline-block; background-color: ${getCategoryColor(category)}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-bottom: 8px;">${category.toUpperCase()}</span>`;

                if (properties.address) {
                    popupContent += `<p><i class="fas fa-map-marker-alt" style="color: ${getCategoryColor(category)};"></i> ${properties.address}</p>`;
                }
                if (properties.phone) {
                    popupContent += `<p><i class="fas fa-phone" style="color: ${getCategoryColor(category)};"></i> ${properties.phone}</p>`;
                }
                if (properties.website) {
                    popupContent += `<p><i class="fas fa-globe" style="color: ${getCategoryColor(category)};"></i> <a href="${properties.website}" target="_blank">Visit Website</a></p>`;
                }
                if (properties.description) {
                    popupContent += `<p style="font-style: italic;">${properties.description}</p>`;
                }
                if (properties.image) {
                    popupContent += `<img src="images/${properties.image}" alt="${properties.name}" style="border: 2px solid ${getCategoryColor(category)};">`;
                }

                marker.bindPopup(popupContent);
            });
        })
        .catch(error => console.error(`Error loading ${category} data:`, error));
}

// Helper function to return a color code for each category
function getCategoryColor(category) {
    switch(category) {
        case 'museum': return '#3498db';
        case 'hotel': return '#2ecc71';
        case 'restaurant': return '#e74c3c';
        default: return '#95a5a6';
    }
}

// Load each category's data
loadData('data/Data_museum_salzburg.geojson', museumIcon, museumLayer, 'museum');
loadData('data/Data_hotel_Salzburg.geojson', hotelIcon, hotelLayer, 'hotel');
loadData('data/restaurants_in_salzburg2.geojson', restaurantIcon, restaurantLayer, 'restaurant');

// Toggle layer visibility using custom buttons
document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const layerName = this.dataset.layer;
        if (this.classList.contains('active')) {
            map.addLayer(layers[layerName]);
        } else {
            map.removeLayer(layers[layerName]);
        }
    });
});

// Custom zoom control buttons

document.getElementById('zoom-in').addEventListener('click', () => map.zoomIn());
document.getElementById('zoom-out').addEventListener('click', () => map.zoomOut());

// Keyword search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;

    let found = false;

    document.querySelectorAll('.layer-btn.active').forEach(btn => {
        const layerName = btn.dataset.layer;
        layers[layerName].eachLayer(layer => {
            const name = layer?.feature?.properties?.name || layer?.options?.name;
            if (name && name.toLowerCase().includes(query)) {
                map.setView(layer.getLatLng(), 16);
                layer.openPopup();
                found = true;
            }
        });
    });

    if (!found) alert('No matching locations found');
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

// Info popup about the app
const infoBtn = document.getElementById('info-btn');
infoBtn.addEventListener('click', function() {
    const infoContent = `
        <div style="max-width: 400px;">
            <h2 style="color: var(--primary-color); margin-bottom: 10px; border-bottom: 2px solid var(--secondary-color); padding-bottom: 5px;">
                Salzburg Cultural Guide
            </h2>
            <p style="margin-bottom: 10px;">
                This interactive map helps you explore cultural attractions, hotels, and restaurants in Salzburg, Austria.
            </p>
            <h3 style="color: var(--primary-color); margin: 10px 0 5px 0;">Features:</h3>
            <ul style="margin-left: 20px; margin-bottom: 10px;">
                <li>Toggle between museums, hotels, and restaurants</li>
                <li>Search for specific locations</li>
                <li>View detailed information in popups</li>
                <li>Find your current location and near by options</li>
            </ul>
            <p style="font-style: italic; margin-top: 10px;">
                Created with Leaflet.js by Krishnan | Data sources: OpenStreetMap
            </p>
        </div>
    `;
    L.popup().setLatLng(map.getCenter()).setContent(infoContent).openOn(map);
});

// Geolocation-based user marker
const locateBtn = document.getElementById('locate-btn');
locateBtn.addEventListener('click', function() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }
    locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            const userIcon = L.divIcon({
                className: 'user-marker',
                html: '<i class="fas fa-user"></i>',
                iconSize: [32, 32]
            });
            if (window.userLocationMarker) map.removeLayer(window.userLocationMarker);
            window.userLocationMarker = L.marker(userLocation, {
                icon: userIcon,
                zIndexOffset: 1000
            }).addTo(map);
            window.userLocationMarker.bindPopup("You are here!").openPopup();
            map.setView(userLocation, 15);
            locateBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        },
        function(error) {
            locateBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
            alert("Unable to retrieve your location: " + error.message);
        }
    );
});

// Distance calculation (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find nearby places based on user location and radius input
document.getElementById('radius-search-btn').addEventListener('click', function () {
    if (!window.userLocationMarker) {
        alert("Please use the locate button to set your current location first.");
        return;
    }
    const userLatLng = window.userLocationMarker.getLatLng();
    const radius = parseInt(document.getElementById('radius-input').value);
    if (isNaN(radius) || radius <= 0) {
        alert("Please enter a valid radius.");
        return;
    }
    let nearbyCount = 0;
    Object.values(layers).forEach(layerGroup => {
        layerGroup.eachLayer(marker => {
            const markerLatLng = marker.getLatLng();
            const distance = getDistance(userLatLng.lat, userLatLng.lng, markerLatLng.lat, markerLatLng.lng);
            if (distance <= radius) {
                if (!map.hasLayer(marker)) map.addLayer(marker);
                marker.setOpacity(1);
                nearbyCount++;
            } else {
                marker.setOpacity(0);
            }
        });
    });
    if (nearbyCount === 0) {
        alert(`No places found within ${radius} meters.`);
    }
});
