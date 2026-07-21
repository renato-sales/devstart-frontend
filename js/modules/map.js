import { companyCoords } from "../services/osrmAPI.js";

let map;

export function renderCompanyMap() {
  if (map) map.remove();

  map = L.map("map").setView([companyCoords.lat, companyCoords.lon], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  L.marker([companyCoords.lat, companyCoords.lon])
    .addTo(map)
    .bindPopup("DevStart - Sede")
    .openPopup();
}

export function renderMap(userCoords, geometry) {
  if (!geometry) return;

  if (map) map.remove();

  map = L.map("map").setView([userCoords.lat, userCoords.lon], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  L.marker([userCoords.lat, userCoords.lon])
    .addTo(map)
    .bindPopup("Sua localização");

  L.marker([companyCoords.lat, companyCoords.lon])
    .addTo(map)
    .bindPopup("DevStart - Sede");

  const routeCoords = geometry.coordinates.map((coord) => [coord[1], coord[0]]);

  animateRoute(routeCoords);

  const bounds = L.latLngBounds(routeCoords);
  map.fitBounds(bounds);
}

function animateRoute(routeCoords) {
  let index = 0;

  const polyline = L.polyline([], {
    color: "blue",
    weight: 5,
  }).addTo(map);

  const marker = L.marker(routeCoords[0]).addTo(map);

  function draw() {
    if (index < routeCoords.length) {
      polyline.addLatLng(routeCoords[index]);
      marker.setLatLng(routeCoords[index]);
      index++;
      setTimeout(draw, 5);
    }
  }

  draw();
}
