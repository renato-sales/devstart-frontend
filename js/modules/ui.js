export function showRouteInfo(route) {
  const distance = route.distance / 1000;
  const time = route.duration / 60;

  document.querySelector("#distance").innerText = distance.toFixed(1) + " km";
  document.querySelector("#time").innerText = Math.round(time) + " min";
}

export function showAddress(addressData) {
  const address = `${addressData.logradouro}, ${addressData.localidade}`;
  document.querySelector("#userAddress").innerText = address;
}
