🌍 Salzburg Cultural Guide
1. Introduction

In today’s digital age, geographic information plays a pivotal role across a wide range of industries—from urban planning and logistics to disaster management and tourism. Web mapping technologies have revolutionized how we access and interact with geospatial data, enabling dynamic, real-time visualization accessible through any browser.

This project, titled ‘Salzburg Cultural Guide’ with Leaflet, showcases a lightweight, highly customizable web-based mapping application built using Leaflet.js—an open-source JavaScript library for interactive maps. The application allows users to visualize locations using markers, display geospatial datasets in GeoJSON format, and enhance map interactions through popups and styling. Whether you're a student, researcher, city planner, developer, or hobbyist, this tool provides a foundation for building rich geospatial applications tailored to your domain.

With zero dependencies on heavy GIS software, this project can be hosted on any static server and easily extended for use cases such as:

• Campus or tourist maps

• Real-time event tracking

• Location-based data dashboards

• Interactive storytelling

• Environmental data visualization


2. Project Setup

The following steps were followed to create and structure the project:

1.	Created a GitHub repository: `webmapping_leaflet`

2.	Added key files: `index.html`, `styles.css`, and `script.js`
  
3.	Included Leaflet CDN links for stylesheet and JavaScript in the HTML head section
  
4.	Designed the HTML structure with a `<div>` for the map with height and width styling
  
5.	Added responsive meta tags for mobile compatibility
  

3. Initializing the Map

The map is initialized in `script.js` using Leaflet’s `L.map()` function. The base map uses OpenStreetMap tiles for a free and open-source background layer. The map is centered using geographic coordinates and a zoom level:

const map = L.map('map').setView([LATITUDE, LONGITUDE], ZOOM_LEVEL);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

4. Adding Markers and Popups
5. 
Static or dynamic points of interest can be displayed using markers. Each marker is interactive and can display popups with HTML content (text, images, links):

const marker = L.marker([LAT, LNG]).addTo(map);
marker.bindPopup('<strong>Place Name</strong><br>Details here.');

5. Displaying GeoJSON Data

GeoJSON is a standard format for encoding geographic data structures. This project supports loading a GeoJSON file and rendering features with conditional styling and popups:

fetch('data.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({ color: feature.properties.color || '#3388ff' }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
      }
    }).addTo(map);
  });

6. Custom Styling and Interactions
7. 
The application uses both CSS and JavaScript to enhance user experience. Hover effects, click zooms, and dynamic style changes are implemented to improve usability. Example for highlighting features:

function highlightFeature(e) {
  e.target.setStyle({ weight: 5, color: '#666' });
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

7. Optimization and Responsiveness
To ensure the map renders correctly across devices, the following optimizations were done:
• CSS ensures the map container takes full width and appropriate height
• Responsive meta tag included for mobile compatibility
• Scripts loaded after DOM for better performance

8. Future Enhancements
The project can be extended with the following features:
• Marker clustering for high-density datasets
• Integrated search and geocoder tools
• Dynamic data loading using APIs or databases
• Layer switching for different base maps
• Real-time location tracking or filtering

9. How to Run the Project
To run the application locally:
1. Clone the repository: `git clone https://github.com/AnandaKrishnan11/webmapping_leaflet.git`
2. Open `index.html` using a browser
3. Modify coordinates, markers, or GeoJSON file to suit your data
  
10. Technologies Used
• HTML5, CSS3 – layout and styles
• JavaScript (ES6) – scripting and logic
• Leaflet.js – map rendering and interactivity
• OpenStreetMap – tile base map provider

11. Conclusion
This project serves as a practical example of how to build, style, and extend interactive web maps using Leaflet. It demonstrates clean integration of geospatial data with custom interaction and visualization features. Whether used for academic submissions, public dashboards, or private mapping tools, this codebase offers a robust foundation for deploying effective geographic applications in the browser.

Authored by: Ananda Krishnan
Date: June 2025

