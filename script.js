document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Load OpenStreetMap Map Tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Exact 6 Route Stops matching your updated HTML Itinerary
  const routeStops = [
    {
      day: "Day 1",
      title: "Kurana (Arrival)",
      stay: "Mr. Amal's Home",
      coords: [7.1895, 79.8656],
      desc: "Chauffeur meeting, homestay arrival & welcome dinner."
    },
    {
      day: "Day 2",
      title: "Induruwa",
      stay: "Pandanus Beach Resort & Spa",
      coords: [6.3814, 80.0022],
      desc: "Madu River safari & Sea Turtle Conservation Hatchery."
    },
    {
      day: "Day 3",
      title: "Colombo",
      stay: "Amari Colombo",
      coords: [6.9271, 79.8612],
      desc: "City tour, historic landmarks, and luxury shopping."
    },
    {
      day: "Day 4",
      title: "Sigiriya",
      stay: "Kassapa Lion Rock",
      coords: [7.9570, 80.7603],
      desc: "4x4 Elephant safari, village tour with lunch & Ayurveda massage."
    },
    {
      day: "Day 5",
      title: "Kandy",
      stay: "Amaya Hills",
      coords: [7.2906, 80.6337],
      desc: "Sigiriya Rock climb, Spice Garden lunch, Temple of the Tooth & Cultural Show."
    },
    {
      day: "Days 6 & 7",
      title: "Nuwara Eliya & Departure",
      stay: "Araliya Green Hills",
      coords: [6.9497, 80.7891],
      desc: "Ramboda Falls, Tea Factory tour & transfer to BIA for departure."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    // Numbered Circle Pin Marker (1, 2, 3, 4, 5, 6)
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#0284c7',
    weight: 4,
    opacity: 0.85,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});
