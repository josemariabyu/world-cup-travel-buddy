// js/itinerary.mjs

const STORAGE_KEY = "wctb_favorites_itinerary";

// Obtener la lista completa de favoritos guardados
export function getItinerary() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { matches: [], places: [] };
}

// Guardar un partido en favoritos
export function saveMatchToItinerary(matchId) {
  const itinerary = getItinerary();
  if (!itinerary.matches.includes(matchId)) {
    itinerary.matches.push(matchId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
  }
}

// Guardar un restaurante/bar en favoritos
export function savePlaceToItinerary(placeId) {
  const itinerary = getItinerary();
  if (!itinerary.places.includes(placeId)) {
    itinerary.places.push(placeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
  }
}

// Eliminar un elemento de favoritos
export function removeFromItinerary(id, type) { // type puede ser 'matches' o 'places'
  const itinerary = getItinerary();
  if (itinerary[type]) {
    itinerary[type] = itinerary[type].filter(itemId => itemId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
  }
}
