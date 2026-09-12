/* ==========================================================================
   5 JOGOS EDUCATIVOS COM APRENDIZADO REAL - PIP: AVENTURAS SENSORIAIS
   1. O Espelho das Emoções (Socioemocional & Empatia)
   2. Construtor de Palavrinhas (Consciência Fonológica)
   3. Balança das Quantidades (Matemática Concreta)
   4. O Trem dos Padrões (Funções Executivas & Lógica)
   5. A Rotina Encantada (Planejamento & Autonomia)
   ========================================================================== */

import { sound } from './audio.js';
import { speech } from './speech.js';
import { mascot } from './mascot.js';

// ============================================================================
// BANCO EXPANDIDO DE REPERTÓRIO PEDAGÓGICO ACOLHEDOR
// Garante variedade dinâmica a cada partida para a criança não ver sempre o mesmo conteúdo
// ============================================================================
export const GAME_POOLS = {
  // Jogo 1: O Espelho das Emoções
  1: [
    {
      scenario: "O Pip ganhou um lindo girassol do seu amiguinho no bosque! Como o Pip está se sentindo?",
      icon: "🌻",
      vectorKey: "SUNFLOWER",
      correctId: "happy",
      correctLabel: "Alegre e Contente",
      options: [
        { id: "calm", emoji: "😌", label: "Sonolento" },
        { id: "happy", emoji: "😊", label: "Alegre e Contente" },
        { id: "scared", emoji: "🥺", label: "Assustado" }
      ],
      feedback: "Isso mesmo! Ganhar um presente com carinho nos enche de alegria!"
    },
    {
      scenario: "Ouviu-se um trovão forte na chuvinha! O Pip precisa de um abraço. Como ele está se sentindo?",
      icon: "⛈️",
      vectorKey: "STORM",
      correctId: "scared",
      correctLabel: "Assustado",
      options: [
        { id: "scared", emoji: "🥺", label: "Assustado" },
        { id: "happy", emoji: "😄", label: "Rindo" },
        { id: "proud", emoji: "😎", label: "Corajoso" }
      ],
      feedback: "Muito bem! Barulhos altos podem dar susto, e um abraço aconchegante sempre ajuda!"
    },
    {
      scenario: "O Pip deitou na relva fofinha ouvindo o riacho correr calmo. Como ele está se sentindo?",
      icon: "🍃",
      vectorKey: "BREEZE",
      correctId: "calm",
      correctLabel: "Tranquilo e em Paz",
      options: [
        { id: "angry", emoji: "😠", label: "Bravo" },
        { id: "scared", emoji: "😰", label: "Com Medo" },
        { id: "calm", emoji: "😌", label: "Tranquilo e em Paz" }
      ],
      feedback: "Exatamente! Respirar o ar puro e descansar a mente traz tranquilidade profunda."
    },
    {
      scenario: "O Pip montou uma torre mágica bem alta com blocos de montar sem derrubar! Como o Pip está se sentindo?",
      icon: "🏰",
      vectorKey: "CASTLE",
      correctId: "proud",
      correctLabel: "Orgulhoso e Feliz",
      options: [
        { id: "proud", emoji: "⭐", label: "Orgulhoso e Feliz" },
        { id: "sad", emoji: "😢", label: "Triste" },
        { id: "scared", emoji: "😨", label: "Com Medo" }
      ],
      feedback: "Sensacional! Realizar uma construção bonita com paciência nos dá muito orgulho!"
    },
    {
      scenario: "Uma borboleta azul brilhante pousou de mansinho na mãozinha do Pip! Como o Pip está se sentindo?",
      icon: "🦋",
      vectorKey: "BUTTERFLY",
      correctId: "curious",
      correctLabel: "Curioso e Encantado",
      options: [
        { id: "angry", emoji: "😠", label: "Bravo" },
        { id: "curious", emoji: "🤩", label: "Curioso e Encantado" },
        { id: "sleepy", emoji: "🥱", label: "Com Sono" }
      ],
      feedback: "Que lindo! A magia da natureza nos deixa cheios de encanto e curiosidade!"
    },
    {
      scenario: "O copinho de água virou e molhou a pintura que o Pip fez com carinho. Como o Pip está se sentindo?",
      icon: "💧",
      vectorKey: "DROP",
      correctId: "sad",
      correctLabel: "Triste e Chateado",
      options: [
        { id: "happy", emoji: "😄", label: "Divertido" },
        { id: "sad", emoji: "🥺", label: "Triste e Chateado" },
        { id: "calm", emoji: "😌", label: "Calmo" }
      ],
      feedback: "É normal ficar chateado quando algo dá errado. Vamos respirar fundo e recomeçar com calma!"
    },
    {
      scenario: "O coelhinho amigo chamou o Pip para brincar de bola no gramado! Como o Pip está se sentindo?",
      icon: "🐰",
      vectorKey: "RABBIT",
      correctId: "happy",
      correctLabel: "Muito Animado",
      options: [
        { id: "happy", emoji: "🥳", label: "Muito Animado" },
        { id: "scared", emoji: "😨", label: "Assustado" },
        { id: "angry", emoji: "😡", label: "Zangado" }
      ],
      feedback: "Maravilha! Brincar com amigos queridos enche o nosso dia de sorrisos!"
    },
    {
      scenario: "A noite suave chegou no bosque e o Pip vestiu o pijama quentinho. Como ele está se sentindo?",
      icon: "🌙",
      vectorKey: "MOON",
      correctId: "sleepy",
      correctLabel: "Aconchegado e Sonolento",
      options: [
        { id: "sleepy", emoji: "😴", label: "Aconchegado e Sonolento" },
        { id: "angry", emoji: "😠", label: "Com Raiva" },
        { id: "proud", emoji: "😎", label: "Corajoso" }
      ],
      feedback: "Que gostoso! Um repouso suave recarrega nossas energias para um novo dia de descobertas."
    }
  ],

  // Jogo 2: Construtor de Palavrinhas (palavras acessíveis de 3 a 4 letras)
  2: [
    { word: "SOL", icon: "☀️", hint: "Brilha quente no céu azul" },
    { word: "LUA", icon: "🌙", hint: "Ilumina a nossa noite de descanso" },
    { word: "MEL", icon: "🍯", hint: "Docinho feito pelas abelhas amigas" },
    { word: "RIO", icon: "🌊", hint: "Água fresca que corre entre as pedrinhas" },
    { word: "CEU", icon: "☁️", hint: "Onde as nuvens fofinhas passeiam" },
    { word: "MAR", icon: "🏖️", hint: "Ondas calmas na beirinha da praia" },
    { word: "PAO", icon: "🥖", hint: "Quentinho e gostoso no lanche da tarde" },
    { word: "FLOR", icon: "🌸", hint: "Espalha perfume suave no jardim" },
    { word: "CASA", icon: "🏡", hint: "Nosso cantinho de amor e proteção" },
    { word: "GATO", icon: "🐱", hint: "Amiguinho peludo que ronrona com carinho" },
    { word: "BOLA", icon: "⚽", hint: "Redondinha para brincar no gramado" },
    { word: "URSO", icon: "🧸", hint: "Fofinho que dá abraços apertadinhos" },
    { word: "BOLO", icon: "🎂", hint: "Doce festivo com velinhas coloridas" },
    { word: "PEIXE", icon: "🐟", hint: "Nada leve e livre na água cristalina" },
    { word: "MACA", icon: "🍎", hint: "Frutinha vermelhinha, crocante e saudável" }
  ],

  // Jogo 3: Balança das Quantidades (Frutas e numerais de 1 a 5)
  3: [
    { target: 2, icon: "🍎", vectorKey: "APPLE", name: "maçãs" },
    { target: 4, icon: "🍓", vectorKey: "STRAWBERRY", name: "morangos" },
    { target: 3, icon: "🍐", vectorKey: "PEAR", name: "peras" },
    { target: 5, icon: "🍌", vectorKey: "BANANA", name: "bananas" },
    { target: 2, icon: "🍊", vectorKey: "ORANGE", name: "laranjas" },
    { target: 4, icon: "🍇", vectorKey: "GRAPES", name: "uvas" },
    { target: 3, icon: "🍒", vectorKey: "CHERRY", name: "cerejas" },
    { target: 1, icon: "🍉", vectorKey: "WATERMELON", name: "melancia" },
    { target: 5, icon: "🍑", vectorKey: "PEACH", name: "pêssegos" }
  ],

  // Jogo 4: O Trem dos Padrões (Sequenciamento lógico claro)
  4: [
    {
      sequence: ["🟡", "🟣", "🟡"],
      correct: "🟣",
      options: ["🟣", "🟢", "🟡"],
      explanation: "Amarelo, Roxo, Amarelo... o próximo é Roxo!"
    },
    {
      sequence: ["🌸", "⭐", "🌸"],
      correct: "⭐",
      options: ["🍃", "⭐", "🌸"],
      explanation: "Flor, Estrela, Flor... o próximo é Estrela!"
    },
    {
      sequence: ["🍎", "🍎", "🍐"],
      correct: "🍐",
      options: ["🍎", "🍐", "🍊"],
      explanation: "Duas maçãs e duas peras completam o trem!"
    },
    {
      sequence: ["💖", "⭐", "💖"],
      correct: "⭐",
      options: ["⭐", "💖", "🌙"],
      explanation: "Coração, Estrela, Coração... o próximo é Estrela!"
    },
    {
      sequence: ["🔵", "🟢", "🔵"],
      correct: "🟢",
      options: ["🟢", "🔵", "🟡"],
      explanation: "Azul, Verde, Azul... o próximo é Verde!"
    },
    {
      sequence: ["☀️", "🌙", "☀️"],
      correct: "🌙",
      options: ["🌙", "☀️", "⭐"],
      explanation: "Sol, Lua, Sol... o próximo é Lua!"
    },
    {
      sequence: ["🍃", "🌸", "🍃"],
      correct: "🌸",
      options: ["🌸", "🍃", "🍄"],
      explanation: "Folha, Flor, Folha... o próximo é Flor!"
    },
    {
      sequence: ["🔴", "🔷", "🔴"],
      correct: "🔷",
      options: ["🔷", "🔴", "⭐"],
      explanation: "Círculo, Diamante, Círculo... o próximo é Diamante!"
    },
    {
      sequence: ["🐱", "🐶", "🐱"],
      correct: "🐶",
      options: ["🐶", "🐱", "🐰"],
      explanation: "Gatinho, Cachorrinho, Gatinho... o próximo é Cachorrinho!"
    }
  ],

  // Jogo 5: A Rotina Encantada (Sequências de 3 passos do cotidiano)
  5: [
    {
      theme: "Manhã Aconchegante do Pip",
      steps: [
        { id: 1, text: "Acordar e bocejar com a luz do sol", icon: "🌅" },
        { id: 2, text: "Escovar os dentes e lavar o rosto", icon: "🪥" },
        { id: 3, text: "Tomar um café da manhã quentinho", icon: "🥞" }
      ]
    },
    {
      theme: "Cuidando do Jardim",
      steps: [
        { id: 1, text: "Colocar a sementinha na terra fofa", icon: "🌱" },
        { id: 2, text: "Regar com água limpinha e carinho", icon: "💧" },
        { id: 3, text: "Ver a florzinha linda desabrochar", icon: "🌻" }
      ]
    },
    {
      theme: "Hora do Descanso Suave",
      steps: [
        { id: 1, text: "Guardar os brinquedos na caixinha", icon: "🧸" },
        { id: 2, text: "Ouvir uma historinha tranquila", icon: "📖" },
        { id: 3, text: "Cobrir com a mantinha e adormecer", icon: "🌙" }
      ]
    },
    {
      theme: "Preparando a Mochila Mágica",
      steps: [
        { id: 1, text: "Separar os livrinhos coloridos", icon: "📚" },
        { id: 2, text: "Guardar a garrafinha e o lanchinho gostoso", icon: "🥪" },
        { id: 3, text: "Fechar o zíper da mochila com cuidado", icon: "🎒" }
      ]
    },
    {
      theme: "Banho Relaxante e Espumoso",
      steps: [
        { id: 1, text: "Entrar na aguinha morna e gostosa", icon: "🛁" },
        { id: 2, text: "Fazer espuminha com sabonete cheiroso", icon: "🧼" },
        { id: 3, text: "Secar o corpinho com a toalha macia", icon: "🧖" }
      ]
    },
    {
      theme: "Tarde de Brincadeiras no Bosque",
      steps: [
        { id: 1, text: "Calçar os tênis confortáveis", icon: "👟" },
        { id: 2, text: "Deslizar no escorregador colorido", icon: "🛝" },
        { id: 3, text: "Beber água fresca e descansar na sombra", icon: "🥤" }
      ]
    }
  ],

  // Jogo 6: O Jogo da Velha do Pip (Raciocínio & Parceria Amigável)
  6: [
    {
      playerSymbol: "⭐",
      pipSymbol: "🐶",
      playerName: "Estrela",
      pipName: "Pip",
      themeName: "Amizade Brilhante",
      instruction: "Arraste sua Estrela ou clique no tabuleiro para jogar com o Pip!"
    },
    {
      playerSymbol: "☀️",
      pipSymbol: "☁️",
      playerName: "Solzinho",
      pipName: "Nuvem",
      themeName: "Céu Encantado",
      instruction: "Arraste o Solzinho ou clique no tabuleiro para brincar com o Pip!"
    },
    {
      playerSymbol: "🌸",
      pipSymbol: "🦋",
      playerName: "Florzinha",
      pipName: "Borboleta",
      themeName: "Jardim Mágico",
      instruction: "Coloque sua Florzinha ou toque no tabuleiro para brincar no jardim!"
    },
    {
      playerSymbol: "⛵",
      pipSymbol: "🗼",
      playerName: "Barquinho",
      pipName: "Farol",
      themeName: "Aventura no Mar",
      instruction: "Arraste seu Barquinho no tabuleiro para navegar com o Pip!"
    },
    {
      playerSymbol: "🍎",
      pipSymbol: "🍐",
      playerName: "Maçã",
      pipName: "Pera",
      themeName: "Pomar dos Amigos",
      instruction: "Coloque sua Maçãzinha no tabuleiro para brincar no pomar do Pip!"
    },
    {
      playerSymbol: "💖",
      pipSymbol: "🌙",
      playerName: "Coração",
      pipName: "Lua",
      themeName: "Noite de Carinho",
      instruction: "Arraste o Coração ou toque na grade para jogar com o Pip!"
    }
  ],

  // Jogo 7: O Jardim da Memória (Atenção, Foco & Pares Sensoriais)
  7: [
    {
      themeName: "Amiguinhos da Natureza",
      pairs: [
        { id: "dog", symbol: "🐶", name: "Cachorrinho" },
        { id: "cat", symbol: "🐱", name: "Gatinho" },
        { id: "bunny", symbol: "🐰", name: "Coelhinho" },
        { id: "bear", symbol: "🧸", name: "Ursinho" }
      ]
    },
    {
      themeName: "Pomar Saudável",
      pairs: [
        { id: "apple", symbol: "🍎", name: "Maçã" },
        { id: "banana", symbol: "🍌", name: "Banana" },
        { id: "strawberry", symbol: "🍓", name: "Morango" },
        { id: "grape", symbol: "🍇", name: "Uva" }
      ]
    },
    {
      themeName: "Céu e Estrelas",
      pairs: [
        { id: "sun", symbol: "☀️", name: "Sol" },
        { id: "moon", symbol: "🌙", name: "Lua" },
        { id: "star", symbol: "⭐", name: "Estrela" },
        { id: "cloud", symbol: "☁️", name: "Nuvem" }
      ]
    },
    {
      themeName: "Jardim das Cores",
      pairs: [
        { id: "flower", symbol: "🌸", name: "Florzinha" },
        { id: "butterfly", symbol: "🦋", name: "Borboleta" },
        { id: "leaf", symbol: "🍃", name: "Folhinha" },
        { id: "rainbow", symbol: "🌈", name: "Arco-íris" }
      ]
    },
    {
      themeName: "Mundo dos Brinquedos",
      pairs: [
        { id: "ball", symbol: "⚽", name: "Bola" },
        { id: "car", symbol: "🚗", name: "Carrinho" },
        { id: "kite", symbol: "🪁", name: "Pipa" },
        { id: "robot", symbol: "🤖", name: "Robô" }
      ]
    },
    {
      themeName: "Fundo do Mar",
      pairs: [
        { id: "fish", symbol: "🐟", name: "Peixinho" },
        { id: "dolphin", symbol: "🐬", name: "Golfinho" },
        { id: "crab", symbol: "🦀", name: "Caranguejo" },
        { id: "shell", symbol: "🐚", name: "Conchinha" }
      ]
    }
  ],

  // Jogo 8: O Labirinto do Pip (Orientação Espacial & Resolução de Problemas)
  8: [
    {
      themeName: "Bosque dos Girassóis",
      instruction: "Ajude o Pip a caminhar pelo caminho amarelo, pegar a estrela e chegar na casinha!",
      rows: 5,
      cols: 5,
      // 0: path, 1: wall, 2: start, 3: item (star), 4: goal
      grid: [
        [1, 1, 1, 1, 1],
        [1, 2, 0, 3, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 0, 4, 1],
        [1, 1, 1, 1, 1]
      ],
      items: [{ r: 1, c: 3, icon: "⭐", name: "Estrela Brilhante" }],
      goalIcon: "🏡",
      goalName: "Casinha Acolhedora"
    },
    {
      themeName: "Trilha das Borboletas",
      instruction: "Explore o labirinto florido, recolha as 2 florzinhas mágicas e alcance o arco-íris!",
      rows: 6,
      cols: 6,
      grid: [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 0, 1, 3, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1],
        [1, 3, 0, 0, 4, 1],
        [1, 1, 1, 1, 1, 1]
      ],
      items: [
        { r: 1, c: 4, icon: "🌸", name: "Florzinha Cor-de-Rosa" },
        { r: 4, c: 1, icon: "🌼", name: "Margarida Dourada" }
      ],
      goalIcon: "🌈",
      goalName: "Portal do Arco-Íris"
    },
    {
      themeName: "O Reino das Estrelas",
      instruction: "Guie o Pip pelo bosque estelar, colete os 3 tesouros e chegue ao castelo de cristal!",
      rows: 7,
      cols: 7,
      grid: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 1, 3, 1],
        [1, 1, 1, 0, 1, 0, 1],
        [1, 3, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 3, 0, 4, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ],
      items: [
        { r: 1, c: 5, icon: "⭐", name: "Estrela do Céu" },
        { r: 3, c: 1, icon: "🍎", name: "Maçã Mágica" },
        { r: 5, c: 3, icon: "💎", name: "Cristal Reluzente" }
      ],
      goalIcon: "🏰",
      goalName: "Castelo de Cristal"
    }
  ],

  // Jogo 9: O Jogo de Damas do Pip (Estratégia, Diagonais & Parceria Amigável)
  9: [
    {
      themeName: "Damas no Bosque",
      instruction: "Toque na sua peça dourada para ver as diagonais brilhando e avance no tabuleiro!",
      playerSymbol: "⭐",
      pipSymbol: "🐾",
      playerColorName: "Estrelas Douradas",
      pipColorName: "Patinhas Azuis",
      playerPieces: [
        { r: 4, c: 1 }, { r: 4, c: 3 }, { r: 5, c: 0 }, { r: 5, c: 2 }
      ],
      pipPieces: [
        { r: 0, c: 1 }, { r: 0, c: 3 }, { r: 1, c: 2 }
      ]
    },
    {
      themeName: "Saltos Mágicos",
      instruction: "Dê saltos diagonais por cima das peças do Pip para transformá-las em estrelinhas!",
      playerSymbol: "💎",
      pipSymbol: "🍃",
      playerColorName: "Cristais Radiantes",
      pipColorName: "Folhinhas do Bosque",
      playerPieces: [
        { r: 4, c: 1 }, { r: 4, c: 3 }, { r: 4, c: 5 }, { r: 5, c: 2 }
      ],
      pipPieces: [
        { r: 0, c: 3 }, { r: 0, c: 5 }, { r: 1, c: 2 }, { r: 2, c: 3 }
      ]
    },
    {
      themeName: "A Dama Real",
      instruction: "Avance até a última linha para coroar sua Dama Real com poderes mágicos!",
      playerSymbol: "🌟",
      pipSymbol: "🐶",
      playerColorName: "Super Estrelas",
      pipColorName: "Amiguinhos do Pip",
      playerPieces: [
        { r: 3, c: 2 }, { r: 4, c: 1 }, { r: 4, c: 5 }, { r: 5, c: 4 }
      ],
      pipPieces: [
        { r: 0, c: 1 }, { r: 0, c: 5 }, { r: 1, c: 4 }, { r: 2, c: 1 }
      ]
    }
  ],

  // Jogo 10: O Quebra-Cabeça Acolhedor do Pip (Percepção Visual & Encaixe Tátil)
  10: [
    {
      themeName: "Piquenique no Bosque",
      instruction: "Arraste as peças ou toque nelas para montar o lindo piquenique do Pip!",
      width: 400,
      height: 300,
      rows: 2,
      cols: 2,
      pieces: [
        { id: 0, r: 0, c: 0, icon: "🐶", name: "Pip no Bosque", hint: "O Pip sorrindo no céu azul!" },
        { id: 1, r: 0, c: 1, icon: "🦋", name: "Borboleta e Arco-Íris", hint: "A borboleta perto do arco-íris!" },
        { id: 2, r: 1, c: 0, icon: "🍎", name: "Cesta de Maçãs", hint: "A toalha de piquenique com frutas!" },
        { id: 3, r: 1, c: 1, icon: "🌻", name: "Girassol Dourado", hint: "O girassol grandão na relva!" }
      ],
      svgContent: `
        <defs>
          <linearGradient id="pzSky1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7DD3FC"/>
            <stop offset="100%" stop-color="#E0F2FE"/>
          </linearGradient>
          <linearGradient id="pzGrass1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#86EFAC"/>
            <stop offset="100%" stop-color="#22C55E"/>
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#pzSky1)"/>
        <circle cx="38" cy="38" r="28" fill="#FDE047" opacity="0.9"/>
        <circle cx="38" cy="38" r="36" fill="#FDE047" opacity="0.3"/>
        <path d="M 170 120 A 130 130 0 0 1 390 120" fill="none" stroke="#F43F5E" stroke-width="8" opacity="0.85"/>
        <path d="M 178 120 A 122 122 0 0 1 382 120" fill="none" stroke="#FB923C" stroke-width="8" opacity="0.85"/>
        <path d="M 186 120 A 114 114 0 0 1 374 120" fill="none" stroke="#FACC15" stroke-width="8" opacity="0.85"/>
        <path d="M 194 120 A 106 106 0 0 1 366 120" fill="none" stroke="#4ADE80" stroke-width="8" opacity="0.85"/>
        <path d="M 202 120 A 98 98 0 0 1 358 120" fill="none" stroke="#38BDF8" stroke-width="8" opacity="0.85"/>
        <path d="M 0 180 Q 100 130 220 170 T 400 150 L 400 300 L 0 300 Z" fill="url(#pzGrass1)"/>
        <g transform="translate(100, 140)">
          <ellipse cx="0" cy="48" rx="42" ry="12" fill="rgba(15, 23, 42, 0.15)"/>
          <ellipse cx="0" cy="10" rx="34" ry="38" fill="#3B82F6"/>
          <ellipse cx="0" cy="18" rx="22" ry="24" fill="#DBEAFE"/>
          <circle cx="0" cy="-28" r="32" fill="#3B82F6"/>
          <ellipse cx="-28" cy="-18" rx="10" ry="22" fill="#1D4ED8" transform="rotate(-15 -28 -18)"/>
          <ellipse cx="28" cy="-18" rx="10" ry="22" fill="#1D4ED8" transform="rotate(15 28 -18)"/>
          <circle cx="-10" cy="-30" r="4.5" fill="#0F172A"/>
          <circle cx="10" cy="-30" r="4.5" fill="#0F172A"/>
          <circle cx="-8" cy="-32" r="1.5" fill="#FFFFFF"/>
          <circle cx="12" cy="-32" r="1.5" fill="#FFFFFF"/>
          <ellipse cx="-18" cy="-22" rx="5" ry="3" fill="#FDA4AF" opacity="0.8"/>
          <ellipse cx="18" cy="-22" rx="5" ry="3" fill="#FDA4AF" opacity="0.8"/>
          <ellipse cx="0" cy="-22" rx="5" ry="4" fill="#0F172A"/>
          <path d="M -8 -16 Q 0 -10 8 -16" fill="none" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="-32" cy="0" rx="9" ry="18" fill="#3B82F6" transform="rotate(-25 -32 0)"/>
          <ellipse cx="32" cy="0" rx="9" ry="18" fill="#3B82F6" transform="rotate(25 32 0)"/>
        </g>
        <g transform="translate(60, 225)">
          <polygon points="0,35 120,20 150,65 20,80" fill="#FEE2E2" stroke="#EF4444" stroke-width="2"/>
          <line x1="30" y1="28" x2="50" y2="76" stroke="#FCA5A5" stroke-width="2"/>
          <line x1="70" y1="24" x2="90" y2="72" stroke="#FCA5A5" stroke-width="2"/>
          <line x1="110" y1="20" x2="130" y2="68" stroke="#FCA5A5" stroke-width="2"/>
          <rect x="50" y="32" width="46" height="28" rx="6" fill="#B45309"/>
          <ellipse cx="64" cy="30" rx="8" ry="8" fill="#EF4444"/>
          <ellipse cx="80" cy="31" rx="8" ry="8" fill="#EF4444"/>
          <ellipse cx="72" cy="25" rx="7" ry="7" fill="#F87171"/>
        </g>
        <g transform="translate(300, 75)">
          <path d="M 0 0 C -25 -25 -35 5 0 8 C -30 20 -15 35 0 10 Z" fill="#F472B6" opacity="0.9"/>
          <path d="M 0 0 C 25 -25 35 5 0 8 C 30 20 15 35 0 10 Z" fill="#F472B6" opacity="0.9"/>
          <ellipse cx="0" cy="5" rx="3" ry="12" fill="#475569"/>
          <circle cx="0" cy="-9" r="4" fill="#475569"/>
        </g>
        <g transform="translate(320, 220)">
          <path d="M 0 0 Q 5 40 -10 75" fill="none" stroke="#15803D" stroke-width="7" stroke-linecap="round"/>
          <ellipse cx="18" cy="35" rx="16" ry="8" fill="#22C55E" transform="rotate(25 18 35)"/>
          <ellipse cx="-18" cy="50" rx="16" ry="8" fill="#22C55E" transform="rotate(-25 -18 50)"/>
          <circle cx="0" cy="0" r="42" fill="#F59E0B" opacity="0.25"/>
          <circle cx="0" cy="0" r="32" fill="#FBBF24"/>
          <circle cx="0" cy="0" r="18" fill="#78350F"/>
          <circle cx="-5" cy="-4" r="3" fill="#451A03"/>
          <circle cx="5" cy="5" r="3" fill="#451A03"/>
        </g>
      `
    },
    {
      themeName: "O Barquinho das Estrelas",
      instruction: "Encaixe as pecinhas para navegar com o Pip sob o céu estrelado!",
      width: 420,
      height: 280,
      rows: 2,
      cols: 3,
      pieces: [
        { id: 0, r: 0, c: 0, icon: "✨", name: "Céu Noturno", hint: "As estrelinhas no alto à esquerda!" },
        { id: 1, r: 0, c: 1, icon: "🌙", name: "Lua Dourada", hint: "A lua sorridente brilhando no meio!" },
        { id: 2, r: 0, c: 2, icon: "🌟", name: "Estrela Cadente", hint: "O rastro de luz à direita!" },
        { id: 3, r: 1, c: 0, icon: "🐟", name: "Ondas e Peixinho", hint: "O peixinho saltador nas ondas!" },
        { id: 4, r: 1, c: 1, icon: "⛵", name: "Barquinho do Pip", hint: "O barquinho velejando na água!" },
        { id: 5, r: 1, c: 2, icon: "🗼", name: "Farol Iluminado", hint: "O farol encantado na beirinha!" }
      ],
      svgContent: `
        <defs>
          <linearGradient id="pzNightSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0F172A"/>
            <stop offset="60%" stop-color="#1E293B"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
          <linearGradient id="pzSea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0284C7"/>
            <stop offset="100%" stop-color="#0369A1"/>
          </linearGradient>
        </defs>
        <rect width="420" height="280" fill="url(#pzNightSky)"/>
        <circle cx="45" cy="35" r="2.5" fill="#FEF08A"/>
        <circle cx="85" cy="65" r="3.5" fill="#FEF08A"/>
        <circle cx="120" cy="25" r="2" fill="#FEF08A"/>
        <circle cx="340" cy="30" r="3" fill="#FEF08A"/>
        <circle cx="390" cy="60" r="2.5" fill="#FEF08A"/>
        <line x1="310" y1="40" x2="360" y2="70" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
        <g transform="translate(210, 65)">
          <path d="M 0 -38 A 42 42 0 1 0 35 30 A 34 34 0 1 1 0 -38 Z" fill="#FBBF24"/>
          <circle cx="-12" cy="-4" r="3.5" fill="#78350F"/>
          <path d="M -18 8 Q -10 16 -2 8" fill="none" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="-18" cy="3" r="4" fill="#FDA4AF" opacity="0.8"/>
        </g>
        <path d="M 0 160 Q 70 145 140 160 T 280 160 T 420 160 L 420 280 L 0 280 Z" fill="url(#pzSea)"/>
        <path d="M 0 190 Q 60 178 130 190 T 270 190 T 420 190 L 420 280 L 0 280 Z" fill="#0284C7" opacity="0.6"/>
        <g transform="translate(70, 200)">
          <ellipse cx="0" cy="0" rx="14" ry="8" fill="#FB923C"/>
          <polygon points="-12,0 -22,-7 -22,7" fill="#F97316"/>
          <circle cx="8" cy="-2" r="2" fill="#FFFFFF"/>
          <circle cx="9" cy="-2" r="1" fill="#0F172A"/>
        </g>
        <g transform="translate(210, 195)">
          <path d="M -38 12 Q 0 30 38 12 L 28 32 Q 0 38 -28 32 Z" fill="#B45309"/>
          <line x1="0" y1="12" x2="0" y2="-45" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
          <polygon points="2,-42 2,6 36,-12" fill="#F8FAFC" opacity="0.95"/>
          <circle cx="-6" cy="-2" r="14" fill="#3B82F6"/>
          <ellipse cx="-16" cy="-4" rx="4" ry="10" fill="#1D4ED8" transform="rotate(-15 -16 -4)"/>
          <circle cx="-10" cy="-3" r="2" fill="#0F172A"/>
          <circle cx="-3" cy="-3" r="2" fill="#0F172A"/>
          <path d="M -8 2 Q -6 6 -4 2" fill="none" stroke="#0F172A" stroke-width="1.5"/>
          <circle cx="28" cy="18" r="7" fill="#FEF08A" opacity="0.9"/>
        </g>
        <g transform="translate(365, 175)">
          <polygon points="-14,80 14,80 8,0 -8,0" fill="#EF4444"/>
          <rect x="-8" y="20" width="16" height="16" fill="#FFFFFF"/>
          <rect x="-8" y="50" width="16" height="16" fill="#FFFFFF"/>
          <rect x="-10" y="-12" width="20" height="12" fill="#FBBF24"/>
          <polygon points="-8,-12 0,-24 8,-12" fill="#DC2626"/>
          <polygon points="10,-6 60,-30 60,18" fill="#FEF08A" opacity="0.35"/>
        </g>
      `
    },
    {
      themeName: "O Castelo do Arco-Íris",
      instruction: "Monte o grande castelo mágico de cristal do Pip!",
      width: 420,
      height: 280,
      rows: 2,
      cols: 3,
      pieces: [
        { id: 0, r: 0, c: 0, icon: "🏰", name: "Torre da Esquerda", hint: "A torre lateral com bandeirinha!" },
        { id: 1, r: 0, c: 1, icon: "🌈", name: "Arco-Íris e Relógio", hint: "A cúpula mágica e o arco-íris!" },
        { id: 2, r: 0, c: 2, icon: "⭐", name: "Torre Dourada", hint: "A torre reluzente da direita!" },
        { id: 3, r: 1, c: 0, icon: "🍄", name: "Jardim Encantado", hint: "Os cogumelos coloridos no gramado!" },
        { id: 4, r: 1, c: 1, icon: "👑", name: "Portão Real do Pip", hint: "O Pip de coroa na porta do castelo!" },
        { id: 5, r: 1, c: 2, icon: "🌸", name: "Flores do Reino", hint: "O canteiro de flores reluzentes!" }
      ],
      svgContent: `
        <defs>
          <linearGradient id="pzCastleSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FDF4FF"/>
            <stop offset="100%" stop-color="#E9D5FF"/>
          </linearGradient>
        </defs>
        <rect width="420" height="280" fill="url(#pzCastleSky)"/>
        <path d="M 40 180 A 170 170 0 0 1 380 180" fill="none" stroke="#F43F5E" stroke-width="10" opacity="0.8"/>
        <path d="M 50 180 A 160 160 0 0 1 370 180" fill="none" stroke="#FB923C" stroke-width="10" opacity="0.8"/>
        <path d="M 60 180 A 150 150 0 0 1 360 180" fill="none" stroke="#FACC15" stroke-width="10" opacity="0.8"/>
        <path d="M 70 180 A 140 140 0 0 1 350 180" fill="none" stroke="#4ADE80" stroke-width="10" opacity="0.8"/>
        <path d="M 80 180 A 130 130 0 0 1 340 180" fill="none" stroke="#38BDF8" stroke-width="10" opacity="0.8"/>
        <path d="M 90 180 A 120 120 0 0 1 330 180" fill="none" stroke="#A855F7" stroke-width="10" opacity="0.8"/>
        <rect y="210" width="420" height="70" fill="#86EFAC"/>
        <rect x="70" y="80" width="45" height="140" fill="#E2E8F0" rx="4"/>
        <polygon points="65,80 92,20 120,80" fill="#3B82F6"/>
        <circle cx="92.5" cy="110" r="10" fill="#93C5FD"/>
        <rect x="305" y="80" width="45" height="140" fill="#E2E8F0" rx="4"/>
        <polygon points="300,80 327.5,20 355,80" fill="#F59E0B"/>
        <circle cx="327.5" cy="110" r="10" fill="#FDE68A"/>
        <rect x="135" y="100" width="150" height="120" fill="#F1F5F9" rx="6"/>
        <polygon points="135,100 210,35 285,100" fill="#8B5CF6"/>
        <circle cx="210" cy="85" r="16" fill="#FEF08A"/>
        <polygon points="210,75 214,83 222,83 216,88 218,96 210,91 202,96 204,88 198,83 206,83" fill="#F59E0B"/>
        <path d="M 180 220 L 180 160 A 30 30 0 0 1 240 160 L 240 220 Z" fill="#78350F"/>
        <g transform="translate(210, 185)">
          <circle cx="0" cy="0" r="16" fill="#3B82F6"/>
          <circle cx="-5" cy="-2" r="2" fill="#0F172A"/>
          <circle cx="5" cy="-2" r="2" fill="#0F172A"/>
          <path d="M -4 4 Q 0 8 4 4" fill="none" stroke="#0F172A" stroke-width="1.5"/>
          <polygon points="-10,-14 -12,-24 -5,-18 0,-26 5,-18 12,-24 10,-14" fill="#FBBF24"/>
        </g>
        <g transform="translate(45, 230)">
          <ellipse cx="0" cy="8" rx="5" ry="12" fill="#FFFFFF"/>
          <path d="M -14 8 A 14 14 0 0 1 14 8 Z" fill="#EF4444"/>
          <circle cx="-4" cy="2" r="2.5" fill="#FFFFFF"/>
          <circle cx="5" cy="3" r="2" fill="#FFFFFF"/>
        </g>
        <g transform="translate(380, 235)">
          <circle cx="0" cy="0" r="10" fill="#F472B6"/>
          <circle cx="0" cy="0" r="4" fill="#FDE047"/>
        </g>
      `
    },
    {
      themeName: "O Fundo do Mar dos Golfinhos",
      instruction: "Mergulhe com o Pip e monte os amiguinhos do oceano!",
      width: 420,
      height: 280,
      rows: 2,
      cols: 3,
      pieces: [
        { id: 0, r: 0, c: 0, icon: "🐢", name: "Tartaruguinha", hint: "A tartaruguinha nadando lá no topo!" },
        { id: 1, r: 0, c: 1, icon: "🐬", name: "Golfinho Saltarico", hint: "O golfinho alegre na água límpida!" },
        { id: 2, r: 0, c: 2, icon: "🫧", name: "Bolhas de Luz", hint: "A luz do sol e bolhinhas cristalinas!" },
        { id: 3, r: 1, c: 0, icon: "🪸", name: "Coral Cor-de-Rosa", hint: "O coral fofinho na areia!" },
        { id: 4, r: 1, c: 1, icon: "🤿", name: "Pip Mergulhador", hint: "O Pip com máscara de mergulho!" },
        { id: 5, r: 1, c: 2, icon: "💎", name: "Baú de Pérolas", hint: "O baú dourado cheio de tesouros!" }
      ],
      svgContent: `
        <defs>
          <linearGradient id="pzSeaDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="60%" stop-color="#0284C7"/>
            <stop offset="100%" stop-color="#0F766E"/>
          </linearGradient>
        </defs>
        <rect width="420" height="280" fill="url(#pzSeaDepth)"/>
        <polygon points="50,0 90,0 160,200 100,200" fill="#FFFFFF" opacity="0.15"/>
        <polygon points="200,0 240,0 320,220 260,220" fill="#FFFFFF" opacity="0.15"/>
        <polygon points="320,0 360,0 410,180 370,180" fill="#FFFFFF" opacity="0.12"/>
        <path d="M 0 230 Q 120 215 240 235 T 420 225 L 420 280 L 0 280 Z" fill="#FDE68A"/>
        <g transform="translate(65, 70)">
          <ellipse cx="0" cy="0" rx="20" ry="14" fill="#15803D"/>
          <circle cx="20" cy="-4" r="7" fill="#22C55E"/>
          <ellipse cx="10" cy="14" rx="8" ry="4" fill="#22C55E"/>
          <ellipse cx="-10" cy="14" rx="8" ry="4" fill="#22C55E"/>
        </g>
        <g transform="translate(200, 75)">
          <path d="M -30 18 Q 0 -25 35 -5 Q 15 15 -10 18 Z" fill="#67E8F9"/>
          <polygon points="35,-5 48,-15 44,5" fill="#06B6D4"/>
          <polygon points="2,-16 -4,-30 -8,-16" fill="#06B6D4"/>
          <circle cx="-16" cy="4" r="2.5" fill="#0F172A"/>
        </g>
        <circle cx="350" cy="50" r="8" fill="none" stroke="#E0F2FE" stroke-width="2" opacity="0.7"/>
        <circle cx="365" cy="85" r="5" fill="none" stroke="#E0F2FE" stroke-width="1.5" opacity="0.7"/>
        <g transform="translate(60, 235)">
          <path d="M 0 0 Q -15 -35 0 -45 T 15 -30 T 0 0" fill="#F43F5E"/>
          <path d="M 12 0 Q 30 -25 20 -40 T 5 -15" fill="#FB7185"/>
          <circle cx="-25" cy="15" r="10" fill="#FBBF24"/>
        </g>
        <g transform="translate(210, 185)">
          <circle cx="0" cy="0" r="24" fill="#3B82F6"/>
          <rect x="-16" y="-10" width="32" height="18" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2"/>
          <rect x="-12" y="-7" width="24" height="12" rx="4" fill="#67E8F9" opacity="0.75"/>
          <circle cx="-6" cy="-2" r="2.5" fill="#0F172A"/>
          <circle cx="6" cy="-2" r="2.5" fill="#0F172A"/>
          <path d="M 14 -2 L 24 -2 L 24 -24" fill="none" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/>
          <circle cx="25" cy="-30" r="4" fill="#E0F2FE" opacity="0.8"/>
        </g>
        <g transform="translate(360, 235)">
          <rect x="-24" y="-8" width="48" height="30" rx="4" fill="#B45309"/>
          <path d="M -24 -8 Q 0 -26 24 -8 Z" fill="#F59E0B"/>
          <circle cx="0" cy="-6" r="8" fill="#FFFFFF"/>
          <circle cx="-2" cy="-8" r="2" fill="#E0F2FE"/>
        </g>
      `
    }
  ]
};

export class EducationalGamesManager {
  constructor(app) {
    this.app = app;
    this.currentGameId = null;
    this.currentRound = 0;
    this.totalRounds = 3;
    this.attemptsOnCurrentRound = 0;
    this.activeRounds = [];
  }

  /**
   * Sorteia aleatoriamente e sem repetição 'count' itens de um array
   */
  pickRandomSubset(array, count = 3) {
    if (!array || array.length === 0) return [];
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, Math.min(count, copy.length));
  }

  /**
   * Prepara os 3 exercícios únicos da sessão atual do jogo
   */
  prepareSessionRounds(gameId) {
    const pool = GAME_POOLS[gameId] || [];
    this.activeRounds = this.pickRandomSubset(pool, this.totalRounds);
  }

  /**
   * Salva a sessão ativa e rodada do jogo no localStorage para não perder o progresso se atualizar a página
   */
  saveActiveGameState(isChestOpen = false) {
    if (!this.currentGameId) return;
    const state = {
      gameId: this.currentGameId,
      currentRound: this.currentRound,
      totalRounds: this.totalRounds,
      activeRounds: this.activeRounds,
      attemptsOnCurrentRound: this.attemptsOnCurrentRound,
      isChestOpen: isChestOpen || (document.getElementById('treasureChestOverlay')?.classList.contains('active') || false),
      timestamp: Date.now()
    };
    try {
      localStorage.setItem('starkids_active_game_session', JSON.stringify(state));
    } catch (e) {
      console.warn('[StartKids] Falha ao persistir sessão do jogo:', e);
    }
  }

  /**
   * Limpa a sessão ativa do jogo ao voltar voluntariamente ao jardim ou concluir o baú
   */
  clearActiveGameState() {
    if (typeof this.activeCleanup === 'function') {
      try { this.activeCleanup(); } catch (_) { }
      this.activeCleanup = null;
    }
    try {
      localStorage.removeItem('starkids_active_game_session');
    } catch (e) { }
  }

  /**
   * Restaura o jogo e a rodada exata onde a criança estava após um reload de página
   */
  restoreActiveGame() {
    try {
      const raw = localStorage.getItem('starkids_active_game_session');
      if (!raw) return false;
      const state = JSON.parse(raw);
      if (!state || !state.gameId || !state.currentRound) return false;

      this.currentGameId = state.gameId;
      this.currentRound = state.currentRound;
      this.totalRounds = state.totalRounds || 3;
      this.attemptsOnCurrentRound = state.attemptsOnCurrentRound || 0;
      this.activeRounds = (state.activeRounds && Array.isArray(state.activeRounds) && state.activeRounds.length > 0)
        ? state.activeRounds
        : this.pickRandomSubset(GAME_POOLS[this.currentGameId] || [], this.totalRounds);

      this.app.showView('game');
      this.app.calmMode.setMissionState(true);

      const stepDots = document.querySelectorAll('.game-step-dot');
      stepDots.forEach((dot, idx) => {
        if (idx + 1 < this.currentRound) {
          dot.className = 'game-step-dot done';
        } else if (idx + 1 === this.currentRound) {
          dot.className = 'game-step-dot active';
        } else {
          dot.className = 'game-step-dot';
        }
      });

      const chestOverlay = document.getElementById('treasureChestOverlay');
      if (chestOverlay) chestOverlay.classList.remove('active');

      if (state.isChestOpen || this.currentRound > this.totalRounds) {
        this.triggerChestReward();
      } else {
        this.loadRound();
      }

      console.log(`✨ [StartKids] Jogo ${this.currentGameId} restaurado com sucesso na rodada ${this.currentRound} de ${this.totalRounds}!`);
      return true;
    } catch (e) {
      console.warn('[StartKids] Erro ao restaurar jogo:', e);
      return false;
    }
  }

  startGame(gameId) {
    this.currentGameId = gameId;
    this.currentRound = 1;
    this.attemptsOnCurrentRound = 0;
    this.prepareSessionRounds(gameId);

    this.app.showView('game');
    this.app.calmMode.setMissionState(true);

    const stepDots = document.querySelectorAll('.game-step-dot');
    stepDots.forEach((dot, idx) => {
      dot.className = 'game-step-dot' + (idx === 0 ? ' active' : '');
    });

    const chestOverlay = document.getElementById('treasureChestOverlay');
    if (chestOverlay) chestOverlay.classList.remove('active');

    this.saveActiveGameState();
    this.loadRound();
  }

  updateRoundStep(step) {
    this.currentRound = step;
    this.attemptsOnCurrentRound = 0;
    const stepDots = document.querySelectorAll('.game-step-dot');
    stepDots.forEach((dot, idx) => {
      if (idx + 1 < step) {
        dot.className = 'game-step-dot done';
      } else if (idx + 1 === step) {
        dot.className = 'game-step-dot active';
      } else {
        dot.className = 'game-step-dot';
      }
    });
    this.saveActiveGameState();
  }

  loadRound() {
    if (typeof this.activeCleanup === 'function') {
      try { this.activeCleanup(); } catch (_) { }
      this.activeCleanup = null;
    }

    if (this.currentRound > this.totalRounds) {
      this.triggerChestReward();
      return;
    }

    if (!this.activeRounds || this.activeRounds.length === 0) {
      this.prepareSessionRounds(this.currentGameId);
    }

    if (this.currentGameId === 1) this.renderEmotionsGame();
    else if (this.currentGameId === 2) this.renderPhonicsGame();
    else if (this.currentGameId === 3) this.renderMathBalanceGame();
    else if (this.currentGameId === 4) this.renderPatternsGame();
    else if (this.currentGameId === 5) this.renderRoutineGame();
    else if (this.currentGameId === 6) this.renderTicTacToeGame();
    else if (this.currentGameId === 7) this.renderMemoryGame();
    else if (this.currentGameId === 8) this.renderMazeGame();
    else if (this.currentGameId === 9) this.renderCheckersGame();
    else if (this.currentGameId === 10) this.renderPuzzleGame();
  }

  // ==========================================================================
  // JOGO 1: O ESPELHO DAS EMOÇÕES (Socioemocional & Empatia)
  // ==========================================================================
  renderEmotionsGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[1][0];
    this.setGameHeader("O Espelho das Emoções", "Identifique o sentimento do amigo para fortalecer a empatia.", data.scenario);

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="emotion-game-wrapper">
        <!-- Balão Narrativo com Texto da História (Acessibilidade Visual e Auditiva) -->
        <div class="emotion-story-card" id="emotionStoryCard" role="region" aria-label="História da cena">
          <div class="emotion-story-header">
            <span class="emotion-story-badge">📖 HISTÓRIA DO PIP</span>
            <button class="btn-listen-story" id="btnListenStory" title="Ouvir a história do Pip novamente" type="button">
              <span>🔊</span>
              <span>Ouvir História</span>
            </button>
          </div>
          <p class="emotion-story-text" id="emotionStoryText">${data.scenario}</p>
          <div class="emotion-feedback-bubble" id="emotionFeedbackBubble" style="display: none;"></div>
        </div>

        <div class="emotion-scene-card anim-float">
          ${window.EmojiEnhancer?.vectors[data.vectorKey] || `<span style="font-size: 64px;">${data.icon}</span>`}
        </div>

        <div class="emotion-choices-grid">
          ${data.options.map(opt => `
            <button class="emotion-btn" data-id="${opt.id}" tabindex="0">
              <span class="emotion-btn-emoji">${opt.emoji}</span>
              <span class="emotion-btn-label">${opt.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    // Botão para repetir a narração da história
    const btnListenStory = document.getElementById('btnListenStory');
    if (btnListenStory) {
      btnListenStory.addEventListener('click', () => {
        sound.playSoftTap();
        speech.speak(data.scenario, true);
      });
    }

    const feedbackBubble = document.getElementById('emotionFeedbackBubble');
    const storyCard = document.getElementById('emotionStoryCard');

    const sceneCard = stage.querySelector('.emotion-scene-card');

    const handleEmotionChoice = (btn, id) => {
      if (id === data.correctId) {
        // Desabilita os botões para evitar toques acidentais durante a fala e a transição
        stage.querySelectorAll('.emotion-btn').forEach(b => {
          b.style.pointerEvents = 'none';
        });

        btn.classList.add('correct', 'anim-success-pulse');
        sound.playChord([329.63, 392.00, 523.25]);

        // Mostra o feedback explicativo em texto no balão
        if (feedbackBubble && storyCard) {
          storyCard.classList.add('story-success');
          feedbackBubble.style.display = 'block';
          feedbackBubble.className = 'emotion-feedback-bubble success';
          feedbackBubble.innerHTML = `
            <span class="feedback-icon">✨</span>
            <span>${data.feedback}</span>
          `;
        }

        // Fala o feedback com a voz angelical e aguarda exatamente 1 segundo após o término da fala
        speech.speak(data.feedback, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else {
        this.attemptsOnCurrentRound++;
        btn.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => btn.classList.remove('anim-gentle-reset'), 500);

        // Dica textual acolhedora
        if (feedbackBubble) {
          feedbackBubble.style.display = 'block';
          feedbackBubble.className = 'emotion-feedback-bubble hint';
          feedbackBubble.innerHTML = `
            <span class="feedback-icon">💭</span>
            <span>Como você se sentiria nessa situação? Dê uma olhadinha no desenho e tente novamente com calma!</span>
          `;
        }

        if (this.attemptsOnCurrentRound >= 2) {
          const correctBtn = stage.querySelector(`.emotion-btn[data-id="${data.correctId}"]`);
          if (correctBtn) correctBtn.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    stage.querySelectorAll('.emotion-btn').forEach(btn => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetBtn = () => {
        btn.classList.add('returning');
        btn.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          btn.classList.remove('is-dragging', 'returning');
          btn.style.transform = '';
        }, 260);
        if (sceneCard) sceneCard.classList.remove('drag-over');
      };

      btn.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        btn.classList.remove('returning');
        try { btn.setPointerCapture(e.pointerId); } catch (_) { }
      });

      btn.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          btn.classList.add('is-dragging');
        }

        if (isDragging) {
          btn.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.08)`;
          if (sceneCard) {
            const rect = sceneCard.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 30 &&
              e.clientX <= rect.right + 30 &&
              e.clientY >= rect.top - 30 &&
              e.clientY <= rect.bottom + 30
            );
            sceneCard.classList.toggle('drag-over', inside);
          }
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const id = btn.getAttribute('data-id');

        if (isDragging) {
          isDragging = false;
          let droppedOnScene = false;
          if (sceneCard) {
            const rect = sceneCard.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 30 &&
              e.clientX <= rect.right + 30 &&
              e.clientY >= rect.top - 30 &&
              e.clientY <= rect.bottom + 30
            ) {
              droppedOnScene = true;
            }
            sceneCard.classList.remove('drag-over');
          }

          btn.classList.remove('is-dragging');
          btn.style.transform = '';

          if (droppedOnScene) {
            handleEmotionChoice(btn, id);
          } else {
            resetBtn();
          }
        }
      };

      btn.addEventListener('pointerup', handlePointerEnd);
      btn.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetBtn();
        }
      });

      btn.addEventListener('click', () => {
        if (isDragging) return;
        const id = btn.getAttribute('data-id');
        handleEmotionChoice(btn, id);
      });
    });
  }

  // ==========================================================================
  // JOGO 2: CONSTRUTOR DE PALAVRINHAS (Consciência Fonológica & Leitura)
  // ==========================================================================
  renderPhonicsGame() {
    const currentWordData = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[2][0];
    const targetWord = currentWordData.word;
    const targetLetters = targetWord.split('');

    this.setGameHeader(
      "Construtor de Palavrinhas",
      "Segure a letrinha e puxe até a caixinha correspondente (ou toque nela).",
      `Vamos escrever a palavra: ${targetWord}! ${currentWordData.hint}`
    );

    // Embaralha as letras mantendo garantia de que há as letras necessárias
    const shuffled = [...targetLetters].sort(() => Math.random() - 0.5);
    let filledCount = 0;

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="phonics-game-wrapper" id="phonicsGameWrapper">
        <!-- Barra de Acomodações Sensoriais e Tipografia Acolhedora -->
        <div class="phonics-accommodations-bar" role="toolbar" aria-label="Acomodações Tipográficas e Sensoriais">
          <span class="phonics-accom-tag">✨ Lexend • Anti-Aglomeração</span>
          <button class="phonics-accom-btn" id="btnPhonicsCase" type="button" title="Alternar entre Maiúsculas e Minúsculas">
            <span>🔤</span> <span id="lblPhonicsCase">MAIÚSCULAS</span>
          </button>
          <button class="phonics-accom-btn" id="btnPhonicsSize" type="button" title="Aumentar tamanho das letrinhas">
            <span>🔍</span> <span id="lblPhonicsSize">Tamanho Normal</span>
          </button>
        </div>

        <div class="phonics-illustration anim-float">
          ${window.EmojiEnhancer?.vectors[currentWordData.word] || `<span style="font-size: 72px;">${currentWordData.icon}</span>`}
        </div>

        <!-- Caixinhas Receptoras Correspondentes -->
        <div class="phonics-slots-row" id="phonicsSlotsRow">
          ${targetLetters.map((letter, idx) => `
            <div class="phonics-slot" data-expected="${letter}" data-idx="${idx}" aria-label="Caixinha da letra ${letter}"></div>
          `).join('')}
        </div>

        <!-- Bandeja de Letrinhas Draggable & Acomodada -->
        <div class="phonics-letters-tray" id="phonicsLettersTray">
          ${shuffled.map((letter, idx) => `
            <button class="phonics-letter-tile" data-letter="${letter}" data-idx="${idx}" aria-label="Letra ${letter}">
              ${letter}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const wrapper = document.getElementById('phonicsGameWrapper');
    const tiles = stage.querySelectorAll('.phonics-letter-tile');
    const slots = stage.querySelectorAll('.phonics-slot');

    // Suporte aos botões de acomodação para a criança
    const btnCase = document.getElementById('btnPhonicsCase');
    const lblCase = document.getElementById('lblPhonicsCase');
    let isLowercase = false;
    if (btnCase) {
      btnCase.addEventListener('click', () => {
        isLowercase = !isLowercase;
        wrapper.classList.toggle('mode-lowercase', isLowercase);
        lblCase.textContent = isLowercase ? 'minúsculas' : 'MAIÚSCULAS';
        btnCase.classList.toggle('active', isLowercase);
        sound.playPop();
      });
    }

    const btnSize = document.getElementById('btnPhonicsSize');
    const lblSize = document.getElementById('lblPhonicsSize');
    let isLargeSize = false;
    if (btnSize) {
      btnSize.addEventListener('click', () => {
        isLargeSize = !isLargeSize;
        wrapper.classList.toggle('mode-large-letters', isLargeSize);
        lblSize.textContent = isLargeSize ? 'Ampliado (+25%)' : 'Tamanho Normal';
        btnSize.classList.toggle('active', isLargeSize);
        sound.playPop();
      });
    }

    // Função de preenchimento com feedback acolhedor
    const handleLetterPlacement = (tile, targetSlot, letter) => {
      tile.style.display = 'none';
      targetSlot.textContent = letter;
      targetSlot.classList.remove('drag-over');
      targetSlot.classList.add('filled', 'anim-success-pulse');
      filledCount++;

      const slotIdx = parseInt(targetSlot.getAttribute('data-idx') || '0', 10);
      sound.playTone(sound.pentatonicScale.C4 + slotIdx * 60, 0.7);

      if (filledCount === targetLetters.length) {
        tiles.forEach(t => t.style.pointerEvents = 'none');
        // Fala a última letra puxada, aguarda a locutora terminar de falar a letra completamente,
        // aguarda 1 segundo de intervalo suave e sem sobreposição (delayAfterEnd: 1000), e só então entra o elogio!
        speech.speak(letter, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            sound.playChord([261.63, 329.63, 392.00, 523.25]);
            speech.speak(`Muito bem! Você escreveu ${targetWord}!`, {
              force: true,
              delayAfterEnd: 1000,
              onEnd: () => {
                this.updateRoundStep(this.currentRound + 1);
                this.loadRound();
              }
            });
          }
        });
      } else {
        speech.speak(letter);
      }
    };

    // Implementação de Arrastar com Mouse/Touch e Soltar na Caixinha Correspondente
    tiles.forEach(tile => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetTile = () => {
        tile.classList.add('returning');
        tile.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          tile.classList.remove('is-dragging', 'returning');
          tile.style.transform = '';
        }, 260);
        slots.forEach(s => s.classList.remove('drag-over'));
      };

      tile.addEventListener('pointerdown', (e) => {
        if (tile.style.display === 'none') return;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        tile.classList.remove('returning');
        try {
          tile.setPointerCapture(e.pointerId);
        } catch (_) { }
      });

      tile.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          tile.classList.add('is-dragging');
        }

        if (isDragging) {
          tile.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;

          // Detecção de sobreposição da caixinha receptora (hit-test)
          let hitAny = false;
          slots.forEach(slot => {
            if (slot.classList.contains('filled')) {
              slot.classList.remove('drag-over');
              return;
            }
            const rect = slot.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            );
            if (inside && !hitAny) {
              slot.classList.add('drag-over');
              hitAny = true;
            } else {
              slot.classList.remove('drag-over');
            }
          });
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try {
          tile.releasePointerCapture(e.pointerId);
        } catch (_) { }
        currentPointerId = null;

        const letter = tile.getAttribute('data-letter');

        if (isDragging) {
          isDragging = false;
          let droppedSlot = null;
          slots.forEach(slot => {
            if (slot.classList.contains('filled')) return;
            const rect = slot.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            ) {
              droppedSlot = slot;
            }
            slot.classList.remove('drag-over');
          });

          if (droppedSlot) {
            const expected = droppedSlot.getAttribute('data-expected');
            if (expected === letter) {
              handleLetterPlacement(tile, droppedSlot, letter);
              return;
            } else {
              // Caixinha errada: feedback suave sem punição
              this.attemptsOnCurrentRound++;
              droppedSlot.classList.add('anim-gentle-reset');
              sound.playTone(sound.pentatonicScale.D4, 0.4);
              setTimeout(() => droppedSlot.classList.remove('anim-gentle-reset'), 500);
              resetTile();

              if (this.attemptsOnCurrentRound >= 2) {
                const matchingSlot = Array.from(slots).find(s => s.getAttribute('data-expected') === letter && !s.classList.contains('filled'));
                if (matchingSlot) matchingSlot.classList.add('guidance-active');
                tile.classList.add('guidance-active');
                sound.playGuidance();
              }
              return;
            }
          }

          // Soltou fora de uma caixinha: retorna suavemente à bandeja
          resetTile();
        } else {
          // Clique ou toque direto (Acessibilidade motora para crianças que preferem tocar)
          const targetSlot = Array.from(slots).find(s => s.getAttribute('data-expected') === letter && !s.classList.contains('filled'));
          if (targetSlot) {
            handleLetterPlacement(tile, targetSlot, letter);
          } else {
            tile.classList.add('anim-gentle-reset');
            sound.playTone(sound.pentatonicScale.D4, 0.4);
            setTimeout(() => tile.classList.remove('anim-gentle-reset'), 500);
          }
        }
      };

      tile.addEventListener('pointerup', handlePointerEnd);
      tile.addEventListener('pointercancel', handlePointerEnd);
    });
  }

  // ==========================================================================
  // JOGO 3: BALANÇA DAS QUANTIDADES (Matemática Concreta & Números)
  // ==========================================================================
  renderMathBalanceGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[3][0];
    let currentRightCount = 0;
    const fruitItemHtml = window.EmojiEnhancer?.vectors[data.vectorKey] || `<span class="balance-fruit">${data.icon}</span>`;

    this.setGameHeader(
      "Balança das Quantidades",
      "Coloque frutinhas no prato direito até a balança ficar perfeitamente equilibrada.",
      `Equilibre a balança com ${data.target} ${data.name}!`
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="balance-game-wrapper">
        <div class="balance-scale-device" id="balanceScaleDevice">
          <!-- Braço oscilante da balança -->
          <div class="balance-beam" id="balanceBeam">
            <!-- Prato Esquerdo (Alvo) -->
            <div class="balance-pan left" id="panLeft">
              <div class="pan-contents">
                ${Array(data.target).fill(`<span class="balance-fruit">${fruitItemHtml}</span>`).join('')}
              </div>
              <div class="pan-label">${data.target}</div>
            </div>

            <!-- Prato Direito (Interativo) -->
            <div class="balance-pan right" id="panRight">
              <div class="pan-contents" id="panRightContents"></div>
              <div class="pan-label" id="panRightLabel">0</div>
            </div>
          </div>
          <div class="balance-stand"></div>
        </div>

        <!-- Controles de Colocar / Tirar Frutinhas com Arraste -->
        <div class="balance-controls">
          <div class="balance-drag-box" title="Puxe a frutinha até a balança ou toque no botão">
            <button class="balance-draggable-fruit" id="balanceDraggableFruit" type="button" aria-label="Fruta arrastável">
              ${fruitItemHtml}
            </button>
            <span class="drag-hint-text">Puxe até o prato ➔</span>
          </div>
          <button class="balance-btn add" id="btnAddFruit">
            <span>➕ Colocar ${data.icon}</span>
          </button>
          <button class="balance-btn remove" id="btnRemoveFruit">
            <span>➖ Tirar</span>
          </button>
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const beam = document.getElementById('balanceBeam');
    const panRight = document.getElementById('panRight');
    const panRightContents = document.getElementById('panRightContents');
    const panRightLabel = document.getElementById('panRightLabel');
    const dragFruit = document.getElementById('balanceDraggableFruit');

    const updateScaleTilt = () => {
      const diff = data.target - currentRightCount;
      // Inclina de acordo com a diferença (-15deg a +15deg)
      let deg = Math.max(-12, Math.min(12, diff * 4));
      beam.style.transform = `rotate(${deg}deg)`;

      panRightLabel.textContent = currentRightCount;
      panRightContents.innerHTML = Array(currentRightCount).fill(`<span class="balance-fruit">${fruitItemHtml}</span>`).join('');
      window.EmojiEnhancer?.enhance(panRightContents);

      if (currentRightCount === data.target) {
        beam.style.transform = 'rotate(0deg)';
        panRightContents.classList.add('anim-success-pulse');
        const btnAdd = document.getElementById('btnAddFruit');
        const btnRemove = document.getElementById('btnRemoveFruit');
        if (btnAdd) btnAdd.style.pointerEvents = 'none';
        if (btnRemove) btnRemove.style.pointerEvents = 'none';
        if (dragFruit) dragFruit.style.pointerEvents = 'none';

        sound.playChord([261.63, 329.63, 392.00, 523.25]);
        speech.speak(`Equilíbrio perfeito! São ${data.target} ${data.name} nos dois lados!`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      }
    };

    updateScaleTilt();

    const addOneFruit = () => {
      if (currentRightCount < 6) {
        currentRightCount++;
        sound.playPop();
        updateScaleTilt();
      }
    };

    if (dragFruit && panRight) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetFruit = () => {
        dragFruit.classList.add('returning');
        dragFruit.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          dragFruit.classList.remove('is-dragging', 'returning');
          dragFruit.style.transform = '';
        }, 260);
        panRight.classList.remove('drag-over');
      };

      dragFruit.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        dragFruit.classList.remove('returning');
        try { dragFruit.setPointerCapture(e.pointerId); } catch (_) { }
      });

      dragFruit.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          dragFruit.classList.add('is-dragging');
        }

        if (isDragging) {
          dragFruit.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.18)`;
          const rect = panRight.getBoundingClientRect();
          const inside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          panRight.classList.toggle('drag-over', inside);
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { dragFruit.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        if (isDragging) {
          isDragging = false;
          const rect = panRight.getBoundingClientRect();
          const droppedOnPan = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          panRight.classList.remove('drag-over');

          dragFruit.classList.remove('is-dragging');
          dragFruit.style.transform = '';

          if (droppedOnPan) {
            addOneFruit();
          } else {
            resetFruit();
          }
        }
      };

      dragFruit.addEventListener('pointerup', handlePointerEnd);
      dragFruit.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { dragFruit.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetFruit();
        }
      });

      dragFruit.addEventListener('click', () => {
        if (isDragging) return;
        addOneFruit();
      });
    }

    document.getElementById('btnAddFruit').onclick = () => {
      addOneFruit();
    };

    document.getElementById('btnRemoveFruit').onclick = () => {
      if (currentRightCount > 0) {
        currentRightCount--;
        sound.playPop();
        updateScaleTilt();
      }
    };
  }

  // ==========================================================================
  // JOGO 4: O TREM DOS PADRÕES (Funções Executivas & Sequenciamento Lógico)
  // ==========================================================================
  renderPatternsGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[4][0];
    this.setGameHeader(
      "O Trem dos Padrões",
      "Segure a pecinha e puxe até o vagão com interrogação (ou toque para escolher).",
      "Qual elemento vem a seguir para completar o trenzinho mágico?"
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="train-game-wrapper">
        <div class="train-track">
          <!-- Locomotiva amigável -->
          <div class="train-locomotive">🚂</div>
          <!-- Vagões da Sequência -->
          ${data.sequence.map(item => `
            <div class="train-car filled">${item}</div>
          `).join('')}
          <!-- Vagão Alvo -->
          <div class="train-car target" id="trainTargetCar">❓</div>
        </div>

        <!-- Opções para Escolher / Arrastar -->
        <div class="pattern-options-row">
          ${data.options.map(opt => `
            <button class="pattern-choice-btn" data-val="${opt}" aria-label="Opção ${opt}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const choiceBtns = stage.querySelectorAll('.pattern-choice-btn');
    const targetCar = document.getElementById('trainTargetCar');

    const handlePatternSelection = (btn, val) => {
      if (val === data.correct) {
        choiceBtns.forEach(b => b.style.pointerEvents = 'none');
        targetCar.textContent = val;
        window.EmojiEnhancer?.enhance(targetCar);
        targetCar.classList.remove('target', 'drag-over');
        targetCar.classList.add('filled', 'anim-success-pulse');

        sound.playChord([293.66, 369.99, 440.00]);
        speech.speak(`Muito inteligente! ${data.explanation}`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else {
        this.attemptsOnCurrentRound++;
        btn.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => btn.classList.remove('anim-gentle-reset'), 500);

        if (this.attemptsOnCurrentRound >= 2) {
          const correctBtn = stage.querySelector(`.pattern-choice-btn[data-val="${data.correct}"]`);
          if (correctBtn) correctBtn.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    choiceBtns.forEach(btn => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetBtn = () => {
        btn.classList.add('returning');
        btn.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          btn.classList.remove('is-dragging', 'returning');
          btn.style.transform = '';
        }, 260);
        targetCar.classList.remove('drag-over');
      };

      btn.addEventListener('pointerdown', (e) => {
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        btn.classList.remove('returning');
        try { btn.setPointerCapture(e.pointerId); } catch (_) { }
      });

      btn.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          btn.classList.add('is-dragging');
        }

        if (isDragging) {
          btn.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;
          const rect = targetCar.getBoundingClientRect();
          const inside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          if (inside) {
            targetCar.classList.add('drag-over');
          } else {
            targetCar.classList.remove('drag-over');
          }
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { btn.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const val = btn.getAttribute('data-val');

        if (isDragging) {
          isDragging = false;
          const rect = targetCar.getBoundingClientRect();
          const droppedInside = (
            e.clientX >= rect.left - 25 &&
            e.clientX <= rect.right + 25 &&
            e.clientY >= rect.top - 25 &&
            e.clientY <= rect.bottom + 25
          );
          targetCar.classList.remove('drag-over');

          if (droppedInside) {
            btn.classList.remove('is-dragging');
            btn.style.transform = '';
            handlePatternSelection(btn, val);
          } else {
            resetBtn();
          }
        } else {
          handlePatternSelection(btn, val);
        }
      };

      btn.addEventListener('pointerup', handlePointerEnd);
      btn.addEventListener('pointercancel', handlePointerEnd);
    });
  }

  // ==========================================================================
  // JOGO 5: A ROTINA ENCANTADA (Planejamento, Autonomia & Vida Diária)
  // ==========================================================================
  renderRoutineGame() {
    const currentRoutine = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[5][0];
    this.setGameHeader(
      "A Rotina Encantada",
      "Coloque os cartões na ordem em que as coisas acontecem no dia a dia.",
      `Vamos organizar a rotina: ${currentRoutine.theme}!`
    );

    // Embaralha os passos
    const shuffledSteps = [...currentRoutine.steps].sort(() => Math.random() - 0.5);
    let userOrder = [];

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="routine-game-wrapper">
        <!-- Linha do Tempo (1, 2, 3) -->
        <div class="routine-timeline-slots">
          <div class="routine-slot" data-step="1">
            <span class="slot-num">1º</span>
            <div class="slot-card-holder" id="routineHolder-1"></div>
          </div>
          <div class="routine-slot" data-step="2">
            <span class="slot-num">2º</span>
            <div class="slot-card-holder" id="routineHolder-2"></div>
          </div>
          <div class="routine-slot" data-step="3">
            <span class="slot-num">3º</span>
            <div class="slot-card-holder" id="routineHolder-3"></div>
          </div>
        </div>

        <!-- Cartões para Clicar e Posicionar -->
        <div class="routine-cards-pool" id="routineCardsPool">
          ${shuffledSteps.map(st => `
            <button class="routine-card-btn" data-step-id="${st.id}">
              <span class="routine-card-icon">${st.icon}</span>
              <span class="routine-card-desc">${st.text}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    window.EmojiEnhancer?.enhance(stage);

    const cards = stage.querySelectorAll('.routine-card-btn');
    const slots = stage.querySelectorAll('.routine-slot');

    const handleCardPlacement = (card, stepId) => {
      const expectedStep = userOrder.length + 1;
      if (stepId === expectedStep) {
        userOrder.push(stepId);
        card.style.display = 'none';

        const holder = document.getElementById(`routineHolder-${expectedStep}`);
        const stepData = currentRoutine.steps.find(s => s.id === stepId);
        holder.innerHTML = `
          <div class="placed-routine-card anim-success-pulse">
            <span>${stepData.icon}</span>
            <p>${stepData.text}</p>
          </div>
        `;
        window.EmojiEnhancer?.enhance(holder);

        sound.playTone(sound.pentatonicScale.C4 + expectedStep * 70, 0.8);

        if (userOrder.length === 3) {
          stage.querySelectorAll('.routine-card-btn').forEach(b => b.style.pointerEvents = 'none');
          // Fala o texto da última ação da rotina, aguarda o término completo,
          // aguarda 1 segundo de intervalo suave (delayAfterEnd: 1000) e aí entra a celebração!
          speech.speak(stepData.text, {
            force: true,
            delayAfterEnd: 1000,
            onEnd: () => {
              sound.playChord([261.63, 329.63, 392.00, 523.25]);
              speech.speak("Sensacional! Você organizou toda a rotina com perfeição!", {
                force: true,
                delayAfterEnd: 1000,
                onEnd: () => {
                  this.updateRoundStep(this.currentRound + 1);
                  this.loadRound();
                }
              });
            }
          });
        } else {
          speech.speak(stepData.text);
        }
      } else {
        this.attemptsOnCurrentRound++;
        card.classList.add('anim-gentle-reset');
        sound.playTone(sound.pentatonicScale.D4, 0.4);
        setTimeout(() => card.classList.remove('anim-gentle-reset'), 500);

        if (this.attemptsOnCurrentRound >= 2) {
          const correctCard = stage.querySelector(`.routine-card-btn[data-step-id="${expectedStep}"]`);
          if (correctCard) correctCard.classList.add('guidance-active');
          sound.playGuidance();
        }
      }
    };

    cards.forEach(card => {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let currentPointerId = null;

      const resetCard = () => {
        card.classList.add('returning');
        card.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          card.classList.remove('is-dragging', 'returning');
          card.style.transform = '';
        }, 260);
        slots.forEach(s => s.classList.remove('drag-over'));
      };

      card.addEventListener('pointerdown', (e) => {
        if (card.style.display === 'none') return;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
        currentPointerId = e.pointerId;
        card.classList.remove('returning');
        try { card.setPointerCapture(e.pointerId); } catch (_) { }
      });

      card.addEventListener('pointermove', (e) => {
        if (currentPointerId !== e.pointerId) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 6) {
          isDragging = true;
          card.classList.add('is-dragging');
        }

        if (isDragging) {
          card.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.06)`;

          let hitAny = false;
          slots.forEach(slot => {
            const rect = slot.getBoundingClientRect();
            const inside = (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            );
            if (inside && !hitAny) {
              slot.classList.add('drag-over');
              hitAny = true;
            } else {
              slot.classList.remove('drag-over');
            }
          });
        }
      });

      const handlePointerEnd = (e) => {
        if (currentPointerId !== e.pointerId) return;
        try { card.releasePointerCapture(e.pointerId); } catch (_) { }
        currentPointerId = null;

        const stepId = parseInt(card.getAttribute('data-step-id'), 10);

        if (isDragging) {
          isDragging = false;
          let droppedOnSlot = false;
          slots.forEach(slot => {
            const rect = slot.getBoundingClientRect();
            if (
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20
            ) {
              droppedOnSlot = true;
            }
            slot.classList.remove('drag-over');
          });

          card.classList.remove('is-dragging');
          card.style.transform = '';

          if (droppedOnSlot) {
            handleCardPlacement(card, stepId);
          } else {
            resetCard();
          }
        }
      };

      card.addEventListener('pointerup', handlePointerEnd);
      card.addEventListener('pointercancel', (e) => {
        if (currentPointerId === e.pointerId) {
          try { card.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          isDragging = false;
          resetCard();
        }
      });

      card.addEventListener('click', () => {
        if (isDragging) return;
        const stepId = parseInt(card.getAttribute('data-step-id'), 10);
        handleCardPlacement(card, stepId);
      });
    });
  }

  // ==========================================================================
  // JOGO 6: O JOGO DA VELHA DO PIP (Raciocínio & Parceria Amigável)
  // ==========================================================================
  renderTicTacToeGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[6][0];
    this.setGameHeader(
      "O Jogo da Velha do Pip",
      `Tema: ${data.themeName} • Você é ${data.playerName} (${data.playerSymbol}) e o Pip é ${data.pipName} (${data.pipSymbol})`,
      data.instruction
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="tictactoe-arena" role="region" aria-label="Partida de Jogo da Velha com o Pip">
        <!-- Barra de Placar e Indicador de Turno Amigável -->
        <div class="tictactoe-players-bar">
          <div class="tictactoe-player-card is-player active-turn" id="tttPlayerCard" title="Você joga com ${data.playerName}">
            <div class="tictactoe-player-avatar">${data.playerSymbol}</div>
            <div class="tictactoe-player-info">
              <span class="tictactoe-player-title">Você</span>
              <span class="tictactoe-player-sub" id="tttPlayerSub">Sua Vez!</span>
            </div>
          </div>

          <span class="tictactoe-vs-badge" aria-hidden="true">🤝</span>

          <div class="tictactoe-player-card is-pip" id="tttPipCard" title="Pip joga com ${data.pipName}">
            <div class="tictactoe-player-avatar">${data.pipSymbol}</div>
            <div class="tictactoe-player-info">
              <span class="tictactoe-player-title">Pip</span>
              <span class="tictactoe-player-sub" id="tttPipSub">${data.pipName}</span>
            </div>
          </div>
        </div>

        <div class="tictactoe-header-status" id="tttStatus" aria-live="polite">
          <span class="tictactoe-status-icon" id="tttStatusIcon">✨</span>
          <span id="tttStatusText">Sua vez! Toque em uma casa livre para colocar <strong>${data.playerName}</strong></span>
        </div>

        <div class="tictactoe-board" id="tttBoard" role="grid" aria-label="Tabuleiro de jogo da velha">
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => `
            <div class="tictactoe-cell" data-index="${idx}" role="gridcell" tabindex="0" aria-label="Casa ${idx + 1} vazia"></div>
          `).join('')}
        </div>

        <div class="tictactoe-tray">
          <span class="tictactoe-tray-label">Sua Peça:</span>
          <div class="tictactoe-piece-source" id="tttPieceSource" role="button" tabindex="0" aria-label="Sua peça ${data.playerName}: arraste ou toque direto no tabuleiro">
            ${data.playerSymbol}
          </div>
          <span class="tictactoe-tray-hint">Toque direto na casa para jogar</span>
        </div>
      </div>
    `;
    window.EmojiEnhancer?.enhance(stage);

    const playerCard = document.getElementById('tttPlayerCard');
    const pipCard = document.getElementById('tttPipCard');
    const playerSub = document.getElementById('tttPlayerSub');
    const pipSub = document.getElementById('tttPipSub');
    const statusBox = document.getElementById('tttStatus');
    const statusText = document.getElementById('tttStatusText');
    const statusIcon = document.getElementById('tttStatusIcon');
    const cells = Array.from(stage.querySelectorAll('.tictactoe-cell'));
    const pieceSource = document.getElementById('tttPieceSource');

    const board = Array(9).fill(null); // null, 'PLAYER', 'PIP'
    let isPlayerTurn = true;
    let isGameOver = false;

    const WINNING_COMBOS = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    const checkWin = (who) => {
      for (const combo of WINNING_COMBOS) {
        if (board[combo[0]] === who && board[combo[1]] === who && board[combo[2]] === who) {
          return combo;
        }
      }
      return null;
    };

    const isBoardFull = () => board.every(cell => cell !== null);

    // Finalização de rodada: Vitória ou Empate Encantado
    const finishRound = (type, winningCombo = null) => {
      if (isGameOver) return;
      isGameOver = true;

      // Desabilita interações
      cells.forEach(c => c.style.pointerEvents = 'none');
      if (pieceSource) pieceSource.style.pointerEvents = 'none';

      if (type === 'PLAYER_WIN') {
        if (winningCombo) {
          winningCombo.forEach(idx => cells[idx].classList.add('winning-cell'));
        }
        playerCard.classList.add('active-turn');
        pipCard.classList.remove('pip-turn');
        playerSub.textContent = 'Vencedor! 🌟';
        pipSub.textContent = 'Parabéns!';
        statusBox.classList.remove('pip-thinking');
        if (statusIcon) statusIcon.textContent = '🌟';
        statusText.innerHTML = `🌟 <strong>Parabéns!</strong> Você completou uma linha brilhante de ${data.playerName}!`;
        sound.playChord([261.63, 329.63, 392.00, 523.25]);

        speech.speak(`Parabéns! Você completou uma linha brilhante de ${data.playerName}!`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else if (type === 'PIP_WIN') {
        if (winningCombo) {
          winningCombo.forEach(idx => cells[idx].classList.add('winning-cell'));
        }
        playerCard.classList.remove('active-turn');
        pipCard.classList.add('pip-turn');
        pipSub.textContent = 'Vencedor! 🐶';
        playerSub.textContent = 'Bom jogo!';
        statusBox.classList.remove('pip-thinking');
        if (statusIcon) statusIcon.textContent = '🐶';
        statusText.innerHTML = `🐶 O Pip completou uma linha com carinho! Que partida linda!`;
        sound.playChord([261.63, 329.63, 392.00]);

        speech.speak(`Que jogada bonita do Pip! Vocês jogaram muito bem juntos!`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else if (type === 'DRAW') {
        playerCard.classList.remove('active-turn');
        pipCard.classList.remove('pip-turn');
        playerSub.textContent = 'Amigos ✨';
        pipSub.textContent = 'Amigos ✨';
        statusBox.classList.remove('pip-thinking');
        if (statusIcon) statusIcon.textContent = '🌈';
        statusText.innerHTML = `🌈 <strong>Empate Encantado!</strong> Que partida equilibrada e parceira!`;
        sound.playChord([261.63, 293.66, 329.63, 392.00]);

        speech.speak(`Empate Encantado! Que partida equilibrada e parceira entre você e o Pip!`, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      }
    };

    // Vez do Pip (IA amigável e empática)
    const pipTurn = () => {
      if (isGameOver) return;
      isPlayerTurn = false;
      playerCard.classList.remove('active-turn');
      pipCard.classList.add('pip-turn');
      playerSub.textContent = data.playerName;
      pipSub.textContent = 'Pensando...';
      statusBox.classList.add('pip-thinking');
      if (statusIcon) statusIcon.textContent = '🐶';
      statusText.innerHTML = `🐶 <em>Pip está escolhendo a casinha com carinho...</em>`;

      setTimeout(() => {
        if (isGameOver) return;

        const emptyIndices = [];
        board.forEach((val, idx) => {
          if (val === null) emptyIndices.push(idx);
        });

        if (emptyIndices.length === 0) {
          finishRound('DRAW');
          return;
        }

        // 1. Pip tenta completar sua linha se tiver 2 (60% chance)
        let chosenIdx = null;
        if (Math.random() < 0.6) {
          for (const idx of emptyIndices) {
            board[idx] = 'PIP';
            if (checkWin('PIP')) {
              chosenIdx = idx;
              board[idx] = null;
              break;
            }
            board[idx] = null;
          }
        }

        // 2. Pip bloqueia amigavelmente o jogador se ele for ganhar (50% chance)
        if (chosenIdx === null && Math.random() < 0.5) {
          for (const idx of emptyIndices) {
            board[idx] = 'PLAYER';
            if (checkWin('PLAYER')) {
              chosenIdx = idx;
              board[idx] = null;
              break;
            }
            board[idx] = null;
          }
        }

        // 3. Senão joga no centro ou escolhe aleatoriamente entre as casas livres
        if (chosenIdx === null) {
          if (emptyIndices.includes(4) && Math.random() < 0.5) {
            chosenIdx = 4;
          } else {
            chosenIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          }
        }

        // Aplica jogada do Pip
        board[chosenIdx] = 'PIP';
        const cell = cells[chosenIdx];
        cell.classList.add('occupied');
        cell.innerHTML = `<span class="cell-symbol">${data.pipSymbol}</span>`;
        cell.setAttribute('aria-label', `Casa ${chosenIdx + 1} ocupada pelo Pip`);
        window.EmojiEnhancer?.enhance(cell);

        sound.playTone(sound.pentatonicScale.D4, 0.35);

        const pipWinCombo = checkWin('PIP');
        if (pipWinCombo) {
          cells.forEach(c => c.style.pointerEvents = 'none');
          if (pieceSource) pieceSource.style.pointerEvents = 'none';
          // Pip completou linha: fala o nome da peça do Pip, aguarda o término completo,
          // aguarda 1 segundo de intervalo suave (delayAfterEnd: 1000) e aí entra a comemoração!
          speech.speak(data.pipName, {
            force: true,
            delayAfterEnd: 1000,
            onEnd: () => {
              finishRound('PIP_WIN', pipWinCombo);
            }
          });
          return;
        }

        if (isBoardFull()) {
          cells.forEach(c => c.style.pointerEvents = 'none');
          if (pieceSource) pieceSource.style.pointerEvents = 'none';
          speech.speak(data.pipName, {
            force: true,
            delayAfterEnd: 1000,
            onEnd: () => {
              finishRound('DRAW');
            }
          });
          return;
        }

        // Retorna a vez para o jogador após falar a peça do Pip + pausa suave
        speech.speak(data.pipName, {
          delayAfterEnd: 400,
          onEnd: () => {
            if (isGameOver) return;
            isPlayerTurn = true;
            playerCard.classList.add('active-turn');
            pipCard.classList.remove('pip-turn');
            playerSub.textContent = 'Sua Vez!';
            pipSub.textContent = data.pipName;
            statusBox.classList.remove('pip-thinking');
            if (statusIcon) statusIcon.textContent = '✨';
            statusText.innerHTML = `Sua vez! Toque em uma casa livre para colocar <strong>${data.playerName}</strong>`;
          }
        });
      }, 500);
    };

    // Aplicação da jogada do Jogador
    const applyPlayerMove = (idx) => {
      if (!isPlayerTurn || isGameOver) return;
      if (board[idx] !== null) {
        sound.playTone(sound.pentatonicScale.D4, 0.2);
        return;
      }

      board[idx] = 'PLAYER';
      const cell = cells[idx];
      cell.classList.add('occupied');
      cell.innerHTML = `<span class="cell-symbol">${data.playerSymbol}</span>`;
      cell.setAttribute('aria-label', `Casa ${idx + 1} ocupada por ${data.playerName}`);
      window.EmojiEnhancer?.enhance(cell);

      sound.playTone(sound.pentatonicScale.G4, 0.35);

      const playerWinCombo = checkWin('PLAYER');
      if (playerWinCombo) {
        cells.forEach(c => c.style.pointerEvents = 'none');
        if (pieceSource) pieceSource.style.pointerEvents = 'none';
        // Encadeamento suave: fala a peça do jogador, aguarda o término completo,
        // aguarda 1 segundo de intervalo suave e sem sobreposição (delayAfterEnd: 1000), e só então entra o elogio!
        speech.speak(data.playerName, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            finishRound('PLAYER_WIN', playerWinCombo);
          }
        });
        return;
      }

      if (isBoardFull()) {
        cells.forEach(c => c.style.pointerEvents = 'none');
        if (pieceSource) pieceSource.style.pointerEvents = 'none';
        speech.speak(data.playerName, {
          force: true,
          delayAfterEnd: 1000,
          onEnd: () => {
            finishRound('DRAW');
          }
        });
        return;
      }

      // Partida continua: fala a peça do jogador com calma, aguarda terminar + pausa suave, e aí passa a vez para o Pip
      isPlayerTurn = false;
      speech.speak(data.playerName, {
        delayAfterEnd: 500,
        onEnd: () => {
          if (!isGameOver) pipTurn();
        }
      });
    };

    // Suporte a Toque/Clique Direto nas Células
    cells.forEach((cell, idx) => {
      cell.addEventListener('click', () => {
        applyPlayerMove(idx);
      });
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          applyPlayerMove(idx);
        }
      });
    });

    // Suporte a Drag and Drop Sensorial com Pointer Events
    let isDraggingPiece = false;
    let startX = 0;
    let startY = 0;
    let currentPointerId = null;

    const resetPiece = () => {
      pieceSource.classList.add('returning');
      pieceSource.style.transform = 'translate3d(0, 0, 0)';
      setTimeout(() => {
        pieceSource.classList.remove('is-dragging', 'returning');
        pieceSource.style.transform = '';
      }, 260);
      cells.forEach(c => c.classList.remove('drag-over'));
    };

    pieceSource.addEventListener('pointerdown', (e) => {
      if (!isPlayerTurn || isGameOver) return;
      isDraggingPiece = false;
      startX = e.clientX;
      startY = e.clientY;
      currentPointerId = e.pointerId;
      pieceSource.classList.remove('returning');
      try { pieceSource.setPointerCapture(e.pointerId); } catch (_) { }
    });

    pieceSource.addEventListener('pointermove', (e) => {
      if (currentPointerId !== e.pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDraggingPiece && Math.hypot(dx, dy) > 6) {
        isDraggingPiece = true;
        pieceSource.classList.add('is-dragging');
      }

      if (isDraggingPiece) {
        pieceSource.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.12)`;

        let hitAny = false;
        cells.forEach((cell, idx) => {
          if (board[idx] !== null) return;
          const rect = cell.getBoundingClientRect();
          const inside = (
            e.clientX >= rect.left - 10 &&
            e.clientX <= rect.right + 10 &&
            e.clientY >= rect.top - 10 &&
            e.clientY <= rect.bottom + 10
          );
          if (inside && !hitAny) {
            cell.classList.add('drag-over');
            hitAny = true;
          } else {
            cell.classList.remove('drag-over');
          }
        });
      }
    });

    const handlePointerUp = (e) => {
      if (currentPointerId !== e.pointerId) return;
      try { pieceSource.releasePointerCapture(e.pointerId); } catch (_) { }
      currentPointerId = null;

      if (isDraggingPiece) {
        isDraggingPiece = false;
        let droppedIdx = -1;

        cells.forEach((cell, idx) => {
          if (board[idx] !== null) return;
          const rect = cell.getBoundingClientRect();
          if (
            e.clientX >= rect.left - 10 &&
            e.clientX <= rect.right + 10 &&
            e.clientY >= rect.top - 10 &&
            e.clientY <= rect.bottom + 10
          ) {
            droppedIdx = idx;
          }
          cell.classList.remove('drag-over');
        });

        pieceSource.classList.remove('is-dragging');
        pieceSource.style.transform = '';

        if (droppedIdx !== -1) {
          applyPlayerMove(droppedIdx);
        } else {
          resetPiece();
        }
      }
    };

    pieceSource.addEventListener('pointerup', handlePointerUp);
    pieceSource.addEventListener('pointercancel', () => {
      currentPointerId = null;
      isDraggingPiece = false;
      resetPiece();
    });

    // Clique na peça da bandeja como instrução de apoio
    pieceSource.addEventListener('click', () => {
      if (isDraggingPiece) return;
      speech.speak(`Sua peça é ${data.playerName}. Toque em uma casa vazia do tabuleiro para jogar!`);
    });
  }

  // ==========================================================================
  // JOGO 7: O JARDIM DA MEMÓRIA (Atenção, Foco & Pares Sensoriais)
  // ==========================================================================
  renderMemoryGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[7][0];

    // Progressão neuroinclusiva por rodada:
    // Rodada 1: 2 pares (4 cartas - acolhimento inicial)
    // Rodada 2: 3 pares (6 cartas - foco intermediário)
    // Rodada 3: 4 pares (8 cartas - consolidação estimulante)
    const pairCount = this.currentRound === 1 ? 2 : (this.currentRound === 2 ? 3 : 4);
    const selectedPairs = data.pairs.slice(0, pairCount);

    // Cria as cartas duplicadas (2 de cada par)
    let cardsDeck = [];
    selectedPairs.forEach(pair => {
      cardsDeck.push({ ...pair, cardInstanceId: `${pair.id}_1` });
      cardsDeck.push({ ...pair, cardInstanceId: `${pair.id}_2` });
    });

    // Embaralha as cartas
    for (let i = cardsDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]];
    }

    const totalCards = cardsDeck.length;

    this.setGameHeader(
      "O Jardim da Memória",
      `Tema: ${data.themeName} • Encontre os ${pairCount} pares mágicos`,
      "Toque nas cartinhas para desvendar os pares amigos do jardim!"
    );

    const stage = document.getElementById('gameActiveStage');
    stage.innerHTML = `
      <div class="memory-arena" role="region" aria-label="Jogo da Memória">
        <div class="memory-header-info">
          <div class="memory-stat-pill">
            <span>🌸</span> Tema: <strong>${data.themeName}</strong>
          </div>
          <div class="memory-stat-pill">
            <span>✨</span> Pares: <strong id="memoryPairsFound">0</strong> / <strong>${pairCount}</strong>
          </div>
        </div>

        <div class="memory-grid grid-${totalCards}" id="memoryGrid" role="grid" aria-label="Cartas do Jardim da Memória">
          ${cardsDeck.map((c, idx) => `
            <button class="memory-card" data-idx="${idx}" data-pair-id="${c.id}" type="button" aria-label="Carta ${idx + 1} fechada">
              <div class="memory-card-face memory-card-back">
                <span class="memory-card-back-icon">🌟</span>
              </div>
              <div class="memory-card-face memory-card-front">
                <div class="memory-card-symbol-wrap">
                  <span class="memory-card-symbol">${c.symbol}</span>
                </div>
                <span class="memory-card-name-tag">${c.name}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    window.EmojiEnhancer?.enhance(stage);

    const cardElements = Array.from(stage.querySelectorAll('.memory-card'));
    const pairsCounter = document.getElementById('memoryPairsFound');

    let flippedIndices = [];
    let matchedPairsCount = 0;
    let isLocked = false;

    cardElements.forEach((cardEl, idx) => {
      cardEl.addEventListener('click', () => {
        if (isLocked) return;
        if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        // Vira a carta
        cardEl.classList.add('flipped');
        cardEl.setAttribute('aria-label', `Carta aberta: ${cardsDeck[idx].name}`);
        flippedIndices.push(idx);

        sound.playTone(sound.pentatonicScale.C4 + flippedIndices.length * 60, 0.25);

        if (flippedIndices.length === 1) {
          // Primeira carta virada: fala o nome com suavidade
          speech.speak(cardsDeck[idx].name);
        } else if (flippedIndices.length === 2) {
          isLocked = true;
          const idx1 = flippedIndices[0];
          const idx2 = flippedIndices[1];
          const card1 = cardElements[idx1];
          const card2 = cardElements[idx2];
          const data1 = cardsDeck[idx1];
          const data2 = cardsDeck[idx2];

          if (data1.id === data2.id) {
            // Par Encontrado!
            matchedPairsCount++;
            if (pairsCounter) pairsCounter.textContent = matchedPairsCount;

            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.setAttribute('aria-label', `Par encontrado: ${data1.name}`);
            card2.setAttribute('aria-label', `Par encontrado: ${data2.name}`);

            sound.playChord([329.63, 392.00, 523.25]);

            if (matchedPairsCount === pairCount) {
              // Concluiu todos os pares da rodada!
              // Fala a 2ª carta do par, aguarda término completo da locução,
              // aguarda 1 segundo de intervalo suave (delayAfterEnd: 1000) e aí entra a celebração!
              speech.speak(data2.name, {
                force: true,
                delayAfterEnd: 1000,
                onEnd: () => {
                  sound.playChord([261.63, 329.63, 392.00, 523.25]);
                  speech.speak(`Parabéns! Você encontrou todos os pares de ${data.themeName}!`, {
                    force: true,
                    delayAfterEnd: 1000,
                    onEnd: () => {
                      this.updateRoundStep(this.currentRound + 1);
                      this.loadRound();
                    }
                  });
                }
              });
            } else {
              // Par intermediário: fala a 2ª carta e só libera o tabuleiro após a voz terminar + 400ms
              speech.speak(data2.name, {
                delayAfterEnd: 400,
                onEnd: () => {
                  flippedIndices = [];
                  isLocked = false;
                }
              });
            }
          } else {
            // Cartas diferentes: fala a 2ª carta, aguarda terminar + 650ms de pausa suave, e só então desvira!
            speech.speak(data2.name, {
              delayAfterEnd: 650,
              onEnd: () => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.setAttribute('aria-label', `Carta ${idx1 + 1} fechada`);
                card2.setAttribute('aria-label', `Carta ${idx2 + 1} fechada`);
                sound.playTone(sound.pentatonicScale.D4, 0.25);
                flippedIndices = [];
                isLocked = false;
              }
            });
          }
        }
      });
    });
  }

  // ==========================================================================
  // JOGO 8: O LABIRINTO DO PIP (Orientação Espacial & Resolução de Problemas)
  // ==========================================================================
  renderMazeGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[8][0];

    this.setGameHeader(
      "O Labirinto do Pip",
      `Tema: ${data.themeName} • Colete os itens e alcance a saída!`,
      data.instruction
    );

    const stage = document.getElementById('gameActiveStage');
    const rows = data.rows;
    const cols = data.cols;

    // Encontra a posição inicial do Pip (célula com valor 2) e do objetivo (valor 4)
    let pipR = 1, pipC = 1;
    let goalR = rows - 2, goalC = cols - 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (data.grid[r][c] === 2) { pipR = r; pipC = c; }
        if (data.grid[r][c] === 4) { goalR = r; goalC = c; }
      }
    }

    let remainingItems = data.items.map(item => ({ ...item }));
    const totalItems = remainingItems.length;
    let itemsCollected = 0;
    let isGameOver = false;

    stage.innerHTML = `
      <div class="maze-arena" role="region" aria-label="Labirinto do Pip">
        <div class="maze-status-bar">
          <div class="maze-status-pill">
            <span>🧭</span> <span>${data.themeName}</span>
          </div>
          <div class="maze-status-pill" id="mazeItemsPill">
            <span>⭐</span> Itens: <strong id="mazeItemsCount">0</strong> / <strong>${totalItems}</strong>
          </div>
        </div>

        <div class="maze-board-container" id="mazeBoard" style="grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);" role="grid" aria-label="Labirinto quadriculado">
        </div>

        <!-- Controles Direcionais de Apoio para Acessibilidade Tátil -->
        <div class="maze-dpad-container" aria-label="Controles direcionais de apoio">
          <div class="maze-dpad-row">
            <button class="maze-dpad-btn" id="mazeBtnNorth" type="button" aria-label="Caminhar para cima">⬆️</button>
          </div>
          <div class="maze-dpad-row">
            <button class="maze-dpad-btn" id="mazeBtnWest" type="button" aria-label="Caminhar para a esquerda">⬅️</button>
            <button class="maze-dpad-btn" id="mazeBtnSouth" type="button" aria-label="Caminhar para baixo">⬇️</button>
            <button class="maze-dpad-btn" id="mazeBtnEast" type="button" aria-label="Caminhar para a direita">➡️</button>
          </div>
          <span class="maze-hint-text">Arraste com o dedo ou mouse pelo caminho, ou use as setinhas</span>
        </div>
      </div>
    `;

    const boardEl = document.getElementById('mazeBoard');
    const itemsCountEl = document.getElementById('mazeItemsCount');

    // Função de renderização das células do labirinto
    const renderCells = () => {
      boardEl.innerHTML = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellEl = document.createElement('div');
          cellEl.className = 'maze-cell';
          cellEl.setAttribute('data-r', r);
          cellEl.setAttribute('data-c', c);
          cellEl.setAttribute('role', 'gridcell');

          const isWall = data.grid[r][c] === 1;
          const isPlayer = (r === pipR && c === pipC);
          const isGoal = (r === goalR && c === goalC);
          const itemAtCell = remainingItems.find(it => it.r === r && it.c === c);

          if (isWall) {
            cellEl.classList.add('is-wall');
            cellEl.setAttribute('aria-label', 'Parede do bosque');
          } else {
            cellEl.classList.add('is-path');
            const isNeighbor = Math.abs(r - pipR) + Math.abs(c - pipC) === 1;
            if (isNeighbor && !isGameOver) {
              cellEl.classList.add('is-valid-step');
              cellEl.setAttribute('title', 'Caminhe até aqui');
            }

            if (isPlayer) {
              cellEl.classList.add('is-player');
              cellEl.innerHTML = '🐶';
              cellEl.setAttribute('aria-label', 'Pip está aqui');
            } else if (itemAtCell) {
              cellEl.classList.add('is-item');
              cellEl.innerHTML = itemAtCell.icon;
              cellEl.setAttribute('aria-label', itemAtCell.name);
            } else if (isGoal) {
              cellEl.classList.add('is-goal');
              cellEl.innerHTML = data.goalIcon || '🏡';
              cellEl.setAttribute('aria-label', data.goalName || 'Chegada');
            }
          }

          cellEl.addEventListener('click', () => {
            if (isGameOver) return;
            if (isWall) {
              sound.playTone(sound.pentatonicScale.D4, 0.2);
              cellEl.classList.add('anim-gentle-reset');
              setTimeout(() => cellEl.classList.remove('anim-gentle-reset'), 400);
              return;
            }
            tryMoveTo(r, c);
          });

          boardEl.appendChild(cellEl);
        }
      }
      window.EmojiEnhancer?.enhance(boardEl);
    };

    // Lógica de Movimentação do Pip
    const tryMoveTo = (newR, newC) => {
      if (isGameOver) return;
      if (newR < 0 || newR >= rows || newC < 0 || newC >= cols) return;
      if (data.grid[newR][newC] === 1) {
        sound.playTone(sound.pentatonicScale.D4, 0.2);
        return;
      }

      const dist = Math.abs(newR - pipR) + Math.abs(newC - pipC);
      if (dist !== 1) {
        return;
      }

      pipR = newR;
      pipC = newC;
      sound.playTone(sound.pentatonicScale.G4, 0.15);

      const itemIdx = remainingItems.findIndex(it => it.r === pipR && it.c === pipC);
      if (itemIdx !== -1) {
        const collected = remainingItems.splice(itemIdx, 1)[0];
        itemsCollected++;
        if (itemsCountEl) itemsCountEl.textContent = itemsCollected;
        sound.playChord([329.63, 392.00, 523.25]);
        speech.speak(`Que maravilha! Você encontrou: ${collected.name}!`, { delayAfterEnd: 400 });
      }

      renderCells();

      if (pipR === goalR && pipC === goalC) {
        if (remainingItems.length > 0) {
          speech.speak("Você quase chegou! Que tal voltar um passinho e pegar as estrelas que faltam no caminho?", { delayAfterEnd: 500 });
        } else {
          isGameOver = true;
          sound.playChord([261.63, 329.63, 392.00, 523.25]);
          speech.speak(`Parabéns! Você completou o labirinto de ${data.themeName} com muita calma e alegria!`, {
            force: true,
            delayAfterEnd: 1000,
            onEnd: () => {
              this.updateRoundStep(this.currentRound + 1);
              this.loadRound();
            }
          });
        }
      }
    };

    // Suporte para arrastar com toque no celular/tablet ou mouse no PC
    let isTracing = false;
    let tracePointerId = null;

    const handlePointerDown = (e) => {
      if (isGameOver) return;
      isTracing = true;
      tracePointerId = e.pointerId;
      try { boardEl.setPointerCapture(e.pointerId); } catch (_) { }
    };

    const handlePointerMove = (e) => {
      if (!isTracing || tracePointerId !== e.pointerId || isGameOver) return;
      const elem = document.elementFromPoint(e.clientX, e.clientY);
      const cell = elem ? elem.closest('.maze-cell') : null;
      if (cell) {
        const r = parseInt(cell.getAttribute('data-r'), 10);
        const c = parseInt(cell.getAttribute('data-c'), 10);
        if (!isNaN(r) && !isNaN(c) && (r !== pipR || c !== pipC)) {
          const dist = Math.abs(r - pipR) + Math.abs(c - pipC);
          if (dist === 1 && data.grid[r][c] !== 1) {
            tryMoveTo(r, c);
          }
        }
      }
    };

    const handlePointerUp = (e) => {
      if (tracePointerId === e.pointerId) {
        isTracing = false;
        tracePointerId = null;
        try { boardEl.releasePointerCapture(e.pointerId); } catch (_) { }
      }
    };

    boardEl.addEventListener('pointerdown', handlePointerDown);
    boardEl.addEventListener('pointermove', handlePointerMove);
    boardEl.addEventListener('pointerup', handlePointerUp);
    boardEl.addEventListener('pointercancel', handlePointerUp);

    document.getElementById('mazeBtnNorth')?.addEventListener('click', () => tryMoveTo(pipR - 1, pipC));
    document.getElementById('mazeBtnSouth')?.addEventListener('click', () => tryMoveTo(pipR + 1, pipC));
    document.getElementById('mazeBtnWest')?.addEventListener('click', () => tryMoveTo(pipR, pipC - 1));
    document.getElementById('mazeBtnEast')?.addEventListener('click', () => tryMoveTo(pipR, pipC + 1));

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); tryMoveTo(pipR - 1, pipC); }
      else if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); tryMoveTo(pipR + 1, pipC); }
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); tryMoveTo(pipR, pipC - 1); }
      else if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); tryMoveTo(pipR, pipC + 1); }
    };
    window.addEventListener('keydown', handleKeyDown);
    this.activeCleanup = () => {
      window.removeEventListener('keydown', handleKeyDown);
      boardEl.removeEventListener('pointerdown', handlePointerDown);
      boardEl.removeEventListener('pointermove', handlePointerMove);
      boardEl.removeEventListener('pointerup', handlePointerUp);
      boardEl.removeEventListener('pointercancel', handlePointerUp);
    };

    renderCells();
  }

  // ==========================================================================
  // JOGO 9: O JOGO DE DAMAS DO PIP (Estratégia, Diagonais & Parceria Amigável)
  // ==========================================================================
  renderCheckersGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[9][0];

    this.setGameHeader(
      "O Jogo de Damas do Pip",
      `Tema: ${data.themeName} • Você é ${data.playerColorName} (${data.playerSymbol}) e o Pip é ${data.pipColorName} (${data.pipSymbol})`,
      data.instruction
    );

    const stage = document.getElementById('gameActiveStage');
    const boardSize = 6;

    let playerPieces = data.playerPieces.map((p, idx) => ({ id: `p_${idx}`, r: p.r, c: p.c, isCrowned: false }));
    let pipPieces = data.pipPieces.map((p, idx) => ({ id: `pip_${idx}`, r: p.r, c: p.c, isCrowned: false }));

    let selectedPiece = null;
    let validMovesForSelected = [];
    let isPlayerTurn = true;
    let isGameOver = false;
    let isAnimating = false;

    stage.innerHTML = `
      <div class="checkers-arena" role="region" aria-label="Partida de Damas com o Pip">
        <div class="checkers-players-bar">
          <div class="checkers-player-card is-player active-turn" id="chkPlayerCard" title="Você joga com ${data.playerColorName}">
            <div class="checkers-player-avatar">${data.playerSymbol}</div>
            <div class="checkers-player-info">
              <span class="checkers-player-title">Você</span>
              <span class="checkers-player-sub" id="chkPlayerSub">Sua Vez!</span>
            </div>
          </div>

          <span class="checkers-vs-badge" aria-hidden="true">🤝</span>

          <div class="checkers-player-card is-pip" id="chkPipCard" title="Pip joga com ${data.pipColorName}">
            <div class="checkers-player-avatar">${data.pipSymbol}</div>
            <div class="checkers-player-info">
              <span class="checkers-player-title">Pip</span>
              <span class="checkers-player-sub" id="chkPipSub">${data.pipColorName}</span>
            </div>
          </div>
        </div>

        <div class="checkers-status-bar" id="chkStatus" aria-live="polite">
          <span id="chkStatusIcon">✨</span>
          <span id="chkStatusText">Arraste sua peça ou toque nela para ver as diagonais!</span>
        </div>

        <div class="checkers-board" id="chkBoard" role="grid" aria-label="Tabuleiro de Damas 6x6">
        </div>
      </div>
    `;

    const boardEl = document.getElementById('chkBoard');
    const playerCard = document.getElementById('chkPlayerCard');
    const pipCard = document.getElementById('chkPipCard');
    const playerSub = document.getElementById('chkPlayerSub');
    const pipSub = document.getElementById('chkPipSub');
    const statusBox = document.getElementById('chkStatus');
    const statusText = document.getElementById('chkStatusText');
    const statusIcon = document.getElementById('chkStatusIcon');

    const getPieceAt = (r, c) => {
      const p = playerPieces.find(piece => piece.r === r && piece.c === c);
      if (p) return { owner: 'player', piece: p };
      const pip = pipPieces.find(piece => piece.r === r && piece.c === c);
      if (pip) return { owner: 'pip', piece: pip };
      return null;
    };

    const getValidMovesForPiece = (piece, isPlayer) => {
      const moves = [];
      const dirs = piece.isCrowned
        ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        : (isPlayer ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

      dirs.forEach(([dr, dc]) => {
        const nr = piece.r + dr;
        const nc = piece.c + dc;
        if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
          const target = getPieceAt(nr, nc);
          if (!target) {
            moves.push({ toR: nr, toC: nc, isJump: false, capturedPiece: null });
          } else if (target.owner !== (isPlayer ? 'player' : 'pip')) {
            const jumpR = nr + dr;
            const jumpC = nc + dc;
            if (jumpR >= 0 && jumpR < boardSize && jumpC >= 0 && jumpC < boardSize) {
              if (!getPieceAt(jumpR, jumpC)) {
                moves.push({ toR: jumpR, toC: jumpC, isJump: true, capturedPiece: target.piece });
              }
            }
          }
        }
      });
      return moves;
    };

    const renderBoard = () => {
      boardEl.innerHTML = '';
      for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
          const isDark = (r + c) % 2 === 1;
          const cellEl = document.createElement('div');
          cellEl.className = 'checkers-cell ' + (isDark ? 'cell-dark' : 'cell-light');
          cellEl.setAttribute('data-r', r);
          cellEl.setAttribute('data-c', c);
          cellEl.setAttribute('role', 'gridcell');

          const pieceData = getPieceAt(r, c);
          const validMove = validMovesForSelected.find(m => m.toR === r && m.toC === c);
          if (validMove && isPlayerTurn && !isGameOver && !isAnimating) {
            cellEl.classList.add('is-valid-target');
            cellEl.setAttribute('title', validMove.isJump ? 'Salto Mágico!' : 'Mover aqui');
            cellEl.addEventListener('click', () => {
              if (selectedPiece && !isAnimating) {
                animateAndExecuteMove(selectedPiece, validMove, true);
              }
            });
          }

          if (pieceData) {
            const pieceEl = document.createElement('div');
            pieceEl.className = 'checkers-piece ' + (pieceData.owner === 'player' ? 'piece-player' : 'piece-pip');
            pieceEl.setAttribute('data-piece-id', pieceData.piece.id);
            if (pieceData.piece.isCrowned) pieceEl.classList.add('is-crowned');
            if (selectedPiece && selectedPiece.id === pieceData.piece.id) pieceEl.classList.add('is-selected');

            pieceEl.innerHTML = pieceData.owner === 'player' ? data.playerSymbol : data.pipSymbol;
            pieceEl.setAttribute('aria-label', `${pieceData.owner === 'player' ? 'Sua peça' : 'Peça do Pip'}${pieceData.piece.isCrowned ? ' Dama Real' : ''}`);

            // Suporte a Arraste (Touch / Mouse Drag & Drop) na Peça do Jogador
            if (pieceData.owner === 'player' && isPlayerTurn && !isGameOver && !isAnimating) {
              let isDraggingPiece = false;
              let startX = 0;
              let startY = 0;
              let currentPointerId = null;

              pieceEl.addEventListener('pointerdown', (e) => {
                if (!isPlayerTurn || isGameOver || isAnimating) return;
                startX = e.clientX;
                startY = e.clientY;
                currentPointerId = e.pointerId;
                selectPlayerPiece(pieceData.piece);
                try { pieceEl.setPointerCapture(e.pointerId); } catch (_) { }
              });

              pieceEl.addEventListener('pointermove', (e) => {
                if (currentPointerId !== e.pointerId || isAnimating) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if (!isDraggingPiece && Math.hypot(dx, dy) > 6) {
                  isDraggingPiece = true;
                  pieceEl.classList.add('is-dragging');
                }

                if (isDraggingPiece) {
                  pieceEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.16)`;

                  const elem = document.elementFromPoint(e.clientX, e.clientY);
                  const hoveredCell = elem ? elem.closest('.checkers-cell') : null;
                  boardEl.querySelectorAll('.checkers-cell').forEach(c => c.classList.remove('drag-target-hover'));

                  if (hoveredCell && hoveredCell.classList.contains('is-valid-target')) {
                    hoveredCell.classList.add('drag-target-hover');
                  }
                }
              });

              const handlePointerUp = (e) => {
                if (currentPointerId !== e.pointerId) return;
                try { pieceEl.releasePointerCapture(e.pointerId); } catch (_) { }
                currentPointerId = null;
                boardEl.querySelectorAll('.checkers-cell').forEach(c => c.classList.remove('drag-target-hover'));

                if (isDraggingPiece) {
                  isDraggingPiece = false;
                  const dx = e.clientX - startX;
                  const dy = e.clientY - startY;

                  const elem = document.elementFromPoint(e.clientX, e.clientY);
                  const targetCell = elem ? elem.closest('.checkers-cell') : null;
                  let targetMove = null;

                  if (targetCell) {
                    const tr = parseInt(targetCell.getAttribute('data-r'), 10);
                    const tc = parseInt(targetCell.getAttribute('data-c'), 10);
                    targetMove = validMovesForSelected.find(m => m.toR === tr && m.toC === tc);
                  }

                  if (targetMove && !isAnimating) {
                    animateAndExecuteMove(pieceData.piece, targetMove, true, { dx, dy });
                  } else {
                    // Volta suavemente à casinha de origem
                    pieceEl.classList.remove('is-dragging');
                    pieceEl.classList.add('is-returning');
                    pieceEl.style.transform = '';
                    setTimeout(() => pieceEl.classList.remove('is-returning'), 280);
                  }
                }
              };

              pieceEl.addEventListener('pointerup', handlePointerUp);
              pieceEl.addEventListener('pointercancel', handlePointerUp);
            }

            cellEl.appendChild(pieceEl);
          }

          boardEl.appendChild(cellEl);
        }
      }
      window.EmojiEnhancer?.enhance(boardEl);
    };

    const selectPlayerPiece = (piece) => {
      if (!isPlayerTurn || isGameOver || isAnimating) return;
      selectedPiece = piece;
      validMovesForSelected = getValidMovesForPiece(piece, true);

      sound.playTone(sound.pentatonicScale.E4, 0.15);

      if (validMovesForSelected.length > 0) {
        statusText.innerHTML = `Arraste ou toque em uma das casas que estão <strong>brilhando</strong>! ✨`;
        statusIcon.textContent = '🌟';
      } else {
        statusText.innerHTML = `Essa pecinha está descansando. Escolha outra peça! 💛`;
        statusIcon.textContent = '🐾';
      }
      renderBoard();
    };

    // Animação de Deslocamento Suave e Orgânica (Damas Deslizando Naturalmente para Jogador e Pip)
    const animateAndExecuteMove = (piece, move, isPlayer, startFromDrag = null) => {
      if (isAnimating) return;
      isAnimating = true;

      // Limpa os brilhos das casas válidas para manter a visualização limpa durante a animação
      boardEl.querySelectorAll('.checkers-cell').forEach(c => {
        c.classList.remove('is-valid-target', 'drag-target-hover');
      });

      // Localiza a casinha de origem e a casinha de destino no DOM
      const fromCell = boardEl.querySelector(`.checkers-cell[data-r="${piece.r}"][data-c="${piece.c}"]`);
      const toCell = boardEl.querySelector(`.checkers-cell[data-r="${move.toR}"][data-c="${move.toC}"]`);
      const movingPieceEl = fromCell ? fromCell.querySelector('.checkers-piece') : null;

      if (fromCell && toCell && movingPieceEl) {
        movingPieceEl.classList.remove('is-selected', 'is-dragging', 'is-returning');

        const fromRect = fromCell.getBoundingClientRect();
        const toRect = toCell.getBoundingClientRect();
        const deltaX = toRect.left - fromRect.left;
        const deltaY = toRect.top - fromRect.top;

        if (startFromDrag) {
          movingPieceEl.style.transition = 'none';
          movingPieceEl.style.transform = `translate3d(${startFromDrag.dx}px, ${startFromDrag.dy}px, 0) scale(1.15)`;
          void movingPieceEl.offsetHeight; // Força recálculo
        } else {
          movingPieceEl.style.transition = 'none';
          movingPieceEl.style.transform = 'translate3d(0, 0, 0)';
          void movingPieceEl.offsetHeight; // Força recálculo
        }

        // Inicia o deslizamento suave e visível
        movingPieceEl.classList.add('is-animating-move');
        movingPieceEl.style.transition = 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
        movingPieceEl.style.setProperty('transform', `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.08)`, 'important');

        // No meio do caminho (230ms), se houver salto, a peça saltada ganha o brilho estelar
        if (move.isJump && move.capturedPiece) {
          setTimeout(() => {
            const capturedCell = boardEl.querySelector(`.checkers-cell[data-r="${move.capturedPiece.r}"][data-c="${move.capturedPiece.c}"]`);
            const capturedPieceEl = capturedCell ? capturedCell.querySelector('.checkers-piece') : null;
            if (capturedPieceEl) {
              capturedPieceEl.classList.add('piece-captured-anim');
            }
            sound.playChord([329.63, 440.00, 523.25]);
            if (isPlayer) {
              speech.speak("Salto mágico estelar! ✨", { delayAfterEnd: 300 });
            }
          }, 230);
        }

        // Aguarda a finalização natural do deslocamento (480ms)
        setTimeout(() => {
          movingPieceEl.classList.remove('is-animating-move');
          movingPieceEl.style.transform = '';
          movingPieceEl.style.transition = '';
          finishMoveExecution(piece, move, isPlayer);
        }, 480);
      } else {
        finishMoveExecution(piece, move, isPlayer);
      }
    };

    const finishMoveExecution = (piece, move, isPlayer) => {
      piece.r = move.toR;
      piece.c = move.toC;

      if (isPlayer) {
        if (piece.r === 0 && !piece.isCrowned) {
          piece.isCrowned = true;
          sound.playChord([392.00, 523.25, 659.25]);
          speech.speak("Sensacional! Sua peça se transformou em uma Dama Real! 👑", { delayAfterEnd: 400 });
        }

        if (move.isJump && move.capturedPiece) {
          pipPieces = pipPieces.filter(p => p.id !== move.capturedPiece.id);
        } else {
          sound.playTone(sound.pentatonicScale.G4, 0.2);
        }

        selectedPiece = null;
        validMovesForSelected = [];
        isAnimating = false;
        renderBoard();

        if (pipPieces.length === 0) {
          finishGameRound();
          return;
        }

        startPipTurn();
      } else {
        // Movimento do Pip finalizado
        if (piece.r === boardSize - 1 && !piece.isCrowned) {
          piece.isCrowned = true;
        }

        if (move.isJump && move.capturedPiece) {
          playerPieces = playerPieces.filter(p => p.id !== move.capturedPiece.id);
          sound.playChord([293.66, 369.99, 440.00]);
        } else {
          sound.playTone(sound.pentatonicScale.C4, 0.2);
        }

        isPlayerTurn = true;
        isAnimating = false;
        playerCard.classList.add('active-turn');
        pipCard.classList.remove('active-turn');
        playerSub.textContent = 'Sua Vez!';
        pipSub.textContent = data.pipColorName;
        statusBox.classList.remove('pip-thinking');
        statusText.innerHTML = `Sua vez! Arraste ou toque para avançar! ✨`;
        statusIcon.textContent = '⭐';

        renderBoard();

        if (playerPieces.length === 0) {
          speech.speak("Foi uma partida linda! Vamos respirar fundo e tentar novamente!", {
            force: true,
            delayAfterEnd: 800,
            onEnd: () => this.loadRound()
          });
        }
      }
    };

    const startPipTurn = () => {
      isPlayerTurn = false;
      playerCard.classList.remove('active-turn');
      pipCard.classList.add('active-turn');
      playerSub.textContent = 'Aguardando';
      pipSub.textContent = 'Pensando...';
      statusBox.classList.add('pip-thinking');
      statusText.innerHTML = `Pip está preparando um movimento carinhoso... 🐾`;
      statusIcon.textContent = '💭';

      setTimeout(() => {
        if (isGameOver) return;

        let allPipMoves = [];
        pipPieces.forEach(piece => {
          const moves = getValidMovesForPiece(piece, false);
          moves.forEach(m => allPipMoves.push({ piece, move: m }));
        });

        if (allPipMoves.length === 0) {
          finishGameRound();
          return;
        }

        const jumps = allPipMoves.filter(m => m.move.isJump);
        const chosen = jumps.length > 0
          ? jumps[Math.floor(Math.random() * jumps.length)]
          : allPipMoves[Math.floor(Math.random() * allPipMoves.length)];

        // O Pip também desliza sua peça de forma natural e visível!
        animateAndExecuteMove(chosen.piece, chosen.move, false);
      }, 950);
    };

    const finishGameRound = () => {
      if (isGameOver) return;
      isGameOver = true;

      playerCard.classList.add('active-turn');
      pipCard.classList.remove('active-turn');
      playerSub.textContent = 'Vencedor! 🌟';
      pipSub.textContent = 'Parabéns!';
      statusBox.classList.remove('pip-thinking');
      statusText.innerHTML = `Parabéns! Você e o Pip jogaram com muita sabedoria! 🎉`;
      statusIcon.textContent = '🏆';

      sound.playChord([261.63, 329.63, 392.00, 523.25]);
      speech.speak(`Parabéns! Você completou a rodada de Damas em ${data.themeName} com muita inteligência e parceria!`, {
        force: true,
        delayAfterEnd: 1000,
        onEnd: () => {
          this.updateRoundStep(this.currentRound + 1);
          this.loadRound();
        }
      });
    };

    renderBoard();
  }

  // Define títulos, instruções e apoio em voz
  setGameHeader(title, subtitle, narrationText) {
    const titleEl = document.getElementById('gameActiveTitle');
    const instructionBox = document.getElementById('gameInstructionText');
    if (titleEl) titleEl.textContent = title;
    if (instructionBox) {
      instructionBox.innerHTML = `
        <span>${subtitle}</span>
        <button class="btn-speak-inline" id="btnSpeakInstruction" title="Ouvir instrução">🔊</button>
      `;
      document.getElementById('btnSpeakInstruction').onclick = () => speech.speak(narrationText, true);
    }
    speech.speak(narrationText);
  }

  // ==========================================================================
  // O BAÚ MÁGICO DE RECOMPENSAS (Desbloqueio de 1 dos 52 Acessórios)
  // ==========================================================================
  triggerChestReward() {
    this.app.calmMode.setMissionState(false);
    this.saveActiveGameState(true);
    const rewardData = mascot.unlockNextReward();
    const item = rewardData.item;

    const overlay = document.getElementById('treasureChestOverlay');
    if (!overlay) return;

    sound.playChord([261.63, 329.63, 392.00, 523.25, 659.25]);
    overlay.classList.add('active');

    // Preenche dados da recompensa
    document.getElementById('chestRewardIcon').textContent = item.icon;
    document.getElementById('chestRewardName').textContent = item.name;
    document.getElementById('chestRewardCategory').textContent = `Categoria: ${item.category.toUpperCase()}`;
    document.getElementById('chestRewardDesc').textContent = item.desc;
    document.getElementById('chestTotalUnlockedText').textContent = `${rewardData.totalUnlocked} de 52 acessórios colecionados!`;

    const praiseList = [
      "Você explorou com paciência e dedicação!",
      "Que momento especial! Você aprendeu e conquistou!",
      "O Pip adorou jogar com você e ganhou um lindo presente!"
    ];
    const praise = praiseList[Math.floor(Math.random() * praiseList.length)];
    document.getElementById('chestPraiseText').textContent = praise;
    speech.speak(`${praise} Você desbloqueou o item: ${item.name}!`);

    // Botão equipar na hora
    document.getElementById('btnChestEquipNow').onclick = () => {
      this.clearActiveGameState();
      mascot.toggleEquip(item.id);
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
    };

    // Botão ir ao camarim
    document.getElementById('btnChestGoWardrobe').onclick = () => {
      this.clearActiveGameState();
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
      this.app.wardrobe.open();
    };

    // Botão voltar ao jardim
    document.getElementById('btnChestBackHub').onclick = () => {
      this.clearActiveGameState();
      overlay.classList.remove('active');
      this.app.showView('hub');
      mascot.render();
    };
  }

  // ==========================================================================
  // JOGO 10: O QUEBRA-CABEÇA ACOLHEDOR DO PIP (Percepção Visual & Encaixe Tátil)
  // ==========================================================================
  renderPuzzleGame() {
    const data = (this.activeRounds && this.activeRounds[this.currentRound - 1]) || GAME_POOLS[10][0];

    this.setGameHeader(
      "Quebra-Cabeça Acolhedor",
      `Tema: ${data.themeName} • Encaixe as peças encantadas!`,
      data.instruction
    );

    const stage = document.getElementById('gameActiveStage');
    const rows = data.rows;
    const cols = data.cols;
    const totalPieces = data.pieces.length;
    const pw = data.width / cols;
    const ph = data.height / rows;

    let placedPieces = new Set();
    let selectedPieceId = null;
    let isHintActive = true;
    let isGameOver = false;

    // Embaralha as peças para a bandeja inicial
    const shuffledPieces = [...data.pieces].sort(() => Math.random() - 0.5);

    stage.innerHTML = `
      <div class="puzzle-arena" role="region" aria-label="Quebra-Cabeça Acolhedor do Pip">
        <!-- Barra Superior de Informações -->
        <div class="puzzle-status-bar">
          <div class="puzzle-status-pill">
            <span>🧩</span> <span>${data.themeName}</span>
          </div>
          <div class="puzzle-status-pill">
            <span>⭐</span> Encaixadas: <strong id="puzzlePlacedCount">0</strong> / <strong>${totalPieces}</strong>
          </div>
          <button class="puzzle-btn-hint is-active" id="btnTogglePuzzleHint" type="button" aria-label="Alternar nitidez das pistas no tabuleiro">
            <span>👁️</span> <span>Pistas no Tabuleiro: Nítidas</span>
          </button>
        </div>

        <!-- Palco Central: Imagem Modelo de Referência + Tabuleiro de Encaixe -->
        <div class="puzzle-gameplay-stage">

          <!-- 1. Imagem Modelo de Referência (A imagem completa para a criança olhar e se guiar!) -->
          <div class="puzzle-reference-panel" id="puzzleReferencePanel">
            <div class="puzzle-reference-header">
              <span>🖼️</span>
              <span>Imagem de Referência:</span>
            </div>
            <div class="puzzle-reference-frame" title="Este é o desenho completo pronto! Olhe aqui para saber onde cada peça vai.">
              <div class="puzzle-reference-svg">
                <svg viewBox="0 0 ${data.width} ${data.height}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                  ${data.svgContent}
                </svg>
              </div>
              <div class="puzzle-reference-tag">
                <span>👀 Modelo Completo</span>
              </div>
            </div>
          </div>

          <!-- 2. Tabuleiro de Encaixe com as Silhuetas Nítidas -->
          <div class="puzzle-board-wrapper" id="puzzleBoardWrapper">
            <div class="puzzle-board-header">
              <span>🎯</span>
              <span>Seu Tabuleiro (Encaixe as peças aqui):</span>
            </div>

            <div class="puzzle-board" id="puzzleBoard" style="grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);" role="grid" aria-label="Quadro do Quebra-Cabeça">
              ${Array.from({ length: totalPieces }).map((_, slotId) => {
                const r = Math.floor(slotId / cols);
                const c = slotId % cols;
                const p = data.pieces.find(item => item.r === r && item.c === c);
                return `
                  <div class="puzzle-slot" data-slot-id="${slotId}" data-r="${r}" data-c="${c}" role="gridcell" aria-label="Espaço ${p ? p.name : slotId + 1}" title="Encaixe a peça: ${p ? p.name : ''}">
                    <!-- Desenho de referência nítido no próprio espaço -->
                    <div class="puzzle-slot-ghost" aria-hidden="true">
                      <svg viewBox="${c * pw} ${r * ph} ${pw} ${ph}" width="100%" height="100%" preserveAspectRatio="none">
                        ${data.svgContent}
                      </svg>
                    </div>
                    <!-- Badge com o mesmo ícone da peça para relacionamento imediato -->
                    <div class="puzzle-slot-badge" aria-hidden="true">${p ? p.icon : '✨'}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

        <!-- 3. Bandeja de Peças Soltas para Encaixar -->
        <div class="puzzle-tray-wrapper">
          <div class="puzzle-tray-title">
            <span>🎨</span>
            <span>Peças para encaixar (Arraste com o dedo/mouse ou clique para posicionar):</span>
          </div>
          <div class="puzzle-tray-pieces" id="puzzleTray">
            ${shuffledPieces.map(p => `
              <div class="puzzle-piece-card" data-piece-id="${p.id}" data-slot-id="${p.r * cols + p.c}" role="button" tabindex="0" aria-label="Peça: ${p.name}" title="${p.name}">
                <div class="puzzle-piece-svg-holder" aria-hidden="true">
                  <svg viewBox="${p.c * pw} ${p.r * ph} ${pw} ${ph}" width="100%" height="100%" preserveAspectRatio="none">
                    ${data.svgContent}
                  </svg>
                </div>
                <div class="puzzle-piece-badge" aria-hidden="true">${p.icon}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    const boardWrapperEl = document.getElementById('puzzleBoardWrapper');
    const boardEl = document.getElementById('puzzleBoard');
    const trayEl = document.getElementById('puzzleTray');
    const countEl = document.getElementById('puzzlePlacedCount');
    const hintBtn = document.getElementById('btnTogglePuzzleHint');

    // Alternar Pistas no Tabuleiro (Nítidas ou Suaves)
    hintBtn.onclick = () => {
      isHintActive = !isHintActive;
      hintBtn.classList.toggle('is-active', isHintActive);
      hintBtn.innerHTML = isHintActive
        ? '<span>👁️</span> <span>Pistas no Tabuleiro: Nítidas</span>'
        : '<span>👁️</span> <span>Pistas no Tabuleiro: Suaves</span>';
      boardEl.querySelectorAll('.puzzle-slot').forEach(slot => {
        slot.classList.toggle('hint-off', !isHintActive);
      });
      sound.playSoftTap();
    };

    // Função de Confetes Mágicos
    const spawnConfetti = (x, y) => {
      const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'puzzle-confetti-burst';
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 55;
        p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        stage.appendChild(p);
        setTimeout(() => p.remove(), 1200);
      }
    };

    // Função para localizar o slot sob o cursor ou sob o centro da peça com tolerância tátil
    const findSlotAtPoint = (clientX, clientY, cardEl) => {
      const cardRect = cardEl.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const slots = boardEl.querySelectorAll('.puzzle-slot');
      let bestSlot = null;
      let minDistance = Infinity;

      for (const slot of slots) {
        if (slot.classList.contains('is-filled')) continue;
        const sRect = slot.getBoundingClientRect();
        const sCenterX = sRect.left + sRect.width / 2;
        const sCenterY = sRect.top + sRect.height / 2;

        // Tolerância de encaixe ampla e acolhedora para crianças e toque mobile (36px)
        const pad = 36;
        const isCursorOver = (
          clientX >= sRect.left - pad && clientX <= sRect.right + pad &&
          clientY >= sRect.top - pad && clientY <= sRect.bottom + pad
        );
        const isCardOver = (
          cardCenterX >= sRect.left - pad && cardCenterX <= sRect.right + pad &&
          cardCenterY >= sRect.top - pad && cardCenterY <= sRect.bottom + pad
        );

        if (isCursorOver || isCardOver) {
          const dist = Math.hypot(cardCenterX - sCenterX, cardCenterY - sCenterY);
          if (dist < minDistance) {
            minDistance = dist;
            bestSlot = slot;
          }
        }
      }
      return bestSlot;
    };

    // Seleção de peça por toque/clique para suporte a motores finos
    const selectPiece = (pieceId, cardEl) => {
      if (selectedPieceId === pieceId) {
        // Desmarca
        selectedPieceId = null;
        cardEl.classList.remove('is-selected');
        boardEl.querySelectorAll('.puzzle-slot').forEach(s => s.classList.remove('is-target-hint'));
        return;
      }

      selectedPieceId = pieceId;
      trayEl.querySelectorAll('.puzzle-piece-card').forEach(c => c.classList.remove('is-selected'));
      cardEl.classList.add('is-selected');
      sound.playSoftTap();

      // Pista visual: faz o espacinho correspondente brilhar suavemente no tabuleiro
      boardEl.querySelectorAll('.puzzle-slot').forEach(s => s.classList.remove('is-target-hint'));
      const pieceData = data.pieces.find(p => p.id === pieceId);
      if (pieceData) {
        const expectedSlotId = pieceData.r * cols + pieceData.c;
        const targetSlot = boardEl.querySelector(`.puzzle-slot[data-slot-id="${expectedSlotId}"]`);
        if (targetSlot && !targetSlot.classList.contains('is-filled')) {
          targetSlot.classList.add('is-target-hint');
        }
      }
    };

    // Encaixe da Peça com Sucesso
    const snapPieceIntoSlot = (pieceId, slotEl) => {
      const pieceData = data.pieces.find(p => p.id === pieceId);
      if (!pieceData) return;

      placedPieces.add(pieceId);
      countEl.textContent = placedPieces.size;

      // Limpa estados ativos
      selectedPieceId = null;
      boardEl.querySelectorAll('.puzzle-slot').forEach(s => s.classList.remove('is-target-hint', 'is-hovered'));
      trayEl.querySelectorAll('.puzzle-piece-card').forEach(c => c.classList.remove('is-selected', 'is-dragging'));

      // Atualiza o slot com a peça renderizada nítida
      slotEl.classList.add('is-filled');
      slotEl.innerHTML = `
        <div class="puzzle-slot-content" aria-hidden="true">
          <svg viewBox="${pieceData.c * pw} ${pieceData.r * ph} ${pw} ${ph}" width="100%" height="100%" preserveAspectRatio="none">
            ${data.svgContent}
          </svg>
        </div>
      `;

      // Remove da bandeja
      const trayCard = trayEl.querySelector(`.puzzle-piece-card[data-piece-id="${pieceId}"]`);
      if (trayCard) trayCard.remove();

      // Som harmônico doce de encaixe
      sound.playChord([392.00, 523.25, 659.25]);

      // Confete festivo sobre o slot encaixado
      const rect = slotEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      spawnConfetti(rect.left + rect.width / 2 - stageRect.left, rect.top + rect.height / 2 - stageRect.top);

      // Verifica se completou o quebra-cabeça
      if (placedPieces.size === totalPieces) {
        isGameOver = true;
        boardWrapperEl.classList.add('puzzle-completed');
        sound.playTriumph();

        speech.speak(`Parabéns! Você completou o quebra-cabeça de ${data.themeName} com muita paciência e alegria!`, {
          force: true,
          delayAfterEnd: 2000,
          onEnd: () => {
            this.updateRoundStep(this.currentRound + 1);
            this.loadRound();
          }
        });
      } else {
        speech.speak(`Muito bem! Você encaixou: ${pieceData.name}!`, { delayAfterEnd: 300 });
      }
    };

    // Configuração dos Eventos de Arraste e Toque nas Peças
    const attachPieceEvents = () => {
      const pieceCards = trayEl.querySelectorAll('.puzzle-piece-card');

      pieceCards.forEach(card => {
        let isDragging = false;
        let startX = 0, startY = 0;
        let currentPointerId = null;

        const pieceId = parseInt(card.getAttribute('data-piece-id'), 10);
        const expectedSlotId = parseInt(card.getAttribute('data-slot-id'), 10);

        card.addEventListener('pointerdown', (e) => {
          if (isGameOver) return;
          startX = e.clientX;
          startY = e.clientY;
          currentPointerId = e.pointerId;
          try { card.setPointerCapture(e.pointerId); } catch (_) { }
        });

        card.addEventListener('pointermove', (e) => {
          if (currentPointerId !== e.pointerId || isGameOver) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;

          if (!isDragging && Math.hypot(dx, dy) > 6) {
            isDragging = true;
            card.classList.add('is-dragging');
            sound.playSoftTap();
          }

          if (isDragging) {
            card.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.15)`;

            const hoveredSlot = findSlotAtPoint(e.clientX, e.clientY, card);
            boardEl.querySelectorAll('.puzzle-slot').forEach(s => s.classList.remove('is-hovered'));

            if (hoveredSlot && !hoveredSlot.classList.contains('is-filled')) {
              hoveredSlot.classList.add('is-hovered');
            }
          }
        });

        const handlePointerUp = (e) => {
          if (currentPointerId !== e.pointerId) return;
          try { card.releasePointerCapture(e.pointerId); } catch (_) { }
          currentPointerId = null;
          boardEl.querySelectorAll('.puzzle-slot').forEach(s => s.classList.remove('is-hovered'));

          if (isDragging) {
            isDragging = false;
            card.classList.remove('is-dragging');

            const droppedSlot = findSlotAtPoint(e.clientX, e.clientY, card);
            if (droppedSlot && !droppedSlot.classList.contains('is-filled')) {
              const sId = parseInt(droppedSlot.getAttribute('data-slot-id'), 10);
              if (sId === expectedSlotId) {
                snapPieceIntoSlot(pieceId, droppedSlot);
                return;
              }
            }

            // Se soltou fora ou no slot incorreto: retorno suave sem punição
            card.classList.add('is-returning');
            card.style.transform = '';
            sound.playBoing();
            speech.speak("Quase lá! Procure o espacinho com o mesmo desenho!", { delayAfterEnd: 200 });
            setTimeout(() => card.classList.remove('is-returning'), 320);
          } else {
            // Clique simples / toque para selecionar
            selectPiece(pieceId, card);
          }
        };

        card.addEventListener('pointerup', handlePointerUp);
        card.addEventListener('pointercancel', handlePointerUp);
      });
    };

    // Eventos de clique nos slots para apoio ao toque simples e acessibilidade
    const attachSlotEvents = () => {
      const slots = boardEl.querySelectorAll('.puzzle-slot');
      slots.forEach(slot => {
        const handleSlotAction = () => {
          if (isGameOver || slot.classList.contains('is-filled')) return;
          const slotId = parseInt(slot.getAttribute('data-slot-id'), 10);

          if (selectedPieceId !== null) {
            const pieceData = data.pieces.find(p => p.id === selectedPieceId);
            const expectedSlotId = pieceData ? (pieceData.r * cols + pieceData.c) : -1;

            if (slotId === expectedSlotId) {
              snapPieceIntoSlot(selectedPieceId, slot);
            } else {
              sound.playSoftTap();
              speech.speak("Esta peça encaixa em outro lugar! Observe o desenho da pista.", { delayAfterEnd: 200 });
            }
          } else {
            // Nenhuma peça selecionada ainda: destaca a peça correspondente na bandeja
            const matchingCard = trayEl.querySelector(`.puzzle-piece-card[data-slot-id="${slotId}"]`);
            if (matchingCard) {
              const pId = parseInt(matchingCard.getAttribute('data-piece-id'), 10);
              selectPiece(pId, matchingCard);
            }
          }
        };

        slot.addEventListener('click', handleSlotAction);
      });
    };

    attachPieceEvents();
    attachSlotEvents();

    // Narração inicial acolhedora da instrução
    speech.speak(`Fase 10: Quebra-Cabeça Acolhedor. ${data.instruction}`, { delayAfterEnd: 600 });
  }
}
