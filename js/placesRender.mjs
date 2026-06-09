// js/placesRender.mjs

export function renderPlaces(places, containerElement) {
  if (places.length === 0) {
    containerElement.innerHTML = "<p>No hay lugares comerciales en esta categoría cerca del estadio.</p>";
    return;
  }

  containerElement.innerHTML = places.map(place => `
    <div class="place-card" style="border-left: 5px solid #fbc02d; background: #fafafa; padding: 15px; margin: 10px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <h4>🍔 ${place.name}</h4>
      <p>⭐ ${place.rating} (${place.reviews} reseñas) — <span class="price-indicator" style="color: #2e7d32; font-weight: bold;">${place.price}</span></p>
      <p>📍 ${place.address}</p>
      <p>🏃‍♂️ A solo <strong>${place.distanceMeters} metros</strong> del estadio</p>
    </div>
  `).join('');
}
