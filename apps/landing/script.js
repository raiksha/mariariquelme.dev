// ── FRASES ──
const quotesES = [
  { text: "El autoconocimiento es la herramienta más afilada que tengo.", attr: "" },
  { text: "Comprender en profundidad, construir con intención.", attr: "" },
  { text: "Sé que soy solo una chica, ¿pero puedo cambiar vidas? Si lo intento, creo que puedo.", attr: "— AURORA" },
  { text: "La duda debe seguir a la convicción como una sombra.", attr: "— Gabriel Boric, parafraseando a Albert Camus" }
];
const quotesEN = [
  { text: "Self-knowledge is the sharpest tool I own.", attr: "" },
  { text: "Understanding things deeply, building them deliberately.", attr: "" },
  { text: "I know I'm just a girl, but can I change lives? If I am trying, I think I can.", attr: "— AURORA" },
  { text: "Doubt must follow conviction like a shadow.", attr: "— Gabriel Boric, paraphrasing Albert Camus" }
];

const cardTextES = { portfolioLabel: "Portafolio", portfolio: "Explora mi trabajo", blog: "Lee mi perspectiva", constanza: "Offline" };
const cardTextEN = { portfolioLabel: "Portfolio",   portfolio: "Check out my work", blog: "Read my thoughts", constanza: "Offline" };

let currentLang  = 'es';
let currentQuote = 0;
let quotes       = quotesES;

const qText  = document.getElementById('quote-text');
const qAttr  = document.getElementById('quote-attr');
const dotEls = document.querySelectorAll('.dot');

function showQuote(i, instant = false) {
  if (!instant) {
    qText.classList.remove('visible');
    qAttr.classList.remove('visible');
  }
  setTimeout(() => {
    qText.textContent = quotes[i].text;
    qAttr.textContent = quotes[i].attr;
    qText.classList.add('visible');
    qAttr.classList.add('visible');
    dotEls.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }, instant ? 0 : 450);
}

setInterval(() => {
  currentQuote = (currentQuote + 1) % quotes.length;
  showQuote(currentQuote);
}, 4500);

dotEls.forEach(dot => {
  dot.addEventListener('click', () => {
    currentQuote = parseInt(dot.dataset.index);
    showQuote(currentQuote, true);
  });
});

// ── IDIOMA ──
const langBtn      = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langFlag     = document.getElementById('lang-flag');
const langLabelBtn = document.getElementById('lang-label-btn');
const langOptions  = document.querySelectorAll('.lang-option');

langBtn.addEventListener('click', () => {
  const isOpen = langDropdown.classList.toggle('open');
  langBtn.classList.toggle('open', isOpen);
});

document.addEventListener('click', e => {
  if (!document.querySelector('.lang-wrapper').contains(e.target)) {
    langDropdown.classList.remove('open');
    langBtn.classList.remove('open');
  }
});

langOptions.forEach(option => {
  option.addEventListener('click', () => setLang(option.dataset.lang));
});

function setLang(lang) {
  currentLang = lang;
  quotes = lang === 'es' ? quotesES : quotesEN;
  const ct = lang === 'es' ? cardTextES : cardTextEN;

  langFlag.textContent     = lang === 'es' ? '🇨🇱' : '🇬🇧';
  langLabelBtn.textContent = lang === 'es' ? 'Español' : 'English';
  langDropdown.classList.remove('open');
  langBtn.classList.remove('open');

  langOptions.forEach(el => el.classList.toggle('selected', el.dataset.lang === lang));

  document.getElementById('label-portfolio').textContent  = ct.portfolioLabel;
  document.getElementById('title-portfolio').textContent  = ct.portfolio;
  document.getElementById('title-blog').textContent       = ct.blog;
  document.getElementById('title-constanza').textContent  = ct.constanza;

  document.documentElement.lang = lang;
  showQuote(currentQuote, true);
}

// ── ANIMACIÓN TERMINAL (Portafolio) ──
const termLines = [
  "$ npm run dev",
  "▸ compiling...",
  "✓ ready in 298ms",
  "$ git add .",
  "$ git commit -m 'feat: landing'",
  "▸ pushing to origin main...",
  "✓ deployed successfully",
  "$ java -jar app.jar",
  "▸ Spring Boot 3.2.0",
  "✓ started on port :8080",
  "$ mvn clean install",
  "✓ BUILD SUCCESS"
];

let termIdx = 0;
let termInterval = null;
const termEl = document.getElementById('term-lines');
const cardPortfolio = document.querySelector('.card-portfolio');

cardPortfolio.addEventListener('mouseenter', () => {
  termEl.innerHTML = '';
  termIdx = 0;
  termInterval = setInterval(() => {
    const line = document.createElement('div');
    line.textContent = termLines[termIdx % termLines.length];
    termEl.appendChild(line);
    if (termEl.children.length > 9) termEl.removeChild(termEl.firstChild);
    termIdx++;
  }, 270);
});

cardPortfolio.addEventListener('mouseleave', () => clearInterval(termInterval));

// ── ANIMACIÓN DOCUMENTO (Blog) ──
const docEl      = document.getElementById('doc-lines');
const lineWidths = [85, 60, 90, 45, 75, 88, 55, 70, 92, 50, 80, 65, 72, 38, 95];
let docOffset    = 0;
let docInterval  = null;

lineWidths.forEach(w => {
  const l = document.createElement('div');
  l.className  = 'doc-line';
  l.style.width = w + '%';
  docEl.appendChild(l);
});

document.querySelector('.card-blog').addEventListener('mouseenter', () => {
  docInterval = setInterval(() => {
    docOffset = (docOffset + 1) % lineWidths.length;
    const newLine = document.createElement('div');
    newLine.className   = 'doc-line';
    newLine.style.width = lineWidths[docOffset] + '%';
    newLine.style.opacity    = '0';
    newLine.style.transition = 'opacity 0.3s';
    docEl.appendChild(newLine);
    setTimeout(() => newLine.style.opacity = '1', 30);
    if (docEl.children.length > 16) {
      const first = docEl.firstChild;
      first.style.transition = 'opacity 0.2s';
      first.style.opacity    = '0';
      setTimeout(() => { if (first.parentNode) docEl.removeChild(first); }, 220);
    }
  }, 370);
});

document.querySelector('.card-blog').addEventListener('mouseleave', () => clearInterval(docInterval));
