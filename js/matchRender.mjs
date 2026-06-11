// js/matchRender.mjs
import { convertUTCToLocal } from "./utils.mjs";

export function renderMatch(match, containerElement, isFavorite = false) {
  const localTime = convertUTCToLocal(match.dateUTC);
  
  // Determinamos el texto y la clase del botón según si ya es favorito o no
  const btnText = isFavorite ? "❤️ Quitar del Itinerario" : "⭐ Guardar Partido";
  const btnClass = isFavorite ? "fav-btn active" : "fav-btn";

  containerElement.innerHTML = `
    <div class="match-detail-card" style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-top: 10px; background: #ffffff;">
      <h3>⚽ ${match.teamName} vs ${match.opponent}</h3>
      <p><strong>🏟️ Estadio:</strong> ${match.stadiumName} (${match.city})</p>
      <p><strong>👥 Capacidad:</strong> ${match.capacity.toLocaleString()} espectadores</p>
      <p><strong>📅 Tu Hora Local:</strong> <span style="color: #2e7d32; font-weight: bold;">${localTime}</span></p>
      
      <!-- Evento de Click planeado aquí -->
      <button class="${btnClass}" data-id="${match.id}" data-type="matches" style="margin-top: 15px; padding: 8px 15px; border-radius: 4px; border: none; background-color: #fbc02d; font-weight: bold; cursor: pointer;">
        ${btnText}
      </button>
    </div>
  `;
}

