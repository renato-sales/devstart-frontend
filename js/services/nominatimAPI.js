export async function getCoordinates(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );

  const data = await response.json();

  if (!data || data.length === 0) {
    alert("Não foi possível localizar o endereço");
    return null;
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}
