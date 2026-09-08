/* ==========================================================================
   CATÁLOGO DE 52 ACESSÓRIOS DO PIP - PIP: AVENTURAS SENSORIAIS
   Divididos em 5 categorias: Chapéus, Rosto, Roupas, Amiguinhos e Auras.
   Cada acessório possui SVG desenhado para o viewBox de 220x220 do Pip.
   ========================================================================== */

export const ACCESSORIES_DATABASE = [
  // --------------------------------------------------------------------------
  // CATEGORIA 1: CHAPÉUS E CABEÇA (12 itens)
  // --------------------------------------------------------------------------
  {
    id: 'leaf_hat',
    name: 'Folhinha Mágica',
    icon: '🍃',
    category: 'hats',
    desc: 'Uma folhinha fresca do bosque que dança com a brisa.',
    svg: `
      <g id="acc-leaf_hat" transform="translate(92, 18)">
        <path d="M18 35 C18 15, 30 5, 45 2 C35 15, 32 28, 26 36 Z" fill="#7FA99B" stroke="#5A8F7B" stroke-width="2" stroke-linejoin="round" />
        <path d="M26 22 Q34 14 42 6" stroke="#4D7C6B" stroke-width="1.5" fill="none" />
      </g>
    `
  },
  {
    id: 'explorer_cap',
    name: 'Boné de Explorador',
    icon: '🧢',
    category: 'hats',
    desc: 'Perfeito para descobrir novos caminhos no jardim.',
    svg: `
      <g id="acc-explorer_cap" transform="translate(68, 22)">
        <path d="M10 22 C10 8, 30 0, 50 0 C70 0, 80 8, 80 22 Z" fill="#6B9080" stroke="#4D6B5E" stroke-width="2" />
        <ellipse cx="65" cy="22" rx="35" ry="7" fill="#587A6D" stroke="#4D6B5E" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'cozy_beanie',
    name: 'Gorro Aconchegante',
    icon: '🧶',
    category: 'hats',
    desc: 'Feito de lã quentinha e macia.',
    svg: `
      <g id="acc-cozy_beanie" transform="translate(70, 16)">
        <path d="M12 28 C12 6, 40 -2, 68 28 Z" fill="#EAA875" stroke="#C88554" stroke-width="2" />
        <rect x="8" y="24" width="64" height="8" rx="4" fill="#FCE8DA" stroke="#C88554" stroke-width="1.5" />
        <circle cx="40" cy="0" r="8" fill="#FCE8DA" stroke="#C88554" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'flower_crown',
    name: 'Tiara de Flores',
    icon: '👑',
    category: 'hats',
    desc: 'Flores aromáticas entrelaçadas com amor.',
    svg: `
      <g id="acc-flower_crown" transform="translate(65, 26)">
        <path d="M10 18 Q45 10 80 18" stroke="#7FA99B" stroke-width="3" fill="none" />
        <circle cx="20" cy="16" r="6" fill="#FAD0DA" />
        <circle cx="45" cy="12" r="8" fill="#FCE69C" />
        <circle cx="70" cy="16" r="6" fill="#D8E8E1" />
      </g>
    `
  },
  {
    id: 'star_crown',
    name: 'Coroa de Estrelas',
    icon: '⭐',
    category: 'hats',
    desc: 'Feita da poeira brilhante das estrelas cadentes.',
    svg: `
      <g id="acc-star_crown" transform="translate(68, 14)">
        <polygon points="12,24 24,6 36,24 48,2 60,24 72,6 84,24" fill="#FCE69C" stroke="#D4A747" stroke-width="2" stroke-linejoin="round" />
      </g>
    `
  },
  {
    id: 'magic_tophat',
    name: 'Cartola Mágica',
    icon: '🎩',
    category: 'hats',
    desc: 'Guarda pequenos truques e surpresas agradáveis.',
    svg: `
      <g id="acc-magic_tophat" transform="translate(74, 8)">
        <rect x="18" y="0" width="36" height="34" rx="4" fill="#4B3F72" stroke="#322950" stroke-width="2" />
        <rect x="18" y="24" width="36" height="6" fill="#9C8EB9" />
        <ellipse cx="36" cy="34" rx="34" ry="6" fill="#4B3F72" stroke="#322950" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'chef_hat',
    name: 'Chapéu de Confeiteiro',
    icon: '🧁',
    category: 'hats',
    desc: 'Para preparar receitas e lanchinhos deliciosos.',
    svg: `
      <g id="acc-chef_hat" transform="translate(72, 6)">
        <circle cx="25" cy="18" r="16" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" />
        <circle cx="48" cy="14" r="18" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" />
        <circle cx="68" cy="18" r="16" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" />
        <rect x="20" y="26" width="54" height="14" rx="2" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'painter_beret',
    name: 'Boina de Pintor',
    icon: '🎨',
    category: 'hats',
    desc: 'Inspira a desenhar e misturar tintas do coração.',
    svg: `
      <g id="acc-painter_beret" transform="translate(68, 16)">
        <ellipse cx="44" cy="18" rx="42" ry="14" fill="#9C8EB9" stroke="#7A6899" stroke-width="2" transform="rotate(-8 44 18)" />
        <circle cx="48" cy="4" r="3" fill="#7A6899" />
      </g>
    `
  },
  {
    id: 'pink_bow',
    name: 'Laço Rosa Bebê',
    icon: '🎀',
    category: 'hats',
    desc: 'Um laço de cetim aveludado e delicado.',
    svg: `
      <g id="acc-pink_bow" transform="translate(86, 22)">
        <polygon points="24,14 6,4 10,24" fill="#FAD0DA" stroke="#EFA7B8" stroke-width="1.5" />
        <polygon points="24,14 42,4 38,24" fill="#FAD0DA" stroke="#EFA7B8" stroke-width="1.5" />
        <circle cx="24" cy="14" r="5" fill="#EFA7B8" />
      </g>
    `
  },
  {
    id: 'mushroom_cap',
    name: 'Chapéu de Cogumelo',
    icon: '🍄',
    category: 'hats',
    desc: 'Inspirado nos pequenos cogumelos do orvalho.',
    svg: `
      <g id="acc-mushroom_cap" transform="translate(62, 14)">
        <path d="M6 30 C6 6, 90 6, 90 30 Z" fill="#E57373" stroke="#C62828" stroke-width="2" />
        <circle cx="28" cy="20" r="5" fill="#FFFFFF" />
        <circle cx="50" cy="14" r="6" fill="#FFFFFF" />
        <circle cx="72" cy="22" r="5" fill="#FFFFFF" />
      </g>
    `
  },
  {
    id: 'calm_headphones',
    name: 'Fones Acolhedores',
    icon: '🎧',
    category: 'hats',
    desc: 'Ajudam a abafar barulhos fortes e trazem serenidade.',
    svg: `
      <g id="acc-calm_headphones" transform="translate(42, 48)">
        <path d="M12 40 C12 -5, 124 -5, 124 40" stroke="#5A8F7B" stroke-width="4" fill="none" stroke-linecap="round" />
        <rect x="0" y="32" width="18" height="32" rx="8" fill="#8FB9A8" stroke="#5A8F7B" stroke-width="2" />
        <rect x="118" y="32" width="18" height="32" rx="8" fill="#8FB9A8" stroke="#5A8F7B" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'bunny_ears',
    name: 'Orelhinhas de Coelho',
    icon: '🐰',
    category: 'hats',
    desc: 'Orelhinhas compridas que ouvem o som das plantinhas crescendo.',
    svg: `
      <g id="acc-bunny_ears" transform="translate(74, 2)">
        <ellipse cx="20" cy="22" rx="8" ry="24" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" transform="rotate(-12 20 22)" />
        <ellipse cx="20" cy="22" rx="4" ry="16" fill="#FAD0DA" transform="rotate(-12 20 22)" />
        <ellipse cx="52" cy="22" rx="8" ry="24" fill="#FFFFFF" stroke="#DDE8E4" stroke-width="2" transform="rotate(12 52 22)" />
        <ellipse cx="52" cy="22" rx="4" ry="16" fill="#FAD0DA" transform="rotate(12 52 22)" />
      </g>
    `
  },

  // --------------------------------------------------------------------------
  // CATEGORIA 2: ÓCULOS E ROSTO (10 itens)
  // --------------------------------------------------------------------------
  {
    id: 'star_glasses',
    name: 'Óculos de Estrelas',
    icon: '⭐',
    category: 'face',
    desc: 'Deixam tudo reluzir como uma noite calma.',
    svg: `
      <g id="acc-star_glasses" transform="translate(56, 76)">
        <polygon points="24,5 29,18 43,18 31,26 35,39 24,31 13,39 17,26 5,18 19,18" fill="rgba(230, 200, 110, 0.4)" stroke="#D4A747" stroke-width="2" />
        <polygon points="84,5 89,18 103,18 91,26 95,39 84,31 73,39 77,26 65,18 79,18" fill="rgba(230, 200, 110, 0.4)" stroke="#D4A747" stroke-width="2" />
        <path d="M43 20 Q54 15 65 20" stroke="#D4A747" stroke-width="2.5" fill="none" />
      </g>
    `
  },
  {
    id: 'round_glasses',
    name: 'Óculos Redondinhos',
    icon: '👓',
    category: 'face',
    desc: 'Óculos clássicos para ler histórias e poesias.',
    svg: `
      <g id="acc-round_glasses" transform="translate(62, 84)">
        <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.4)" stroke="#8A6B53" stroke-width="2.5" />
        <circle cx="76" cy="20" r="18" fill="rgba(255,255,255,0.4)" stroke="#8A6B53" stroke-width="2.5" />
        <path d="M38 18 Q48 14 58 18" stroke="#8A6B53" stroke-width="2.5" fill="none" />
      </g>
    `
  },
  {
    id: 'sleepy_mask',
    name: 'Máscara dos Sonhos',
    icon: '💤',
    category: 'face',
    desc: 'Para um soninho reparador no meio da tarde.',
    svg: `
      <g id="acc-sleepy_mask" transform="translate(58, 86)">
        <rect x="0" y="0" width="104" height="28" rx="14" fill="#9C8EB9" stroke="#7A6899" stroke-width="2" />
        <path d="M24 16 Q32 24 40 16" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M64 16 Q72 24 80 16" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" />
      </g>
    `
  },
  {
    id: 'sun_shades',
    name: 'Óculos de Sol Retrô',
    icon: '🕶️',
    category: 'face',
    desc: 'Protege a visão de luzes excessivas.',
    svg: `
      <g id="acc-sun_shades" transform="translate(56, 88)">
        <path d="M6 6 Q28 6 44 22 Q12 28 6 6 Z" fill="#2C3E38" stroke="#12241F" stroke-width="2" />
        <path d="M102 6 Q80 6 64 22 Q96 28 102 6 Z" fill="#2C3E38" stroke="#12241F" stroke-width="2" />
        <path d="M44 10 L64 10" stroke="#12241F" stroke-width="3" />
      </g>
    `
  },
  {
    id: 'gentle_mustache',
    name: 'Bigodinho Divertido',
    icon: '🥸',
    category: 'face',
    desc: 'Dá um toque engraçado e brincalhão ao Pip.',
    svg: `
      <g id="acc-gentle_mustache" transform="translate(86, 120)">
        <path d="M24 6 Q14 -6 0 6 Q12 14 24 6 Z" fill="#584132" />
        <path d="M24 6 Q34 -6 48 6 Q36 14 24 6 Z" fill="#584132" />
      </g>
    `
  },
  {
    id: 'friendly_eyepatch',
    name: 'Tapa-Olho de Veludo',
    icon: '🏴‍☠️',
    category: 'face',
    desc: 'Um acessório de aventuras suaves pelos mares.',
    svg: `
      <g id="acc-friendly_eyepatch" transform="translate(68, 86)">
        <ellipse cx="18" cy="20" rx="14" ry="12" fill="#5A8F7B" stroke="#3D6656" stroke-width="1.5" />
        <path d="M-10 10 L46 32" stroke="#3D6656" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'swim_goggles',
    name: 'Óculos de Mergulho',
    icon: '🤿',
    category: 'face',
    desc: 'Para espiar os peixinhos debaixo d’água.',
    svg: `
      <g id="acc-swim_goggles" transform="translate(58, 86)">
        <rect x="8" y="4" width="38" height="24" rx="12" fill="rgba(123, 175, 212, 0.4)" stroke="#7BAFD4" stroke-width="2.5" />
        <rect x="58" y="4" width="38" height="24" rx="12" fill="rgba(123, 175, 212, 0.4)" stroke="#7BAFD4" stroke-width="2.5" />
        <path d="M46 16 L58 16" stroke="#7BAFD4" stroke-width="3" />
      </g>
    `
  },
  {
    id: 'heart_blush',
    name: 'Bochechas de Coração',
    icon: '💖',
    category: 'face',
    desc: 'Corações que mostram o carinho do Pip.',
    svg: `
      <g id="acc-heart_blush" transform="translate(62, 114)">
        <path d="M12 4 Q12 0 8 0 Q3 0 0 5 Q0 9 12 18 Q24 9 24 5 Q21 0 16 0 Q12 0 12 4 Z" fill="#F48FB1" transform="scale(0.8)" />
        <path d="M112 4 Q112 0 108 0 Q103 0 100 5 Q100 9 112 18 Q124 9 124 5 Q121 0 116 0 Q112 0 112 4 Z" fill="#F48FB1" transform="scale(0.8)" />
      </g>
    `
  },
  {
    id: 'curious_monocle',
    name: 'Monóculo Curioso',
    icon: '🧐',
    category: 'face',
    desc: 'Para inspecionar as formiguinhas e folhinhas.',
    svg: `
      <g id="acc-curious_monocle" transform="translate(126, 88)">
        <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.4)" stroke="#D4A747" stroke-width="2.5" />
        <path d="M16 30 L22 56" stroke="#D4A747" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'clown_nose',
    name: 'Narizinho de Algodão',
    icon: '🔴',
    category: 'face',
    desc: 'Vermelhinho e macio, faz um som fofo quando apertado.',
    svg: `
      <g id="acc-clown_nose" transform="translate(102, 112)">
        <circle cx="8" cy="8" r="9" fill="#E57373" stroke="#C62828" stroke-width="1.5" />
        <circle cx="5" cy="5" r="3" fill="#FFFFFF" />
      </g>
    `
  },

  // --------------------------------------------------------------------------
  // CATEGORIA 3: ROUPAS, CAPAS E CACHECÓIS (10 itens)
  // --------------------------------------------------------------------------
  // CATEGORIA 3: ROUPAS, CAPAS E CACHECÓIS (10 itens)
  // --------------------------------------------------------------------------
  {
    id: 'cloud_scarf',
    name: 'Cachecol Nuvem',
    icon: '☁️',
    category: 'clothes',
    desc: 'Tão leve e aconchegante quanto uma nuvenzinha.',
    svg: `
      <g id="acc-cloud_scarf" transform="translate(42, 138)">
        <path d="M15 15 Q25 0 45 8 Q65 -2 85 8 Q105 0 120 15 Q105 32 80 25 Q65 35 45 25 Q25 32 15 15 Z" fill="#E8F1F7" stroke="#A8C5DA" stroke-width="2" />
        <path d="M85 24 C88 34, 91 42, 93 50 C85 52, 77 51, 74 46 C76 38, 78 30, 80 25 Z" fill="#E8F1F7" stroke="#A8C5DA" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'hero_cape',
    name: 'Capa da Coragem',
    icon: '🦸',
    category: 'clothes',
    desc: 'Lembra que cada pequeno passo é uma grande vitória.',
    svgBack: `
      <g id="acc-hero_cape-back">
        <!-- Tecido nobre da Capa de Herói (flui atrás do corpinho até os pezinhos, sem ultrapassar o chão) -->
        <path d="M52 130 C30 144 26 170 30 190 C68 193 152 193 190 190 C194 170 190 144 168 130 Z" fill="#E53935" stroke="#B71C1C" stroke-width="2" />
        <path d="M42 160 C38 175 40 184 48 189" stroke="#EF5350" stroke-width="2" fill="none" opacity="0.6" />
        <path d="M178 160 C182 175 180 184 172 189" stroke="#C62828" stroke-width="2" fill="none" opacity="0.6" />
      </g>
    `,
    svg: `
      <g id="acc-hero_cape-front">
        <!-- Fita aveludada no peito e broche estelar de ouro com rubi -->
        <path d="M54 130 Q110 146 166 130" stroke="#C62828" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <circle cx="110" cy="138" r="8" fill="#FCE69C" stroke="#D4A747" stroke-width="2" />
        <polygon points="110,132 112,136 116,136.5 113,139.5 114,143.5 110,141 106,143.5 107,139.5 104,136.5 108,136" fill="#E53935" />
      </g>
    `
  },
  {
    id: 'bow_tie',
    name: 'Gravatinha Borboleta',
    icon: '👔',
    category: 'clothes',
    desc: 'Muito elegante para passeios de domingo.',
    svg: `
      <g id="acc-bow_tie" transform="translate(90, 142)">
        <polygon points="20,12 4,4 8,20" fill="#4B3F72" stroke="#322950" stroke-width="1.5" />
        <polygon points="20,12 36,4 32,20" fill="#4B3F72" stroke="#322950" stroke-width="1.5" />
        <circle cx="20" cy="12" r="4" fill="#EAA875" />
      </g>
    `
  },
  {
    id: 'garden_apron',
    name: 'Avental do Bosque',
    icon: '🪴',
    category: 'clothes',
    desc: 'Tem bolsinhos perfeitos para guardar sementinhas.',
    svg: `
      <g id="acc-garden_apron" transform="translate(68, 142)">
        <path d="M16 0 L68 0 L74 42 Q42 48 10 42 Z" fill="#8FB9A8" stroke="#5A8F7B" stroke-width="2" />
        <rect x="28" y="18" width="28" height="18" rx="4" fill="#D8E8E1" stroke="#5A8F7B" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'yellow_raincoat',
    name: 'Poncho Amarelinho',
    icon: '🧥',
    category: 'clothes',
    desc: 'Protege das gotinhas da chuva suave.',
    svg: `
      <g id="acc-yellow_raincoat" transform="translate(56, 140)">
        <path d="M12 8 Q54 -2 96 8 L102 46 Q54 51 6 46 Z" fill="#FCE69C" stroke="#D4A747" stroke-width="2" />
        <circle cx="54" cy="22" r="3.5" fill="#D4A747" />
        <circle cx="54" cy="34" r="3.5" fill="#D4A747" />
      </g>
    `
  },
  {
    id: 'plaid_scarf',
    name: 'Cachecol Xadrez',
    icon: '🧣',
    category: 'clothes',
    desc: 'Em tons calorosos de canela e menta.',
    svg: `
      <g id="acc-plaid_scarf" transform="translate(48, 138)">
        <rect x="10" y="4" width="94" height="18" rx="6" fill="#EAA875" stroke="#C88554" stroke-width="2" />
        <line x1="30" y1="4" x2="30" y2="22" stroke="#5A8F7B" stroke-width="3" />
        <line x1="60" y1="4" x2="60" y2="22" stroke="#5A8F7B" stroke-width="3" />
        <line x1="90" y1="4" x2="90" y2="22" stroke="#5A8F7B" stroke-width="3" />
      </g>
    `
  },
  {
    id: 'scout_vest',
    name: 'Colete do Piquenique',
    icon: '⛺',
    category: 'clothes',
    desc: 'Para carregar bússola, maçã e carinho.',
    svg: `
      <g id="acc-scout_vest" transform="translate(62, 142)">
        <path d="M8 0 L40 0 L36 48 L4 42 Z" fill="#A87D59" stroke="#7A5638" stroke-width="2" />
        <path d="M56 0 L88 0 L92 42 L60 48 Z" fill="#A87D59" stroke="#7A5638" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'star_bib',
    name: 'Babador Cósmico',
    icon: '🌌',
    category: 'clothes',
    desc: 'Com desenho da lua para os dias alegres.',
    svg: `
      <g id="acc-star_bib" transform="translate(74, 140)">
        <path d="M8 4 Q36 -2 64 4 Q54 44 8 4 Z" fill="#E2EFF8" stroke="#7BAFD4" stroke-width="2" />
        <circle cx="36" cy="18" r="6" fill="#FCE69C" />
      </g>
    `
  },
  {
    id: 'leaf_mantle',
    name: 'Manto de Folhas',
    icon: '🌿',
    category: 'clothes',
    desc: 'Disfarce fofinho para brincar de esconde-esconde no bosque.',
    svg: `
      <g id="acc-leaf_mantle" transform="translate(52, 138)">
        <path d="M12 12 Q28 0 44 14 Q60 0 76 14 Q92 0 108 12 Q90 50 12 12 Z" fill="#7FA99B" stroke="#4D7C6B" stroke-width="2" />
      </g>
    `
  },
  {
    id: 'courage_badge',
    name: 'Medalha Coração Gentil',
    icon: '🎖️',
    category: 'clothes',
    desc: 'Celebra a paciência e a dedicação do jogador.',
    svg: `
      <g id="acc-courage_badge" transform="translate(94, 144)">
        <polygon points="16,0 24,18 8,18" fill="#7BAFD4" stroke="#4D80A4" stroke-width="1.5" />
        <circle cx="16" cy="24" r="10" fill="#FCE69C" stroke="#D4A747" stroke-width="2" />
        <path d="M16 20 Q18 24 16 27 Q14 24 16 20 Z" fill="#EAA875" />
      </g>
    `
  },

  // --------------------------------------------------------------------------
  // CATEGORIA 4: AMIGUINHOS DE COLO (10 itens)
  // --------------------------------------------------------------------------
  {
    id: 'pet_ladybug',
    name: 'Joaninha Tina',
    icon: '🐞',
    category: 'pets',
    desc: 'Uma joaninha companheira que pousa no ombro do Pip.',
    svg: `
      <g id="acc-pet_ladybug" transform="translate(154, 126)">
        <circle cx="12" cy="12" r="10" fill="#E57373" stroke="#C62828" stroke-width="1.5" />
        <circle cx="8" cy="6" r="4" fill="#2C3E38" />
        <circle cx="8" cy="12" r="2" fill="#2C3E38" />
        <circle cx="15" cy="14" r="2" fill="#2C3E38" />
      </g>
    `
  },
  {
    id: 'pet_bird',
    name: 'Passarinho Zé',
    icon: '🐦',
    category: 'pets',
    desc: 'Canta assobios suaves quando o vento sopra.',
    svg: `
      <g id="acc-pet_bird" transform="translate(32, 114)">
        <ellipse cx="14" cy="14" rx="12" ry="10" fill="#7BAFD4" stroke="#4D80A4" stroke-width="1.5" />
        <polygon points="2,14 -4,12 2,10" fill="#EAA875" />
        <circle cx="10" cy="11" r="2" fill="#2C3E38" />
      </g>
    `
  },
  {
    id: 'pet_butterfly',
    name: 'Borboletinha Lili',
    icon: '🦋',
    category: 'pets',
    desc: 'Asinhas azuis que tremulam suavemente.',
    svg: `
      <g id="acc-pet_butterfly" transform="translate(162, 70)">
        <ellipse cx="10" cy="6" rx="8" ry="6" fill="#B3E5FC" stroke="#81D4FA" stroke-width="1" />
        <ellipse cx="10" cy="16" rx="6" ry="5" fill="#B3E5FC" stroke="#81D4FA" stroke-width="1" />
        <line x1="2" y1="2" x2="2" y2="20" stroke="#2C3E38" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'pet_kitten',
    name: 'Gatinho Miau',
    icon: '🐱',
    category: 'pets',
    desc: 'Fica ronronando deitado no colinho.',
    svg: `
      <g id="acc-pet_kitten" transform="translate(132, 168)">
        <circle cx="16" cy="14" r="12" fill="#FFE0B2" stroke="#FFB74D" stroke-width="1.5" />
        <polygon points="6,6 10,0 14,5" fill="#FFE0B2" stroke="#FFB74D" stroke-width="1" />
        <polygon points="18,5 22,0 26,6" fill="#FFE0B2" stroke="#FFB74D" stroke-width="1" />
        <circle cx="12" cy="14" r="1.5" fill="#2C3E38" />
        <circle cx="20" cy="14" r="1.5" fill="#2C3E38" />
      </g>
    `
  },
  {
    id: 'pet_sprout',
    name: 'Brotinho no Vaso',
    icon: '🌱',
    category: 'pets',
    desc: 'Um vasinho em miniatura que Pip cuida todos os dias.',
    svg: `
      <g id="acc-pet_sprout" transform="translate(40, 166)">
        <polygon points="6,12 22,12 19,26 9,26" fill="#C49A76" stroke="#A87D59" stroke-width="1.5" />
        <path d="M14 12 C14 4, 22 2, 22 2 C22 2, 22 8, 14 12 Z" fill="#7FA99B" />
      </g>
    `
  },
  {
    id: 'pet_frog',
    name: 'Sapinho Cururu',
    icon: '🐸',
    category: 'pets',
    desc: 'Gosta do frescor da água e de coaxar em sol maior.',
    svg: `
      <g id="acc-pet_frog" transform="translate(150, 154)">
        <ellipse cx="14" cy="14" rx="12" ry="9" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1.5" />
        <circle cx="8" cy="7" r="4" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1" />
        <circle cx="8" cy="7" r="1.5" fill="#2C3E38" />
        <circle cx="20" cy="7" r="4" fill="#A5D6A7" stroke="#66BB6A" stroke-width="1" />
        <circle cx="20" cy="7" r="1.5" fill="#2C3E38" />
      </g>
    `
  },
  {
    id: 'pet_star',
    name: 'Estrelinha Guia',
    icon: '⭐',
    category: 'pets',
    desc: 'Ilumina a trilha para não tropeçar em nenhuma pedrinha.',
    svg: `
      <g id="acc-pet_star" transform="translate(160, 94)">
        <polygon points="12,2 15,9 23,9 17,14 19,22 12,17 5,22 7,14 1,9 9,9" fill="#FFF176" stroke="#FBC02D" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'pet_snail',
    name: 'Caracol Lento & Feliz',
    icon: '🐌',
    category: 'pets',
    desc: 'Lembra sempre: caminhar devagar também é chegar lá!',
    svg: `
      <g id="acc-pet_snail" transform="translate(34, 172)">
        <circle cx="14" cy="10" r="8" fill="#FFE082" stroke="#FFCA28" stroke-width="1.5" />
        <path d="M2 14 Q14 18 26 14" stroke="#FFCA28" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `
  },
  {
    id: 'pet_teddy',
    name: 'Ursinho de Pano',
    icon: '🧸',
    category: 'pets',
    desc: 'Excelente para abraçar bem forte na hora do descanso.',
    svg: `
      <g id="acc-pet_teddy" transform="translate(136, 138)">
        <circle cx="14" cy="14" r="10" fill="#D7CCC8" stroke="#A1887F" stroke-width="1.5" />
        <circle cx="6" cy="6" r="4" fill="#D7CCC8" />
        <circle cx="22" cy="6" r="4" fill="#D7CCC8" />
      </g>
    `
  },
  {
    id: 'pet_ducky',
    name: 'Patinho de Banho',
    icon: '🦆',
    category: 'pets',
    desc: 'Adora brincar nas poças d’água límpida.',
    svg: `
      <g id="acc-pet_ducky" transform="translate(42, 142)">
        <ellipse cx="14" cy="14" rx="10" ry="8" fill="#FFF59D" stroke="#FFEE58" stroke-width="1.5" />
        <polygon points="4,12 -2,14 4,16" fill="#FFB74D" />
      </g>
    `
  },

  // --------------------------------------------------------------------------
  // CATEGORIA 5: AURAS, BRILHOS E CENÁRIOS (10 itens)
  // --------------------------------------------------------------------------
  {
    id: 'aura_fireflies',
    name: 'Vaga-lumes Brilhantes',
    icon: '✨',
    category: 'auras',
    desc: 'Pontinhos de luz que flutuam ao redor.',
    svg: `
      <g id="acc-aura_fireflies">
        <circle cx="30" cy="60" r="4" fill="#FFF59D" opacity="0.8"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="190" cy="50" r="5" fill="#FFF59D" opacity="0.8"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite" /></circle>
        <circle cx="25" cy="150" r="3" fill="#FFF59D" opacity="0.8"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.5s" repeatCount="indefinite" /></circle>
        <circle cx="195" cy="160" r="4" fill="#FFF59D" opacity="0.8"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.8s" repeatCount="indefinite" /></circle>
      </g>
    `
  },
  {
    id: 'aura_petals',
    name: 'Pétalas Flutuantes',
    icon: '🌸',
    category: 'auras',
    desc: 'Pétalas de cerejeira sopradas pelo vento doce.',
    svg: `
      <g id="acc-aura_petals">
        <ellipse cx="35" cy="45" rx="5" ry="8" fill="#F8BBD0" transform="rotate(30 35 45)" opacity="0.75" />
        <ellipse cx="185" cy="85" rx="6" ry="9" fill="#F8BBD0" transform="rotate(-40 185 85)" opacity="0.75" />
        <ellipse cx="40" cy="180" rx="6" ry="8" fill="#F8BBD0" transform="rotate(15 40 180)" opacity="0.75" />
      </g>
    `
  },
  {
    id: 'aura_stardust',
    name: 'Poeira de Estrelas',
    icon: '🌟',
    category: 'auras',
    desc: 'Um rastro cintilante que envolve os pezinhos do Pip.',
    svg: `
      <g id="acc-aura_stardust">
        <path d="M110 8 L112 18 L122 20 L112 22 L110 32 L108 22 L98 20 L108 18 Z" fill="#FFF59D" opacity="0.8" />
        <circle cx="50" cy="90" r="2" fill="#FFE082" />
        <circle cx="170" cy="90" r="2" fill="#FFE082" />
      </g>
    `
  },
  {
    id: 'aura_autumn_breeze',
    name: 'Brisa de Outono',
    icon: '🍂',
    category: 'auras',
    desc: 'Folhas secas douradas bailando em círculos.',
    svg: `
      <g id="acc-aura_autumn_breeze">
        <path d="M20 70 Q40 50 60 70" stroke="#FFCC80" stroke-width="1.5" stroke-dasharray="3,3" fill="none" />
        <path d="M160 140 Q180 120 200 140" stroke="#FFCC80" stroke-width="1.5" stroke-dasharray="3,3" fill="none" />
      </g>
    `
  },
  {
    id: 'aura_light_drops',
    name: 'Gotas de Luz',
    icon: '💧',
    category: 'auras',
    desc: 'Gotículas reluzentes como pequenos diamantes.',
    svg: `
      <g id="acc-aura_light_drops">
        <circle cx="45" cy="80" r="5" fill="#E1F5FE" stroke="#81D4FA" stroke-width="1" />
        <circle cx="175" cy="120" r="4" fill="#E1F5FE" stroke="#81D4FA" stroke-width="1" />
      </g>
    `
  },
  {
    id: 'aura_soap_bubbles',
    name: 'Bolhas de Sabão',
    icon: '🫧',
    category: 'auras',
    desc: 'Bolhinhas iridescentes flutuando sem pressa.',
    svg: `
      <g id="acc-aura_soap_bubbles">
        <circle cx="35" cy="70" r="10" fill="rgba(225, 245, 254, 0.4)" stroke="#B3E5FC" stroke-width="1.5" />
        <circle cx="185" cy="60" r="14" fill="rgba(225, 245, 254, 0.4)" stroke="#B3E5FC" stroke-width="1.5" />
        <circle cx="190" cy="140" r="8" fill="rgba(225, 245, 254, 0.4)" stroke="#B3E5FC" stroke-width="1.5" />
      </g>
    `
  },
  {
    id: 'aura_soft_rainbow',
    name: 'Arco-Íris Suave',
    icon: '🌈',
    category: 'auras',
    desc: 'Cores pastéis que abraçam o Pip pelo alto.',
    svg: `
      <g id="acc-aura_soft_rainbow" transform="translate(30, 14)">
        <path d="M15 62 A65 48 0 0 1 145 62" stroke="rgba(244, 143, 177, 0.65)" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M21 62 A59 43 0 0 1 139 62" stroke="rgba(255, 224, 130, 0.65)" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M27 62 A53 38 0 0 1 133 62" stroke="rgba(165, 214, 167, 0.65)" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M33 62 A47 33 0 0 1 127 62" stroke="rgba(129, 212, 250, 0.65)" stroke-width="4.5" stroke-linecap="round" fill="none" />
      </g>
    `
  },
  {
    id: 'aura_constellation',
    name: 'Anel de Constelação',
    icon: '🪐',
    category: 'auras',
    desc: 'Um elo estelar conectando pequenas estrelas azuis.',
    svg: `
      <g id="acc-aura_constellation">
        <ellipse cx="110" cy="125" rx="95" ry="35" stroke="rgba(230, 200, 110, 0.35)" stroke-width="1.5" stroke-dasharray="4,6" fill="none" transform="rotate(-15 110 125)" />
      </g>
    `
  },
  {
    id: 'aura_flying_hearts',
    name: 'Corações Voadores',
    icon: '💕',
    category: 'auras',
    desc: 'Amor invisível que aquece os dias nublados.',
    svg: `
      <g id="acc-aura_flying_hearts">
        <path d="M30 110 Q30 106 26 106 Q21 106 18 111 Q18 115 30 124 Q42 115 42 111 Q39 106 34 106 Q30 106 30 110 Z" fill="#F48FB1" opacity="0.75" transform="scale(0.7)" />
        <path d="M240 70 Q240 66 236 66 Q231 66 228 71 Q228 75 240 84 Q252 75 252 71 Q249 66 244 66 Q240 66 240 70 Z" fill="#F48FB1" opacity="0.75" transform="scale(0.7)" />
      </g>
    `
  },
  {
    id: 'aura_magic_crystals',
    name: 'Cristais Flutuantes',
    icon: '🔮',
    category: 'auras',
    desc: 'Pequenas pedras de ametista que flutuam ao redor.',
    svg: `
      <g id="acc-aura_magic_crystals">
        <polygon points="25,90 30,80 35,90 30,100" fill="#CE93D8" stroke="#AB47BC" stroke-width="1" opacity="0.8" />
        <polygon points="185,130 190,120 195,130 190,140" fill="#CE93D8" stroke="#AB47BC" stroke-width="1" opacity="0.8" />
      </g>
    `
  }
];

export const ACCESSORY_CATEGORIES = [
  { id: 'all', name: 'Todos', icon: '✨' },
  { id: 'hats', name: 'Chapéus', icon: '👒' },
  { id: 'face', name: 'Rosto', icon: '👓' },
  { id: 'clothes', name: 'Roupas', icon: '🧣' },
  { id: 'pets', name: 'Amiguinhos', icon: '🐾' },
  { id: 'auras', name: 'Auras', icon: '🌟' }
];
