// js/main.js
import { renderMatch } from "./matchRender.mjs";
import { renderPlaces } from "./placesRender.mjs";

// === DATOS SIMULADOS DE PRUEBA (MOCK DATA) ===
const mockMatches = {
  "1": {
    id: 101, teamName: "Argentina", opponent: "España", dateUTC: "2026-06-15T18:00:00Z",
    stadiumName: "Estadio Azteca", city: "Ciudad de México", capacity: 87523, lat: 19.3029, lon: -99.1505
  },
  "2": {
    id: 102, teamName: "México", opponent: "Estados Unidos", dateUTC: "2026-06-16T20:00:00Z",
    stadiumName: "Estadio Akron", city: "Guadalajara", capacity: 48071, lat: 20.6811, lon: -103.4627
  }
};

const mockPlaces = [
  { id: "p1", name: "La Cantina del Fútbol", categoryId: "13003", rating: 4.8, reviews: 124, address: "Av. Estadio Mexicano 450", distanceMeters: 350, price: "$$" },
  { id: "p2", name: "Goles & Hamburguesas", categoryId: "13035", rating: 4.2, reviews: 89, address: "Calle Balón de Oro 12", distanceMeters: 180, price: "$" },
  { id: "p3", name: "Restaurante El Diez", categoryId: "13065", rating: 4.6, reviews: 210, address: "Pasaje de los Campeones 89", distanceMeters: 500, price: "$$$" }
];

document.addEventListener("DOMContentLoaded", () => {
  const teamSelector = document.querySelector("#team-selector");
  const dashboard = document.querySelector("#dashboard");
  const matchCard = document.querySelector("#match-card");
  const placesList = document.querySelector("#places-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  teamSelector.addEventListener("change", (event) => {
    const selectedTeamId = event.target.value;

    if (!selectedTeamId || !mockMatches[selectedTeamId]) {
      dashboard.classList.add("hidden");
      return;
    }

    dashboard.classList.remove("hidden");

    // Invocamos las funciones importadas de los módulos pasándoles los contenedores
    renderMatch(mockMatches[selectedTeamId], matchCard);
    renderPlaces(mockPlaces, placesList);
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const categoryId = e.target.getAttribute("data-category");
      const filteredPlaces = mockPlaces.filter(place => place.categoryId === categoryId);
      
      renderPlaces(filteredPlaces, placesList);
    });
  });
});
