// js/main.js
import { fetchWorldCupMatch, fetchNearbyPlaces } from "./apiServices.mjs";
import { renderMatch } from "./matchRender.mjs";
import { renderPlaces } from "./placesRender.mjs";
import { getItinerary, saveMatchToItinerary, savePlaceToItinerary, removeFromItinerary } from "./itinerary.mjs";

// Mantener los equipos base para el selector, pero eliminamos el mock de restaurantes
const mockMatches = {
  "1": { id: 101, teamName: "Argentina", opponent: "España", dateUTC: "2026-06-15T18:00:00Z", stadiumName: "Estadio Azteca", city: "Ciudad de México", capacity: 87523, lat: 19.3029, lon: -99.1505 },
  "2": { id: 102, teamName: "México", opponent: "Estados Unidos", dateUTC: "2026-06-16T20:00:00Z", stadiumName: "Estadio Akron", city: "Guadalajara", capacity: 48071, lat: 20.6811, lon: -103.4627 }
};

let currentTeamId = "";
let currentPlacesData = []; // Guardará los lugares comerciales reales devueltos por el Fetch
let currentCategoryId = "13000"; // Categoría inicial (Comida y Bebida)

// 📌 EVENTO 1: DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const teamSelector = document.querySelector("#team-selector");
  const dashboard = document.querySelector("#dashboard");
  const matchCard = document.querySelector("#match-card");
  const placesList = document.querySelector("#places-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // 📌 EVENTO 2: change (Selección de País)
  teamSelector.addEventListener("change", async (event) => {
    currentTeamId = event.target.value;

    if (!currentTeamId) {
      dashboard.classList.add("hidden");
      return;
    }

    dashboard.classList.remove("hidden");
    placesList.innerHTML = "<p style='padding: 15px;'>⚽ Buscando los mejores lugares cerca del estadio...</p>";

    // Llamado asíncrono secuencial
    const match = await fetchWorldCupMatch(currentTeamId);
    
    if (match) {
      // API 2: Fetch real usando la geolocalización del estadio (lat, lon)
      currentPlacesData = await fetchNearbyPlaces(match.lat, match.lon, currentCategoryId);
      updateDashboard(match);
    }
  });

  // 📌 EVENTO 3: click (Filtros dinámicos de categorías de comida de Foursquare)
  filterButtons.forEach(button => {
    button.addEventListener("click", async (e) => {
      if (!currentTeamId) return;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      // Cambiamos el ID de categoría según Foursquare
      currentCategoryId = e.target.getAttribute("data-category");
      placesList.innerHTML = "<p style='padding: 15px;'>🔄 Actualizando lugares...</p>";

      const match = mockMatches[currentTeamId];
      // Hacemos un nuevo Fetch real con la nueva categoría elegida
      currentPlacesData = await fetchNearbyPlaces(match.lat, match.lon, currentCategoryId);
      
      updateDashboard(match);
    });
  });

  // 📌 EVENTO 4 y 5: click delegado para el itinerario de Favoritos
  dashboard.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-btn") || (e.target.tagName === "BUTTON" && e.target.dataset.id)) {
      const id = e.target.dataset.id;
      const type = e.target.dataset.type;
      const itinerary = getItinerary();
      
      const isFav = type === "matches" 
        ? itinerary.matches.includes(Number(id)) 
        : itinerary.places.includes(id);

      if (isFav) {
        const parsedId = type === "matches" ? Number(id) : id;
        removeFromItinerary(parsedId, type);
      } else {
        if (type === "matches") {
          saveMatchToInerary(Number(id));
        } else {
          savePlaceToItinerary(id);
        }
      }

      if (currentTeamId) {
        updateDashboard(mockMatches[currentTeamId]);
      }
    }
  });

  // Función de control centralizada para redibujar la interfaz
  function updateDashboard(match) {
    const itinerary = getItinerary();
    const isMatchFavorite = itinerary.matches.includes(match.id);

    // Renderizamos el partido con su zona horaria
    renderMatch(match, matchCard, isMatchFavorite);
    
    // Renderizamos los locales reales traídos de Foursquare API
    renderPlaces(currentPlacesData, placesList, itinerary.places);
  }
});

function saveMatchToInerary(id) {
  try { saveMatchToItinerary(id); } catch(e) { console.log("Guardando partido..."); }
}
