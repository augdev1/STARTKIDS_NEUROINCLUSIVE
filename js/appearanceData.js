/* ==========================================================================
   CATÁLOGO DE PERSONALIZAÇÃO DO PIP (COR, OLHINHOS, BOCA E BOCHECHAS)
   Cores pastéis suaves, expressões reconfortantes e neuroinclusivas.
   ========================================================================== */

export const PIP_BODY_COLORS = [
  {
    id: 'mint',
    name: 'Menta Suave',
    desc: 'O tom clássico e acolhedor do Pip',
    swatch: '#C2E8DC',
    gradientStops: `
      <stop offset="0%" stop-color="#E8F7F2" />
      <stop offset="55%" stop-color="#CEEFE5" />
      <stop offset="100%" stop-color="#AEE3D4" />
    `,
    stroke: '#529681',
    limbs: '#C2E8DC',
    shadowColor: '#2E5F50'
  },
  {
    id: 'pink',
    name: 'Algodão Doce',
    desc: 'Rosa quentinho como um abraço de nuvem',
    swatch: '#FBCFE8',
    gradientStops: `
      <stop offset="0%" stop-color="#FFF0F6" />
      <stop offset="55%" stop-color="#FCE7F3" />
      <stop offset="100%" stop-color="#F472B6" />
    `,
    stroke: '#DB2777',
    limbs: '#FCE7F3',
    shadowColor: '#831843'
  },
  {
    id: 'blue',
    name: 'Céu Sereno',
    desc: 'Azul celeste que traz tranquilidade e paz',
    swatch: '#BAE6FD',
    gradientStops: `
      <stop offset="0%" stop-color="#F0F9FF" />
      <stop offset="55%" stop-color="#E0F2FE" />
      <stop offset="100%" stop-color="#7DD3FC" />
    `,
    stroke: '#0284C7',
    limbs: '#E0F2FE',
    shadowColor: '#0369A1'
  },
  {
    id: 'yellow',
    name: 'Solzinho Dourado',
    desc: 'Amarelo suave e radiante como um raio de sol',
    swatch: '#FEF08A',
    gradientStops: `
      <stop offset="0%" stop-color="#FEFCE8" />
      <stop offset="55%" stop-color="#FEF9C3" />
      <stop offset="100%" stop-color="#FACC15" />
    `,
    stroke: '#CA8A04',
    limbs: '#FEF9C3',
    shadowColor: '#854D0E'
  },
  {
    id: 'purple',
    name: 'Lavanda Relaxante',
    desc: 'Lilás reconfortante com cheirinho de flores',
    swatch: '#E9D5FF',
    gradientStops: `
      <stop offset="0%" stop-color="#FAF5FF" />
      <stop offset="55%" stop-color="#F3E8FF" />
      <stop offset="100%" stop-color="#C084FC" />
    `,
    stroke: '#9333EA',
    limbs: '#F3E8FF',
    shadowColor: '#581C87'
  },
  {
    id: 'peach',
    name: 'Pêssego Aconchego',
    desc: 'Laranja pastel suave e cheio de ternura',
    swatch: '#FED7AA',
    gradientStops: `
      <stop offset="0%" stop-color="#FFF7ED" />
      <stop offset="55%" stop-color="#FFEDD5" />
      <stop offset="100%" stop-color="#FB923C" />
    `,
    stroke: '#EA580C',
    limbs: '#FFEDD5',
    shadowColor: '#9A3412'
  },
  {
    id: 'green',
    name: 'Broto de Bambu',
    desc: 'Verde fresco da floresta encantada',
    swatch: '#BBF7D0',
    gradientStops: `
      <stop offset="0%" stop-color="#F0FDF4" />
      <stop offset="55%" stop-color="#DCFCE7" />
      <stop offset="100%" stop-color="#86EFAC" />
    `,
    stroke: '#16A34A',
    limbs: '#DCFCE7',
    shadowColor: '#166534'
  },
  {
    id: 'cloud',
    name: 'Nuvem Pérola',
    desc: 'Prateado clarinho e sereno como o luar',
    swatch: '#CBD5E1',
    gradientStops: `
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="55%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#94A3B8" />
    `,
    stroke: '#64748B',
    limbs: '#E2E8F0',
    shadowColor: '#334155'
  }
];

export const PIP_EYE_SHAPES = [
  {
    id: 'default',
    name: 'Doces & Atentos',
    desc: 'Olhinhos curiosos e atentos ao mundo',
    icon: '👀',
    svg: `
      <g class="anim-pip-eye">
        <ellipse cx="82" cy="104" rx="6.5" ry="9.5" fill="#2C3E38" />
        <circle cx="80" cy="100" r="2.5" fill="#FFFFFF" />
        <ellipse cx="138" cy="104" rx="6.5" ry="9.5" fill="#2C3E38" />
        <circle cx="136" cy="100" r="2.5" fill="#FFFFFF" />
      </g>
    `
  },
  {
    id: 'happy',
    name: 'Sorridentes (^_^)',
    desc: 'Em arco suave cheios de alegria genuína',
    icon: '😄',
    svg: `
      <g class="anim-pip-eye">
        <path d="M73 106 Q82 94 91 106" stroke="#2C3E38" stroke-width="3.2" stroke-linecap="round" fill="none" />
        <path d="M129 106 Q138 94 147 106" stroke="#2C3E38" stroke-width="3.2" stroke-linecap="round" fill="none" />
      </g>
    `
  },
  {
    id: 'sparkle',
    name: 'Estrelados (✨_✨)',
    desc: 'Com microestrelinhas mágicas de admiração',
    icon: '✨',
    svg: `
      <g class="anim-pip-eye">
        <ellipse cx="82" cy="104" rx="7.5" ry="10.5" fill="#2C3E38" />
        <polygon points="82,99 83.5,103 87.5,104 83.5,105 82,109 80.5,105 76.5,104 80.5,103" fill="#FFFFFF" />
        <circle cx="85" cy="108" r="1.5" fill="#FFFFFF" />
        <ellipse cx="138" cy="104" rx="7.5" ry="10.5" fill="#2C3E38" />
        <polygon points="138,99 139.5,103 143.5,104 139.5,105 138,109 136.5,105 132.5,104 136.5,103" fill="#FFFFFF" />
        <circle cx="141" cy="108" r="1.5" fill="#FFFFFF" />
      </g>
    `
  },
  {
    id: 'wink',
    name: 'Piscadela Amiga (^_-)',
    desc: 'Uma piscadinha amigável e acolhedora',
    icon: '😉',
    svg: `
      <g class="anim-pip-eye">
        <path d="M73 105 Q82 95 91 105" stroke="#2C3E38" stroke-width="3.2" stroke-linecap="round" fill="none" />
        <ellipse cx="138" cy="104" rx="6.5" ry="9.5" fill="#2C3E38" />
        <circle cx="136" cy="100" r="2.5" fill="#FFFFFF" />
      </g>
    `
  },
  {
    id: 'curious',
    name: 'Anime Chibi (🥺)',
    desc: 'Grandes e brilhantes com duplo reflexo de luz',
    icon: '🥺',
    svg: `
      <g class="anim-pip-eye">
        <ellipse cx="82" cy="104" rx="7.5" ry="10.5" fill="#2C3E38" />
        <circle cx="79.5" cy="99.5" r="3.2" fill="#FFFFFF" />
        <circle cx="85" cy="108" r="1.8" fill="#FFFFFF" />
        <ellipse cx="138" cy="104" rx="7.5" ry="10.5" fill="#2C3E38" />
        <circle cx="135.5" cy="99.5" r="3.2" fill="#FFFFFF" />
        <circle cx="141" cy="108" r="1.8" fill="#FFFFFF" />
      </g>
    `
  },
  {
    id: 'sleepy',
    name: 'Zen & Calmos (-_-)',
    desc: 'Pálpebras relaxadas em paz e silêncio',
    icon: '😌',
    svg: `
      <g class="anim-pip-eye">
        <path d="M73 104 Q82 108 91 104" stroke="#2C3E38" stroke-width="3" stroke-linecap="round" fill="none" />
        <path d="M129 104 Q138 108 147 104" stroke="#2C3E38" stroke-width="3" stroke-linecap="round" fill="none" />
      </g>
    `
  }
];

export const PIP_MOUTH_SHAPES = [
  {
    id: 'default',
    name: 'Sorriso Calmo',
    desc: 'Gentil, suave e acolhedor',
    icon: '🙂',
    svg: `
      <path d="M102 118 Q110 126 118 118" stroke="#2C3E38" stroke-width="2.8" stroke-linecap="round" fill="none" />
    `
  },
  {
    id: 'joy',
    name: 'Sorriso Radiante',
    desc: 'Boquinha aberta feliz com linguinha',
    icon: '😃',
    svg: `
      <path d="M101 116 Q110 128 119 116 Z" fill="#F87171" stroke="#2C3E38" stroke-width="2.6" stroke-linejoin="round" />
      <path d="M105 122 Q110 119 115 122" fill="#FDA4AF" stroke="#2C3E38" stroke-width="1.2" />
    `
  },
  {
    id: 'cat',
    name: 'Biquinho Fofo (:3)',
    desc: 'Sorrisinho meigo em formato de gatinho',
    icon: '🐱',
    svg: `
      <path d="M100 117 Q105 123 110 118 Q115 123 120 117" stroke="#2C3E38" stroke-width="2.8" stroke-linecap="round" fill="none" />
    `
  },
  {
    id: 'surprised',
    name: 'Descoberta (:o)',
    desc: 'Boquinha redondinha de quem achou algo mágico',
    icon: '😮',
    svg: `
      <ellipse cx="110" cy="119" rx="5" ry="6.5" fill="#2C3E38" />
      <ellipse cx="110" cy="120" rx="3.5" ry="4" fill="#FDA4AF" />
    `
  },
  {
    id: 'shy',
    name: 'Sorriso Tímido',
    desc: 'Um sorriso de cantinho muito delicado',
    icon: '😊',
    svg: `
      <path d="M103 120 Q111 125 118 116" stroke="#2C3E38" stroke-width="2.8" stroke-linecap="round" fill="none" />
    `
  },
  {
    id: 'peace',
    name: 'Serenidade (-)',
    desc: 'Respiração funda e calma interior',
    icon: '🌱',
    svg: `
      <path d="M104 118 Q110 120 116 118" stroke="#2C3E38" stroke-width="2.6" stroke-linecap="round" fill="none" />
    `
  }
];

export const PIP_CHEEK_SHAPES = [
  {
    id: 'blush',
    name: 'Rosadas Clássicas',
    desc: 'Círculos suaves de cor rosa acolhedor',
    icon: '🌸',
    svg: `
      <circle cx="70" cy="118" r="11" fill="#F87171" opacity="0.45" />
      <circle cx="150" cy="118" r="11" fill="#F87171" opacity="0.45" />
    `
  },
  {
    id: 'stars',
    name: 'Estrelinhas Douradas',
    desc: 'Pequenos brilhos de estrela nas bochechas',
    icon: '⭐',
    svg: `
      <g fill="#F59E0B" opacity="0.95">
        <polygon points="70,113 71.5,116.5 75,118 71.5,119.5 70,123 68.5,119.5 65,118 68.5,116.5" />
        <polygon points="150,113 151.5,116.5 155,118 151.5,119.5 150,123 148.5,119.5 145,118 148.5,116.5" />
      </g>
    `
  },
  {
    id: 'hearts',
    name: 'Coraçõezinhos',
    desc: 'Dois pequenos corações cheios de carinho',
    icon: '💖',
    svg: `
      <path d="M70 122 C64 116 60 110 65 106 C69 103 70 107 70 107 C70 107 71 103 75 106 C80 110 76 116 70 122 Z" fill="#EC4899" opacity="0.85" />
      <path d="M150 122 C144 116 140 110 145 106 C149 103 150 107 150 107 C150 107 151 103 155 106 C160 110 156 116 150 122 Z" fill="#EC4899" opacity="0.85" />
    `
  },
  {
    id: 'warm',
    name: 'Pêssego Aconchego',
    desc: 'Tons quentinhos de sol de outono',
    icon: '🍑',
    svg: `
      <circle cx="70" cy="118" r="11" fill="#F97316" opacity="0.45" />
      <circle cx="150" cy="118" r="11" fill="#F97316" opacity="0.45" />
    `
  },
  {
    id: 'none',
    name: 'Sem Bochechinhas',
    desc: 'Visual clean e minimalista',
    icon: '⚪',
    svg: ``
  }
];
