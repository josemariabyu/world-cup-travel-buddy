// js/placesRender.mjs

export function renderPlaces(places, containerElement, favoriteIds = []) {
  if (places.length === 0) {
    containerElement.innerHTML = "<p>No hay lugares comerciales en esta categoría cerca del estadio.</p>";
    return;
  }

  containerElement.innerHTML = places.map(place => {
    const isFavorite = favoriteIds.includes(place.id);
    const btnText = isFavorite ? "❤️ Quitar" : "⭐ Guardar";
    
    return `
      <div class="place-card" data-id="${place.id}" style="border-left: 5px solid #fbc02d; background: #fafafa; padding: 15px; margin: 10px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); transition: transform 0.2s;">
        <h4>🍔 ${place.name}</h4>
        <p>⭐ ${place.rating} (${place.reviews} reseñas) — <span style="color: #2e7d32; font-weight: bold;">${place.price}</span></p>
        <p>📍 ${place.address}</p>
        <p>🏃‍♂️ A solo <strong>${place.distanceMeters} metros</strong> del estadio</p>
        
        <!-- Evento de Click planeado aquí -->
        <button class="fav-btn" data-id="${place.id}" data-type="places" style="margin-top: 10px; padding: 5px 10px; border: 1px solid #ccc; background: #fff; border-radius: 4px; cursor: pointer;">
          ${btnText}
        </button>
      </div>
    `;
  }).join('');

  // Agregar efectos visuales interactivos mediante JavaScript (Eventos 4 y 5 de la rúbrica)
  const cards = containerElement.querySelectorAll('.place-card');
  cards.forEach(card => {
    card.addEventListener('mouseover', () => {
      card.style.transform = 'scale(1.02)';
      card.style.backgroundColor = '#fffdeb';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.backgroundColor = '#fafafa';
    });
  });
}

