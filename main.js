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
loadData('data/restaurants_in_salzburg2.json', restaurantIcon, restaurantLayer, 'restaurant');

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
