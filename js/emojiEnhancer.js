/**
 * ============================================================================
 * EMOJI ENHANCER & GAME VECTOR ART - STARKIDS
 * Substitui emojis nativos rígidos do sistema operacional (como o Segoe do Windows)
 * por ilustrações vetoriais (SVG) expressivas, amigáveis e acolhedoras para crianças,
 * além de integrar o renderizador vetorial Twemoji em toda a interface.
 * ============================================================================
 */

(function () {
  'use strict';

  // Coleção de Ilustrações Vetoriais Oficiais para os Jogos
  const GameVectors = {
    // Jogo 2: Construtor de Palavrinhas
    SOL: `
      <svg viewBox="0 0 100 100" class="game-vector-art sun-art" aria-label="Sol radiante e acolhedor">
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF3B0" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#FFD166" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="sunBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE066"/>
            <stop offset="60%" stop-color="#FFB703"/>
            <stop offset="100%" stop-color="#FB8500"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#sunGlow)"/>
        <g fill="#FFB703" opacity="0.95">
          <circle cx="50" cy="14" r="6"/>
          <circle cx="75" cy="24" r="6"/>
          <circle cx="86" cy="50" r="6"/>
          <circle cx="75" cy="76" r="6"/>
          <circle cx="50" cy="86" r="6"/>
          <circle cx="25" cy="76" r="6"/>
          <circle cx="14" cy="50" r="6"/>
          <circle cx="25" cy="24" r="6"/>
        </g>
        <circle cx="50" cy="50" r="28" fill="url(#sunBodyGrad)"/>
        <!-- Olhos felizes fechados em arco (expressão kawaii suave) -->
        <path d="M 39 46 Q 43 40 47 46" stroke="#5D3A00" stroke-width="2.6" stroke-linecap="round" fill="none"/>
        <path d="M 53 46 Q 57 40 61 46" stroke="#5D3A00" stroke-width="2.6" stroke-linecap="round" fill="none"/>
        <!-- Bochechas rosadas acolhedoras -->
        <circle cx="36" cy="52" r="4.2" fill="#FF70A6" opacity="0.6"/>
        <circle cx="64" cy="52" r="4.2" fill="#FF70A6" opacity="0.6"/>
        <!-- Sorriso gentil -->
        <path d="M 46 52 Q 50 58 54 52" stroke="#5D3A00" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      </svg>
    `,

    LUA: `
      <svg viewBox="0 0 100 100" class="game-vector-art moon-art" aria-label="Lua serena e estrelada">
        <defs>
          <linearGradient id="moonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF2A7"/>
            <stop offset="70%" stop-color="#FFD166"/>
            <stop offset="100%" stop-color="#F4A261"/>
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#E2EBF5"/>
          </linearGradient>
        </defs>
        <!-- Estrelinhas brilhantes em volta -->
        <path d="M 76 22 Q 78 26 82 28 Q 78 30 76 34 Q 74 30 70 28 Q 74 26 76 22 Z" fill="#FFD166"/>
        <path d="M 24 32 Q 25 35 28 36 Q 25 37 24 40 Q 23 37 20 36 Q 23 35 24 32 Z" fill="#FFE494"/>
        <!-- Lua Crescente Acolhedora -->
        <path d="M 58 16 C 74 24 80 44 72 60 C 66 72 54 78 40 76 C 60 72 68 52 58 32 C 54 26 48 20 40 18 C 46 16 52 15 58 16 Z" fill="url(#moonBodyGrad)"/>
        <!-- Expressão serena de sono tranquilo -->
        <path d="M 60 42 Q 64 38 68 42" stroke="#684A12" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <circle cx="68" cy="48" r="3.5" fill="#FF8BA7" opacity="0.6"/>
        <path d="M 59 48 Q 63 52 66 49" stroke="#684A12" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Nuvem fofinha de apoio na base -->
        <path d="M 28 82 C 22 82 18 78 18 73 C 18 69 21 65 25 64 C 27 58 33 54 40 54 C 47 54 53 58 55 64 C 58 64 61 67 61 70 C 63 70 66 73 66 76 C 66 79 63 82 60 82 Z" fill="url(#cloudGrad)"/>
      </svg>
    `,

    MEL: `
      <svg viewBox="0 0 100 100" class="game-vector-art honey-art" aria-label="Pote de mel quentinho com abelhinha">
        <defs>
          <linearGradient id="jarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF8F0"/>
            <stop offset="100%" stop-color="#EEDCCA"/>
          </linearGradient>
          <linearGradient id="honeyDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFC000"/>
            <stop offset="100%" stop-color="#E58E00"/>
          </linearGradient>
        </defs>
        <!-- Borda do pote -->
        <ellipse cx="50" cy="38" rx="22" ry="7" fill="#C49E74"/>
        <!-- Corpo do Pote de Mel -->
        <path d="M 30 38 C 22 55 24 75 32 82 C 38 86 62 86 68 82 C 76 75 78 55 70 38 Z" fill="url(#jarGrad)" stroke="#B88A58" stroke-width="2"/>
        <!-- Rótulo Bonito -->
        <rect x="34" y="52" width="32" height="18" rx="6" fill="#FDFBF7" stroke="#D8C2AA" stroke-width="1.5"/>
        <text x="50" y="65" font-family="'Lexend', sans-serif" font-size="10.5" font-weight="800" fill="#B36B00" text-anchor="middle">MEL</text>
        <!-- Mel escorrendo suavemente -->
        <path d="M 34 38 C 36 45 42 48 46 44 C 49 41 52 47 56 46 C 60 45 64 42 66 38 Z" fill="url(#honeyDripGrad)"/>
        <!-- Abelhinha Amiga -->
        <g transform="translate(64, 18) scale(0.9)">
          <ellipse cx="6" cy="-4" rx="4" ry="7" fill="#E2F0FF" opacity="0.85" transform="rotate(-25 6 -4)"/>
          <ellipse cx="14" cy="-4" rx="4" ry="7" fill="#E2F0FF" opacity="0.85" transform="rotate(25 14 -4)"/>
          <ellipse cx="10" cy="4" rx="9" ry="6" fill="#FFB703"/>
          <path d="M 8 -1 L 8 9 M 12 -1 L 12 9" stroke="#162438" stroke-width="2" stroke-linecap="round"/>
          <circle cx="15" cy="3" r="1.2" fill="#162438"/>
        </g>
      </svg>
    `,

    // Jogo 3: Balança das Quantidades (Frutas)
    APPLE: `
      <svg viewBox="0 0 100 100" class="fruit-vector-art apple-art" aria-label="Maçã">
        <defs>
          <linearGradient id="appleBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5A5F"/>
            <stop offset="60%" stop-color="#E63946"/>
            <stop offset="100%" stop-color="#B71C1C"/>
          </linearGradient>
        </defs>
        <path d="M 50 26 C 50 16 54 12 56 10" stroke="#6F4E37" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 53 18 C 65 14 70 22 66 26 C 58 28 54 22 53 18 Z" fill="#52B788"/>
        <path d="M 50 32 C 38 22 20 28 18 48 C 16 72 36 88 48 90 C 50 90 50 90 52 90 C 64 88 84 72 82 48 C 80 28 62 22 50 32 Z" fill="url(#appleBodyGrad)"/>
        <ellipse cx="34" cy="42" rx="6" ry="12" fill="#FFFFFF" opacity="0.32" transform="rotate(-25 34 42)"/>
      </svg>
    `,

    STRAWBERRY: `
      <svg viewBox="0 0 100 100" class="fruit-vector-art berry-art" aria-label="Morango">
        <defs>
          <linearGradient id="berryBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF6B6B"/>
            <stop offset="60%" stop-color="#EE5253"/>
            <stop offset="100%" stop-color="#C0392B"/>
          </linearGradient>
        </defs>
        <path d="M 50 20 L 50 10 M 34 26 Q 50 24 50 18 Q 50 24 66 26 Q 58 32 50 26 Q 42 32 34 26 Z" fill="#2ECC71"/>
        <path d="M 50 24 C 28 24 22 45 28 65 C 34 82 46 92 50 94 C 54 92 66 82 72 65 C 78 45 72 24 50 24 Z" fill="url(#berryBodyGrad)"/>
        <g fill="#FFE66D" opacity="0.9">
          <ellipse cx="40" cy="40" rx="1.8" ry="2.6" transform="rotate(10 40 40)"/>
          <ellipse cx="60" cy="40" rx="1.8" ry="2.6" transform="rotate(-10 60 40)"/>
          <ellipse cx="50" cy="52" rx="1.8" ry="2.6"/>
          <ellipse cx="36" cy="62" rx="1.8" ry="2.6" transform="rotate(15 36 62)"/>
          <ellipse cx="64" cy="62" rx="1.8" ry="2.6" transform="rotate(-15 64 62)"/>
          <ellipse cx="50" cy="74" rx="1.8" ry="2.6"/>
        </g>
      </svg>
    `,

    PEAR: `
      <svg viewBox="0 0 100 100" class="fruit-vector-art pear-art" aria-label="Pera">
        <defs>
          <linearGradient id="pearBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#B7E4C7"/>
            <stop offset="50%" stop-color="#95D5B2"/>
            <stop offset="100%" stop-color="#74C69D"/>
          </linearGradient>
        </defs>
        <path d="M 50 22 C 50 14 54 10 56 8" stroke="#7A5638" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 53 14 C 64 10 68 18 64 22 C 56 24 53 18 53 14 Z" fill="#52B788"/>
        <path d="M 50 24 C 40 24 38 38 34 50 C 26 62 26 84 40 90 C 46 93 54 93 60 90 C 74 84 74 62 66 50 C 62 38 60 24 50 24 Z" fill="url(#pearBodyGrad)"/>
        <ellipse cx="40" cy="46" rx="4" ry="10" fill="#FFFFFF" opacity="0.35" transform="rotate(-18 40 46)"/>
      </svg>
    `,

    // Jogo 1: Espelho das Emoções (Cenas)
    SUNFLOWER: `
      <svg viewBox="0 0 100 100" class="game-vector-art" aria-label="Girassol alegre">
        <defs>
          <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE066"/>
            <stop offset="100%" stop-color="#F4A261"/>
          </linearGradient>
        </defs>
        <path d="M 50 65 L 50 95" stroke="#2D6A4F" stroke-width="6" stroke-linecap="round"/>
        <path d="M 50 78 Q 65 72 68 84 Q 58 88 50 82 Z" fill="#52B788"/>
        <g fill="url(#petalGrad)">
          <ellipse cx="50" cy="24" rx="7" ry="14"/>
          <ellipse cx="50" cy="66" rx="7" ry="14"/>
          <ellipse cx="29" cy="45" rx="14" ry="7"/>
          <ellipse cx="71" cy="45" rx="14" ry="7"/>
          <ellipse cx="35" cy="30" rx="8" ry="14" transform="rotate(-45 35 30)"/>
          <ellipse cx="65" cy="30" rx="8" ry="14" transform="rotate(45 65 30)"/>
          <ellipse cx="35" cy="60" rx="8" ry="14" transform="rotate(45 35 60)"/>
          <ellipse cx="65" cy="60" rx="8" ry="14" transform="rotate(-45 65 60)"/>
        </g>
        <circle cx="50" cy="45" r="16" fill="#6F4E37"/>
        <circle cx="45" cy="42" r="2.2" fill="#FFE6A7"/>
        <circle cx="55" cy="42" r="2.2" fill="#FFE6A7"/>
        <path d="M 46 48 Q 50 52 54 48" stroke="#FFE6A7" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      </svg>
    `,

    STORM: `
      <svg viewBox="0 0 100 100" class="game-vector-art" aria-label="Nuvem com chuva e raio amigável">
        <path d="M 28 50 C 22 50 16 45 16 38 C 16 32 21 27 26 26 C 29 18 38 14 46 14 C 55 14 63 19 66 26 C 70 26 76 30 76 36 C 81 37 84 41 84 46 C 84 51 80 55 75 55 Z" fill="#708090" opacity="0.9"/>
        <polygon points="52,48 44,62 50,62 46,76 60,58 53,58" fill="#FFD166"/>
        <circle cx="32" cy="68" r="2.5" fill="#48CAE4"/>
        <circle cx="40" cy="80" r="2.5" fill="#48CAE4"/>
        <circle cx="64" cy="72" r="2.5" fill="#48CAE4"/>
      </svg>
    `,

    BREEZE: `
      <svg viewBox="0 0 100 100" class="game-vector-art" aria-label="Folha suave e brisa calma">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#74C69D"/>
            <stop offset="100%" stop-color="#40916C"/>
          </linearGradient>
        </defs>
        <path d="M 16 35 Q 40 28 65 38" stroke="#A8DADC" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
        <path d="M 26 65 Q 55 58 84 68" stroke="#A8DADC" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
        <path d="M 32 60 C 28 35 55 24 74 26 C 78 48 55 72 32 60 Z" fill="url(#leafGrad)"/>
        <path d="M 32 60 Q 52 44 74 26" stroke="#D8F3DC" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      </svg>
    `
  };

  /**
   * Converte emojis nativos na página utilizando a biblioteca Twemoji oficial
   * @param {HTMLElement|Document} container
   */
  function enhanceEmojis(container = document.body) {
    if (!container) return;

    if (window.twemoji && typeof window.twemoji.parse === 'function') {
      try {
        window.twemoji.parse(container, {
          base: 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/',
          folder: 'svg',
          ext: '.svg',
          attributes: () => ({
            loading: 'lazy',
            decoding: 'async'
          })
        });
      } catch (err) {
        console.warn('[EmojiEnhancer] Twemoji parse error:', err);
      }
    }
  }

  // Observers para processar elementos dinâmicos nos jogos sem atraso
  function setupDynamicEmojiObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldParse = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length > 0) {
          shouldParse = true;
          break;
        }
      }
      if (shouldParse) {
        clearTimeout(setupDynamicEmojiObserver._timer);
        setupDynamicEmojiObserver._timer = setTimeout(() => {
          enhanceEmojis(document.getElementById('gameActiveStage') || document.body);
        }, 60);
      }
    });

    const target = document.getElementById('gameActiveStage') || document.body;
    observer.observe(target, { childList: true, subtree: true });
  }

  // Inicialização no DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      enhanceEmojis(document.body);
      setupDynamicEmojiObserver();
    });
  } else {
    enhanceEmojis(document.body);
    setupDynamicEmojiObserver();
  }

  // Exportação Global
  window.EmojiEnhancer = {
    vectors: GameVectors,
    enhance: enhanceEmojis
  };
})();
