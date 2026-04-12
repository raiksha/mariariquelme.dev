/**
 * script.js — mariariquelme.dev (Under Construction)
 *
 * Por ahora el JS es mínimo e intencional:
 * no hay funcionalidad pesada, solo detalles que el CSS solo no puede hacer.
 */

/**
 * Detecta el subdominio actual y actualiza
 * el badge del header con él.
 * 
 * ¿Por qué? Porque esta misma página se usa en TODOS los subdominios.
 * Así cada una muestra su propio nombre sin duplicar el HTML.
 */
function setDomainBadge() {
  const badge = document.querySelector('.domain-badge');
  if (!badge) return;

  const hostname = window.location.hostname;
  // Si es localhost o IP, muestra el nombre por defecto
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    badge.textContent = 'mariariquelme.dev';
    return;
  }

  badge.textContent = hostname;
}


/**
 * Actualiza el texto según el subdominio.
 * Cada sección del sitio puede tener un mensaje levemente distinto.
 */
function setSubdomainMessage() {
  const hostname = window.location.hostname;

  const messages = {
    'portfolio.mariariquelme.dev': {
      es: 'Portafolio en construcción.',
      en: 'Portfolio incoming.'
    },
    'blog.mariariquelme.dev': {
      es: 'El blog se está escribiendo.',
      en: 'The blog is being written.'
    },
    'constanza.mariariquelme.dev': {
      es: 'Espacio personal en construcción.',
      en: 'Personal space under construction.'
    },
    'app.mariariquelme.dev': {
      es: 'Aplicaciones en camino.',
      en: 'Apps on the way.'
    },
  };

  const msg = messages[hostname];
  if (!msg) return; // dominio principal: usa el texto por defecto del HTML

  const descText = document.querySelector('.desc-text');
  const descTextEn = document.querySelector('.desc-text-en');

  if (descText) {
    descText.innerHTML = `${msg.es}<br><span class="muted">Vuelve pronto.</span>`;
  }
  if (descTextEn) {
    descTextEn.textContent = `${msg.en} Check back soon.`;
  }
}


/**
 * Efecto sutil: el marco de la imagen
 * levemente "vibra" al hacer hover,
 * como una señal de construcción parpadeante.
 */
function initFrameHover() {
  const frame = document.querySelector('.image-frame');
  if (!frame) return;

  frame.addEventListener('mouseenter', () => {
    frame.style.transform = 'scale(1.01)';
    frame.style.transition = 'transform 0.2s ease';
  });

  frame.addEventListener('mouseleave', () => {
    frame.style.transform = 'scale(1)';
  });
}


// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  setDomainBadge();
  setSubdomainMessage();
  initFrameHover();

  // Año dinámico: lee la fecha local del navegador del visitante
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
