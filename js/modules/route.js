import { getCoordinates } from "../services/nominatimAPI.js";
import { getRealRoute } from "../services/osrmAPI.js";
import { getAddressByCep } from "../services/viaCepAPI.js";
import { renderMap } from "./map.js";
import { showAddress, showRouteInfo } from "./ui.js";

export async function calculateRoute() {
  const cep = document.querySelector("#searchCep").value;

  if (!cep) {
    alert("Digite um CEP válido");
    return;
  }

  try {
    const addressData = await getAddressByCep(cep);

    if (!addressData) {
      return;
    }
    showAddress(addressData);

    const address = `${addressData.logradouro}, ${addressData.localidade}`;
    const userCoords = await getCoordinates(address);
    if (!userCoords) {
      return;
    }

    const route = await getRealRoute(userCoords);
    if (!route) {
      return;
    }

    showRouteInfo(route);
    renderMap(userCoords, route.geometry);
  } catch (error) {
    console.error(error);
    alert("Erro ao calcular rota");
  }
}
