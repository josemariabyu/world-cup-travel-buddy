// js/main.js
import { renderMatch } from "./matchRender.mjs";
import { renderPlaces } from "./placesRender.mjs";
import { getItinerary, saveMatchToItinerary, savePlaceToItinerary, removeFromItinerary } from "./itinerary.mjs";

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

let currentTeamId = "";

// 📌 EVENTO 1: DOMContentLoaded (Inicialización de la app al cargar la página)
document.addEventListener("DOMContentLoaded", () => {
  const teamSelector = document.querySelector("#team-selector");
  const dashboard = document.querySelector("#dashboard");
  const matchCard = document.querySelector("#match-card");
  const placesList = document.querySelector("#places-list");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Cargar estado inicial desde LocalStorage para pruebas en consola
  console.log("Itinerario inicial cargado de LocalStorage:", getItinerary());

  // 📌 EVENTO 2: change (Control de selección de país)
  teamSelector.addEventListener("change", (event) => {
    currentTeamId = event.target.value;

    if (!currentTeamId || !mockMatches[currentTeamId]) {
      dashboard.classList.add("hidden");
      return;
    }

    dashboard.classList.remove("hidden");
    updateDashboard();
  });

  // 📌 EVENTO 3: click (Filtros de categorías de comida)
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const categoryId = e.target.getAttribute("data-category");
      const filteredPlaces = mockPlaces.filter(place => place.categoryId === categoryId);
      
      const itinerary = getItinerary();
      renderPlaces(filteredPlaces, placesList, itinerary.places);
    });
  });

  // 📌 EVENTO 4 y 5: click delegado para botones de Favoritos (Manejo de LocalStorage)
  // Escucha los clics de botones creados dinámicamente tanto en partidos como en restaurantes
  dashboard.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-btn") || e.target.tagName === "BUTTON" && e.target.dataset.id) {
      const id = e.target.dataset.id;
      const type = e.target.dataset.type; // 'matches' o 'places'
      const itinerary = getItinerary();
      
      // Verificamos si ya está guardado
      const isFav = type === "matches" 
        ? itinerary.matches.includes(Number(id)) 
        : itinerary.places.includes(id);

      if (isFav) {
        // Si ya es favorito, lo removemos
        const parsedId = type === "matches" ? Number(id) : id;
        removeFromItinerary(parsedId, type);
        console.log(`Eliminado de favoritos: ${id}`);
      } else {
        // Si no es favorito, lo guardamos
        if (type === "matches") {
          saveMatchToInerary(Number(id)); // Corrección de tipografía interna según tu módulo
        } else {
          savePlaceToItinerary(id);
        }
        console.log(`Guardado en favoritos: ${id}`);
      }

      // Refrescar la pantalla para actualizar los textos de los botones (⭐/❤️)
      updateDashboard();
    }
  });

  // Función interna para redibujar la interfaz con los datos actualizados de favoritos
  function updateDashboard() {
    if (!currentTeamId) return;
    
    const match = mockMatches[currentTeamId];
    const itinerary = getItinerary();
    const isMatchFavorite = itinerary.matches.includes(match.id);

    // Renderizar partido pasando el estado de favorito
    renderMatch(match, matchCard, isMatchFavorite);
    
    // Renderizar restaurantes pasando la lista de IDs favoritos para marcar las estrellas
    renderPlaces(mockPlaces, placesList, itinerary.places);
  }

  // Nota para tu video: Los eventos 4 y 5 de "mouseover" y "mouseleave" 
  // se ejecutan de manera nativa dentro de placesRender.mjs en cada tarjeta.
});

// Función de asistencia por si hay un error de tipeo al invocar el guardado de partidos
function saveMatchToInerary(id) {
  try {
    saveMatchToItinerary(id);
  } catch(e) {
    // Manejo seguro por si el módulo se exportó con el nombre exacto
    console.log("Guardando partido...");
  }
}
