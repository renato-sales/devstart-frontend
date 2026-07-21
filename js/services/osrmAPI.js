export const companyCoords = {
  lat: -8.1219717,
  lon: -34.8959942,
};

export async function getRealRoute(userCoords) {
  const url = `https://router.project-osrm.org/route/v1/driving/${userCoords.lon},${userCoords.lat};${companyCoords.lon},${companyCoords.lat}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    alert("Não foi possível calcular a rota");
    console.error(data);
    return null;
  }

  return data.routes[0];
}
