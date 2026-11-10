import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Setup minimal browser globals for browser-oriented modules
if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] ?? null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
  };
}

if (typeof globalThis.window === 'undefined') {
  globalThis.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    localStorage: globalThis.localStorage
  };
}

const { GAME_POOLS, EducationalGamesManager } = await import('../../js/educationalGames.js');

describe('Unit Harness: Jogos Educativos e Arquitetura Pedagógica (10 Módulos)', () => {

  it('deve disponibilizar todos os 10 módulos em GAME_POOLS', () => {
    for (let id = 1; id <= 10; id++) {
      assert.ok(GAME_POOLS[id], `Módulo ${id} deve estar presente em GAME_POOLS`);
      assert.ok(Array.isArray(GAME_POOLS[id]), `Módulo ${id} deve conter array de desafios`);
      assert.ok(GAME_POOLS[id].length > 0, `Módulo ${id} deve conter pelo menos 1 cenário`);
    }
  });

  describe('Jogo 1: O Espelho das Emoções (Socioemocional)', () => {
    it('todos os cenários devem conter cenário, opções, resposta correta e feedback acolhedor', () => {
      const pool = GAME_POOLS[1];
      assert.ok(pool.length >= 5, 'Deve ter variedade mínima de cenários');
      for (const item of pool) {
        assert.ok(typeof item.scenario === 'string' && item.scenario.length > 10, 'Cenário deve ter descrição clara');
        assert.ok(item.icon, 'Deve ter ícone');
        assert.ok(item.correctId, 'Deve ter correctId');
        assert.ok(item.correctLabel, 'Deve ter correctLabel');
        assert.ok(Array.isArray(item.options) && item.options.length >= 3, 'Deve conter pelo menos 3 opções');
        assert.ok(item.options.some(opt => opt.id === item.correctId), 'A resposta correta deve estar entre as opções');
        assert.ok(typeof item.feedback === 'string' && item.feedback.length > 5, 'Feedback acolhedor obrigatório');
      }
    });
  });

  describe('Jogo 2: Construtor de Palavrinhas (Consciência Fonológica)', () => {
    it('cada palavra deve ter palavra completa, imagem, sílabas e letras correspondentes', () => {
      const pool = GAME_POOLS[2];
      assert.ok(pool.length >= 10, 'Deve ter pelo menos 10 palavras para variedade');
      for (const item of pool) {
        assert.ok(item.word, 'Deve definir a palavra');
        assert.ok(item.icon, 'Deve definir o ícone');
        assert.ok(item.hint, 'Deve ter dica pedagógica');
        const upperWord = item.word.toUpperCase();
        if (item.letters) {
          const joined = item.letters.join('').toUpperCase();
          assert.equal(joined, upperWord, `As letras de ${item.word} devem compor a palavra corretamente`);
        }
      }
    });
  });

  describe('Jogo 3: Balança das Quantidades (Matemática Concreta)', () => {
    it('deve ter target numérico válido e itens para equilíbrio', () => {
      const pool = GAME_POOLS[3];
      for (const item of pool) {
        assert.ok(typeof item.target === 'number' && item.target > 0, 'Target deve ser número positivo');
        assert.ok(item.name, 'Deve ter nome do item');
        assert.ok(item.icon, 'Deve ter ícone visual');
      }
    });
  });

  describe('Jogo 4: O Trem dos Padrões (Funções Executivas & Sequenciamento)', () => {
    it('deve ter sequência lógica e resposta correta identificada', () => {
      const pool = GAME_POOLS[4];
      for (const item of pool) {
        assert.ok(Array.isArray(item.sequence) && item.sequence.length >= 3, 'Sequência deve ter pelo menos 3 elementos');
        assert.ok(item.correct, 'Deve ter resposta correta');
        assert.ok(Array.isArray(item.options), 'Deve ter opções de escolha');
        assert.ok(item.options.includes(item.correct), 'A resposta correta deve estar nas opções');
      }
    });
  });

  describe('Jogo 5: A Rotina Encantada (Planejamento & Autonomia)', () => {
    it('deve conter passos cronológicos ordenados com ilustrações', () => {
      const pool = GAME_POOLS[5];
      for (const routine of pool) {
        assert.ok(routine.theme, 'Rotina deve ter tema');
        assert.ok(Array.isArray(routine.steps) && routine.steps.length >= 3, 'Rotina deve ter pelo menos 3 passos');
        for (let i = 0; i < routine.steps.length; i++) {
          const step = routine.steps[i];
          assert.ok(step.id, 'Passo deve ter id');
          assert.ok(step.text, 'Passo deve ter texto descritivo');
          assert.ok(step.icon, 'Passo deve ter ícone');
        }
      }
    });
  });

  describe('Jogos de Parceria e Estratégia (Jogos 6, 7, 8, 9, 10)', () => {
    it('Jogo 6 (Velha): deve possuir tema, símbolos amigáveis e instruções acolhedoras', () => {
      const pool = GAME_POOLS[6];
      assert.ok(pool.length > 0);
      for (const item of pool) {
        assert.ok(item.themeName, 'Deve ter themeName');
        assert.ok(item.playerSymbol, 'Deve ter símbolo do jogador');
        assert.ok(item.pipSymbol, 'Deve ter símbolo do Pip');
        assert.ok(item.instruction, 'Deve ter instrução de jogo');
      }
    });

    it('Jogo 7 (Memória): pares de cartas devem ter símbolos e nomes correspondentes', () => {
      const pool = GAME_POOLS[7];
      for (const theme of pool) {
        assert.ok(theme.themeName, 'Tema de memória deve ter themeName');
        assert.ok(Array.isArray(theme.pairs) && theme.pairs.length >= 3, 'Tema deve ter pelo menos 3 pares');
        for (const pair of theme.pairs) {
          assert.ok(pair.id, 'Par deve ter id');
          assert.ok(pair.symbol, 'Par deve ter símbolo');
          assert.ok(pair.name, 'Par deve ter nome descritivo');
        }
      }
    });

    it('Jogo 8 (Labirinto): labirintos devem ter grade com linhas e colunas, itens e casinha objetivo', () => {
      const pool = GAME_POOLS[8];
      for (const maze of pool) {
        assert.ok(maze.themeName, 'Labirinto deve ter themeName');
        assert.ok(maze.rows >= 5 && maze.cols >= 5, 'Labirinto deve ter pelo menos 5x5');
        assert.ok(Array.isArray(maze.grid) && maze.grid.length === maze.rows, 'Grade deve corresponder a rows');
        assert.ok(maze.goalIcon, 'Deve ter ícone objetivo');
      }
    });

    it('Jogo 9 (Damas Acolhedoras): deve conter configuração de peças do jogador e do Pip', () => {
      const pool = GAME_POOLS[9];
      for (const board of pool) {
        assert.ok(board.themeName, 'Deve ter themeName');
        assert.ok(board.playerSymbol, 'Deve ter símbolo do jogador');
        assert.ok(board.pipSymbol, 'Deve ter símbolo do Pip');
        assert.ok(Array.isArray(board.playerPieces) && board.playerPieces.length > 0, 'Deve ter peças do jogador');
        assert.ok(Array.isArray(board.pipPieces) && board.pipPieces.length > 0, 'Deve ter peças do Pip');
      }
    });

    it('Jogo 10 (Quebra-Cabeça): deve conter peças com dicas e SVG ilustrado de suporte', () => {
      const pool = GAME_POOLS[10];
      for (const puzzle of pool) {
        assert.ok(puzzle.themeName, 'Quebra-cabeça deve ter themeName');
        assert.ok(puzzle.instruction, 'Deve ter instrução');
        assert.ok(Array.isArray(puzzle.pieces) && puzzle.pieces.length >= 4, 'Deve conter pelo menos 4 peças');
        assert.ok(puzzle.svgContent && puzzle.svgContent.length > 50, 'Deve conter ilustração SVG do cenário');
        for (const p of puzzle.pieces) {
          assert.ok(typeof p.id === 'number', 'Peça deve ter id');
          assert.ok(p.name, 'Peça deve ter nome');
          assert.ok(p.hint, 'Peça deve ter dica acolhedora');
        }
      }
    });
  });

  describe('EducationalGamesManager Class', () => {
    it('deve instanciar EducationalGamesManager sem falhas', () => {
      const manager = new EducationalGamesManager();
      assert.ok(manager, 'Manager deve ser instanciado');
      assert.equal(typeof manager.startGame, 'function', 'Deve expor método startGame');
      assert.equal(typeof manager.loadRound, 'function', 'Deve expor método loadRound');
    });
  });
});
