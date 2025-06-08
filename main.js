// Initialize the map with light grey canvas
const map = L.map('map', {
    preferCanvas: true,
    zoomControl: false // We'll add our own zoom controls
}).setView([47.8095, 13.0550], 13);

// Add light grey basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Custom colorful markers
const museumIcon = L.divIcon({
    className: 'museum-marker',
    html: '<i class="fas fa-landmark"></i>',
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

const hotelIcon = L.divIcon({
    className: 'hotel-marker',
    html: '<i class="fas fa-hotel"></i>',
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

const restaurantIcon = L.divIcon({
    className: 'restaurant-marker',
    html: '<i class="fas fa-utensils"></i>',
    iconSize: [32, 32],
    popupAnchor: [0, -16]
});

// Create layer groups
const museumLayer = L.layerGroup().addTo(map);
const hotelLayer = L.layerGroup().addTo(map);
const restaurantLayer = L.layerGroup().addTo(map);

// Store layers for easy access
const layers = {
    museum: museumLayer,
    hotel: hotelLayer,
    restaurant: restaurantLayer
};

// Function to load and display GeoJSON/JSON data
function loadData(url, icon, layerGroup, category) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle both GeoJSON and regular JSON formats
            const features = data.features || data;
            
            features.forEach(feature => {
                const coords = feature.geometry?.coordinates || feature.coordinates;
                const properties = feature.properties || feature;
                
                if (!coords) return;
                
                const marker = L.marker([coords[1], coords[0]], {
                    icon: icon,
                    riseOnHover: true
                }).addTo(layerGroup);
                
                let popupContent = `<h3>${properties.name || 'Unnamed'}</h3>`;
                
                // Add colorful category badge
                popupContent += `<span style="display: inline-block; background-color: ${getCategoryColor(category)}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-bottom: 8px;">${category.toUpperCase()}</span>`;

              
                 if (properties.addr:street) {
                    popupContent += `<p><i class="fas fa-map-marker-alt" style="color: ${getCategoryColor(category)};"></i> ${properties.address}</p>`;
                }

                if (properties.phone) {
                    popupContent += `<p><i class="fas fa-phone" style="color: ${getCategoryColor(category)};"></i> ${properties.phone}</p>`;
                }
                
                if (properties.website) {
                    popupContent += `<p><i class="fas fa-globe" style="color: ${getCategoryColor(category)};"></i> <a href="${properties.website}" target="_blank">Visit Website</a></p>`;
                }
                if (properties.opening_hours) {
                    popupContent += `<p><i class="fas fa-clock" style="color: ${getCategoryColor(category)};"></i> ${properties.opening_hours}</p>`;
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

function getCategoryColor(category) {
    switch(category) {
        case 'museum': return '#3498db';
        case 'hotel': return '#2ecc71';
        case 'restaurant': return '#e74c3c';
        default: return '#95a5a6';
    }
}

// Load data
loadData('data/Data_museum_salzburg.geojson', museumIcon, museumLayer, 'museum');
loadData('data/Data_hotel_Salzburg.geojson', hotelIcon, hotelLayer, 'hotel');
loadData('data/restaurants_in_salzburg2.geojson', restaurantIcon, restaurantLayer, 'restaurant');

// Button toggle functionality
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

// Custom zoom controls
document.getElementById('zoom-in').addEventListener('click', () => {
    map.zoomIn();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    map.zoomOut();
});

// Custom search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;
    
    let found = false;
    
    // Search through all active layers
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
    
    if (!found) {
        alert('No matching locations found');
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Information popup
const infoBtn = document.getElementById('info-btn');
infoBtn.addEventListener('click', function() {
    // Customize this content with your map description
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
                <li>Find your current location</li>
            </ul>
            <p style="font-style: italic; margin-top: 10px;">
                Created with Leaflet.js | Data sources: [Add your data sources here]
            </p>
        </div>
    `;
    
    // Create and open a popup in the center of the map
    L.popup()
        .setLatLng(map.getCenter())
        .setContent(infoContent)
        .openOn(map);
});

// Location finder
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
            
            // Create a custom marker for user's location
            const userIcon = L.divIcon({
                className: 'user-marker',
                html: '<i class="fas fa-user"></i>',
                iconSize: [32, 32]
            });
            
            // Add marker to map (and remove previous one if exists)
            if (window.userLocationMarker) {
                map.removeLayer(window.userLocationMarker);
            }
            
            window.userLocationMarker = L.marker(userLocation, {
                icon: userIcon,
                zIndexOffset: 1000
            }).addTo(map);
            
            window.userLocationMarker.bindPopup("You are here!").openPopup();
            
            // Center map on user's location
            map.setView(userLocation, 16);
            
            locateBtn.innerHTML = '<i class="fas fa-map-pin"></i>';
        },
        function(error) {
            alert("Unable to retrieve your location: " + error.message);
            locateBtn.innerHTML = '<i class="fas fa-map-pin"></i>';
        },
        {
            enableHighAccuracy: true,
            timeout: 10000
        }
    );
});
