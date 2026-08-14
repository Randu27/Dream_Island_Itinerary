document.addEventListener("DOMContentLoaded", function () {
  // Exact GPS Coordinates for Destinations in Sri Lanka
  const destinations = [
    {
      day: "Day 1",
      name: "Kurana",
      lat: 7.1683,
      lng: 79.8808,
      stay: "Mr. Amal's Home",
      desc: "Arrival & traditional welcome stay."
    },
    {
      day: "Day 2",
      name: "Sigiriya & Habarana",
      lat: 7.9570,
      lng: 80.7603,
      stay: "Kassapa Lion Rock",
      desc: "Sigiriya Citadel & Elephant Safari."
    },
    {
      day: "Day 3",
      name: "Kandy",
      lat: 7.2906,
      lng: 80.6337,
      stay: "Amaya Hills",
      desc: "Temple of Tooth & Cultural Show."
    },
    {
      day: "Day 4",
      name: "Nuwara Eliya",
      lat: 6.9497,
      lng: 80.7891,
      stay: "Araliya Green Hills",
      desc: "Tea Plantations & Ramboda Falls."
    },
    {
      day: "Day 5",
      name: "Induruwa",
      lat: 6.3683,
      lng: 80.0031,
      stay: "Pandanus Beach Resort",
      desc: "Little Adam's Peak & Ayurveda Massage."
    },
    {
      day: "Day 6",
      name: "Colombo",
      lat: 6.9271,
      lng: 79.8612,
      stay: "Amari Colombo",
      desc: "Madu River Safari & Colombo Shopping."
    }
  ];

  // Initialize Map centered over Sri Lanka
  const map = L.map('sri-lanka-map').setView([7.5, 80.5], 8);

  // Load OpenStreetMap Map Tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const routeCoords = [];

  // Add Markers and Custom Popups
  destinations.forEach((item, index) => {
    routeCoords.push([item.lat, item.lng]);

    // Custom Pin Marker
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${item.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a;">${item.name}</h6>
        <p style="font-size:13px; margin:0; color:#334155;"><strong>Stay:</strong> ${item.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b;">${item.desc}</p>
      </div>
    `;

    L.marker([item.lat, item.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#0284c7',
    weight: 4,
    opacity: 0.85,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins
  map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
});