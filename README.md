
# 🌍 Salzburg Cultural Guide

## 1. Introduction

In today’s digital age, geographic information plays a pivotal role across a wide range of industries—from urban planning and logistics to disaster management and tourism. Web mapping technologies have revolutionized how we access and interact with geospatial data, enabling dynamic, real-time visualization accessible through any browser.

This project, titled **‘Salzburg Cultural Guide’** with Leaflet, showcases a lightweight, highly customizable web-based mapping application built using **Leaflet.js**—an open-source JavaScript library for interactive maps. The application allows users to visualize locations using markers, display geospatial datasets in GeoJSON format, and enhance map interactions through popups and styling. Whether you're a student, researcher, city planner, or traveller, this tool provides a foundation for building rich geospatial applications tailored to your domain.

---
## 2. Objectives




---

## 3. Project Setup

The following steps were followed to create and structure the project:

1. Created a GitHub repository: `webmapping_leaflet`  
2. Added key files: `index.html`, `styles.css`, and `script.js`  
3. Included Leaflet CDN links for stylesheet and JavaScript in the HTML head section  
4. Designed the HTML structure with a `<div>` for the map with height and width styling  
5. Added responsive meta tags for mobile compatibility  

---
## 4. Data Source
For the study all the datasets were acquired from overpass turbo (https://overpass-turbo.eu/) which includes:
1. Hotels 
2. Museums
3. Resturents  

---

## 4. Implementation details


---

## 5. Optimization and Responsiveness

To ensure the map renders correctly across devices, the following optimizations were done:

- CSS ensures the map container takes full width and appropriate height  
- Responsive meta tag included for mobile compatibility  
- Scripts loaded after DOM for better performance  

---

## 6. Future Enhancements

The project can be extended with the following features:

- Marker clustering for high-density datasets  
- Integrated search and geocoder tools  
- Dynamic data loading using APIs or databases  
- Layer switching for different base maps  
- Real-time location tracking or filtering  

---

## 7. How to Run the Project

To run the application locally:

1. Clone the repository:  
   ```bash
   git clone https://github.com/AnandaKrishnan11/webmapping_leaflet.git
   ```
2. Open `index.html` using a browser or using hosted link: 
3. Modify coordinates, markers, or GeoJSON file to suit your data  

---

## 10. Technologies Used

- **HTML5, CSS3** – layout and styles  
- **JavaScript (ES6)** – scripting and logic  
- **Leaflet.js** – map rendering and interactivity  
- **OpenStreetMap** – tile base map provider  

---

## 11. Conclusion

This project serves as a practical example of how to build, style, and extend interactive web maps using Leaflet. It demonstrates clean integration of geospatial data with custom interaction and visualization features. Whether used for academic submissions, public dashboards, or private mapping tools, this codebase offers a robust foundation for deploying effective geographic applications in the browser.

---

**Authored by:** Ananda Krishnan  
**Date:** June 2025
