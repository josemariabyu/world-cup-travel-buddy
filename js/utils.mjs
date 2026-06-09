// js/utils.mjs

// Función para convertir una fecha ISO/UTC a un formato local legible
export function convertUTCToLocal(utcString) {
  const date = new Date(utcString);
  
  // Opciones para formatear la fecha de manera amigable
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  // Convierte automáticamente usando la zona horaria del navegador
  return date.toLocaleDateString('es-ES', options);
}
