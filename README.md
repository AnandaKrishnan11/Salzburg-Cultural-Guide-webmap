
# 🌍 Salzburg Cultural Guide

## 1. Introduction

In today’s digital age, geographic information plays a pivotal role across a wide range of industries from urban planning and logistics to disaster management and tourism. Web mapping technologies have revolutionized how we access and interact with geospatial data, enabling dynamic, real-time visualization accessible through any browser.

This project, titled **‘Salzburg Cultural Guide’** with Leaflet, showcases a lightweight, highly customizable web-based mapping application built using **Leaflet.js** an open-source JavaScript library for interactive maps. The application allows users to visualize locations using markers, display geospatial datasets in GeoJSON format, and enhance map interactions through popups and styling. Whether you're a student, researcher, city planner, or traveller, this tool provides a foundation for building rich geospatial applications tailored to your domain.

---
## 2. Objectives
This project aims to demonstrate interactive web mapping using Leaflet.js, a lightweight JavaScript library for creating dynamic maps. The goal is to:

1. Display geographic data (e.g., markers, polygons, or GeoJSON layers) on an interactive map.
2. Implement features like popups, custom icons, and layer controls for enhanced user experience.
3. Serve as a template or reference for integrating Leaflet into web applications for geospatial visualization.

---

## 3. Project Setup

The following steps were followed to create and structure the project:

1. Created a GitHub repository: `webmapping_leaflet`  
2. Added key files: `index.html`, `styles.css`, and `script.js`  
3. Included Leaflet CDN links for stylesheet and JavaScript in the HTML head section  
4. Designed the HTML structure with a `<div>` for the map with height and width styling  
5. Added responsive meta tags for mobile compatibility  

---

## 4. Technologies Used

- **HTML5, CSS3** – layout and styles  
- **JavaScript (ES6)** – scripting and logic  
- **Leaflet.js** – map rendering and interactivity  
- **OpenStreetMap** – tile base map provider  
---

## 5. Data Source
For the study all the datasets (in geojson format) were acquired from overpass turbo (https://overpass-turbo.eu/) which includes:
1. Hotels 
2. Museums
3. Resturents  

---

## 6. Implementation and functionalitites

1. Map Setup & Base Layers
The map is initialized with a light-themed basemap from CARTO, chosen for its minimalist design to avoid visual clutter. A custom scale bar (showing both metric and imperial units) is added to the bottom-right corner for spatial reference. The map defaults to a centered view over Salzburg at zoom level 13, ensuring key points of interest are immediately visible.

2. Custom Markers & Styling
Three categories of locations—museums, hotels, and restaurants—are plotted using custom-designed markers:
1. Icons: Font Awesome symbols (🏛️ for museums, 🏨 for hotels, 🍴 for restaurants) colored to match their category (blue, green, and red, respectively).
2. Dynamic Popups: Each marker opens a rich popup containing:
   a. Name, address, contact details, and website links.
   b. A category badge with color-coded backgrounds.

3. Layer Control & Search
Toggle Layers: Users can show/hide categories (e.g., only museums) via buttons in the sidebar.
   a. Keyword Search: A search bar filters markers by name across visible layers, zooming to matches and opening their popups.

4. User Geolocation & Proximity Tools
   a. "Locate Me" Button: Adds a blue user marker (👤) at the user’s GPS coordinates and centers the map.
   b. Radius Search: Users can input a distance (in meters) to highlight nearby places within that range, hiding others.

5. UI/UX Enhancements
   a. Responsive Sidebar: Houses controls for layers, search, and zoom in a collapsible panel.
   b. Custom Zoom Buttons: Replaced Leaflet’s default controls with larger, accessible buttons.
   c. Info Popup: An "About" button explains the app’s purpose and features.

6. Technical Highlights
   a. Data Handling: GeoJSON files are fetched dynamically, with markers generated programmatically.
   b. Performance: Uses preferCanvas: true for smoother rendering with large datasets.
   c. Cross-Platform: Works on both desktop and mobile devices.

7. Design Philosophy
The interface prioritizes clarity and usability:
   a. Color Coding: Consistent colors (blue/green/red) help users quickly identify categories.
   b. Minimalist Basemap: Avoids distracting details, letting markers stand out.
   c. Interactive Feedback: Markers "rise" on hover, and popups include actionable links (e.g., to websites).

---

## 7. Optimization and Responsiveness

To ensure the map renders correctly across devices, the following optimizations were done:

- CSS ensures the map container takes full width and appropriate height  
- Responsive meta tag included for mobile compatibility  
- Scripts loaded after DOM for better performance  

---

## 8. Future Enhancements

The project can be extended with the following features:

- Marker clustering for high-density datasets  
- Integrated search and geocoder tools  
- Dynamic data loading using APIs or databases  
- Layer switching for different base maps  
- Real-time location tracking or filtering  

---

## 9. How to Run the Project

To run the application locally:

1. Clone the repository:  
   ```bash
   git clone https://github.com/AnandaKrishnan11/webmapping_leaflet.git
   ```
2. Open `index.html` using a browser or using hosted link: https://anandakrishnan11.github.io/webmapping_leaflet/
3. Modify coordinates, markers, or GeoJSON file to suit your data  


---

## 10. Conclusion

This project serves as a practical example of how to build, style, and extend interactive web maps using Leaflet. It demonstrates clean integration of geospatial data with custom interaction and visualization features. Whether used for academic submissions, public dashboards, or private mapping tools, this codebase offers a robust foundation for deploying effective geographic applications in the browser.

---

**Authored by:** Ananda Krishnan  
**Date:** June 2025
