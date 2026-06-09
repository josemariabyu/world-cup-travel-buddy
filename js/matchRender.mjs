// js/matchRender.mjs
import { convertUTCToLocal } from "./utils.mjs";

export function renderMatch(match, containerElement) {
  // Convertimos la hora UTC a la hora local del usuario
  const localTime = convertUTCToLocal(match.dateUTC);

  containerElement.innerHTML = `
    <div class="match-detail-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 10px;">
      <h3>⚽ ${match.teamName} vs ${match.opponent}</h3>
      <p><strong>🏟️ Estadio:</strong> ${match.stadiumName} (${match.city})</p>
      <p><strong>👥 Capacidad:</strong> ${match.capacity.toLocaleString()} espectadores</p>
      <p><strong>📅 Tu Hora Local:</strong> <span style="color: #2e7d32; font-weight: bold;">${localTime}</span></p>
    </div>
  `;
}
