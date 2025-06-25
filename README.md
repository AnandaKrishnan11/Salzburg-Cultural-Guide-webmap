# 🌍 Salzburg Cultural Guide

## 1. Introduction

In today’s digital age, geographic information plays a pivotal role across a wide range of industries—from urban planning and logistics to disaster management and tourism. Web mapping technologies have revolutionized how we access and interact with geospatial data, enabling dynamic, real-time visualization accessible through any browser.

This project, titled **‘Salzburg Cultural Guide’** with Leaflet, showcases a lightweight, highly customizable web-based mapping application built using **Leaflet.js**—an open-source JavaScript library for interactive maps. The application allows users to visualize locations using markers, display geospatial datasets in GeoJSON format, and enhance map interactions through popups and styling. Whether you're a student, researcher, city planner, developer, or hobbyist, this tool provides a foundation for building rich geospatial applications tailored to your domain.

With zero dependencies on heavy GIS software, this project can be hosted on any static server and easily extended for use cases such as:

- Campus or tourist maps  
- Real-time event tracking  
- Location-based data dashboards  
- Interactive storytelling  
- Environmental data visualization

---

## 2. Project Setup

The following steps were followed to create and structure the project:

1. Created a GitHub repository: `webmapping_leaflet`  
2. Added key files: `index.html`, `styles.css`, and `script.js`  
3. Included Leaflet CDN links for stylesheet and JavaScript in the HTML head section  
4. Designed the HTML structure with a `<div>` for the map with height and width styling  
5. Added responsive meta tags for mobile compatibility  

---

## 3. Initializing the Map

The map is initialized in `script.js` using Leaflet’s `L.map()` function. The base map uses OpenStreetMap tiles for a free and open-source background layer. The map is centered using geographic coordinates and a zoom level:

```javascript
const map = L.map('map').setView([LATITUDE, LONGITUDE], ZOOM_LEVEL);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);
