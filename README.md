# StartKids: Plataforma Educacional Neuroinclusiva

Plataforma web progressiva (PWA) desenvolvida para proporcionar experiências de aprendizagem acessíveis, cognitivamente confortáveis e sensorialmente equilibradas para crianças neurodivergentes, com ênfase no atendimento a perfis com Transtorno do Espectro Autista (TEA), TDAH, Dislexia e sensibilidades sensoriais. O projeto está alinhado ao Objetivo de Desenvolvimento Sustentável 4 (ODS 4: Educação de Qualidade) da Organização das Nações Unidas (ONU).

---

## 1. Visão Geral e Propósito Técnico-Pedagógico

Aplicações convencionais de tecnologia educacional infantil frequentemente recorrem a hiperestímulos: paletas de cores saturadas, cronômetros punitivos, efeitos sonoros estridentes de alta frequência e interfaces carregadas de elementos competitivos. Embora atraentes para perfis neurotípicos padronizados, tais padrões atuam como barreiras severas para crianças com sobrecarga sensorial, disfunções executivas ou dificuldades no processamento visual.

O StartKids foi concebido a partir de princípios de Ergonomia Cognitiva e Design Universal para a Aprendizagem:

- **Previsibilidade e Redução de Ansiedade**: A interface não possui telas de "Game Over", penalidades ou perdas de pontos. O erro é tratado como uma hipótese experimental em reformulação, acompanhado de pistas contextuais graduais.
- **Isolamento de Estímulos**: Cada cenário apresenta apenas as informações estritamente necessárias para a tomada de decisão pedagógica, mitigando o esforço atencional concorrente.
- **Acomodação Auditiva e Temporal**: Feedbacks sonoros e de voz sintetizada respeitam janelas de processamento cerebral. Após qualquer leitura guiada ou explicação, o sistema garante uma pausa de consolidação antes de qualquer transição de tela.
- **Dinâmica de Autonomia**: Um mascote guia (Pip) acompanha as jornadas, reforçando o vínculo afetivo e fornecendo reforço positivo consistente.

---

## 2. Fundamentos de Acessibilidade e Ergonomia Sensorial

### 2.1 Teoria Cromática "Deep Calm"
A paleta visual adota valores de reflectância e saturação calculados para mitigar a fadiga ocular e o estresse fotossensível:
- **Azul Ardósia e Noturno (#162438, #2B4263)**: Fornece estabilidade e âncora focal com contraste seguro sem a dureza do preto absoluto.
- **Areia e Bege Suave (#C49E74, #F4EFEA)**: Substitui o fundo branco puro (#FFFFFF), atenuando reflexos intensos e desconfortos visuais comuns em salas iluminadas.
- **Creme de Fundo (#FAF8F5)**: Proporciona uma superfície neutra, garantindo conformidade com os padrões WCAG AAA para relação de contraste em elementos textuais.

### 2.2 Tipografia Lexend e Âncora Anti-Espelhamento
A aplicação utiliza a família tipográfica Lexend, projetada por especialistas para reduzir o efeito de aglomeração visual (*visual crowding*) e acelerar a fluência leitora em pessoas com dislexia:
- **Espaçamento Intercaractere e Entrelinha Calibrados**: Maior distanciamento entre glifos para evitar a fusão perceptual de letras contíguas.
- **Base Anti-Espelhamento**: Letras móveis contam com microindicadores de sustentação na base inferior, minimizando rotações e inversões involuntárias frequentes (como entre b e d, p e q, n e u).
- **Controle de Caixa**: O usuário pode alternar dinamicamente entre letras em caixa alta (bastão maiúscula) e caixa baixa conforme o nível de letramento.

### 2.3 Engenharia de Voz Angelical e Síntese de Fala Acessível
Implementada sobre a Web Speech API (`SpeechSynthesis`) através de um motor dedicado (`SpeechEngine`):
- **Curadoria de Voz**: Prioriza motores neurais e naturais femininos em português brasileiro (`Microsoft Francisca Online Natural`, `Microsoft Thalita Online Natural`, `Google português do Brasil`, `Luciana Siri`), eliminando timbres metálicos ou agressivos.
- **Parametrização Acústica**: Taxa de elocução reduzida para 0.88x (ritmo compassado de leitura compartilhada) e pitch ajustado para 1.15x (timbre suave e acolhedor).
- **Pausa Pós-Locução de 2000ms**: No encerramento de cada resposta ou explicação, o sistema aguarda o evento nativo de término (`utterance.onend`) e aplica um atraso intencional de 2 segundos antes de mudar de exercício, respeitando o tempo de absorção cognitiva da criança.
- **Resiliência de Execução**: Proteção de referência contra coleta prematura de lixo (Garbage Collection) no Chromium e temporizador de segurança heurístico para prevenção de bloqueio de interface.

### 2.4 Síntese Sonora Pentatônica
Implementada via Web Audio API (`AudioEngine`):
- O sistema dispensa arquivos pesados de áudio gravado, sintetizando ondas sonoras diretamente no hardware do cliente via osciladores em escala pentatônica maior.
- A escala pentatônica elimina intervalos dissonantes (segundas menores e trítonos), garantindo que qualquer combinação acidental de notas resulte em harmonias relaxantes e confortáveis.

---

## 3. Arquitetura de Software

O sistema adota uma arquitetura em camadas desacopladas, priorizando carregamento rápido, resiliência a falhas de conectividade e baixo consumo de memória.

```
                    +-------------------------------------+
                    |       Cliente Web / PWA (SPA)       |
                    |  - Módulos ES6 (App, Jogos, Sons)   |
                    |  - Service Worker (Cache Offline)   |
                    |  - Web Audio API & Web Speech API   |
                    +-------------------+-----------------+
                                        |
                             HTTPS / JSON REST API
                                        |
                    +-------------------v-----------------+
                    |     Servidor Node.js / Express      |
                    |  - Rate Limiting e Sanitização      |
                    |  - Segurança HTTP (Headers / CORS)  |
                    |  - Autenticação com Criptografia    |
                    |  - Auditoria e Telemetria de Logs   |
                    +-------------------+-----------------+
                                        |
                          Conexão Pool TCP (SSL Seguro)
                                        |
                    +-------------------v-----------------+
                    |       PostgreSQL Gerenciado         |
                    |  - users (Credenciais Criptografadas)|
                    |  - user_progression (JSONB Dinâmico)|
                    |  - audit_logs (Eventos e Segurança) |
                    +-------------------------------------+
```

### 3.1 Camada Frontend
- **Abordagem Vanilla e Modularidade**: Desenvolvido em JavaScript ES6 nativo, HTML5 semântico e CSS3 puro via variáveis (CSS Custom Properties). Elimina sobrecargas de frameworks densos, resultando em inicialização instantânea mesmo em dispositivos escolares de baixa potência.
- **Tratamento Híbrido de Entrada e Arraste Natural (Pointer Events)**: Todas as mecânicas interativas (como arrastar peças de damas, traçar caminhos no labirinto ou equilibrar balanças) contam com suporte unificado a eventos de mouse, caneta stylus e toque em tela capacitiva (`pointerdown`, `pointermove`, `pointerup` com `setPointerCapture`), oferecendo também alternativa de clique único acessível e animações de deslocamento orgânicas.
- **Regras de Negócio Acolhedoras no Acesso**: Validação imediata de credenciais (mínimo de 4 dígitos, sanitização automática de espaços e case-insensitive) e proteção com limitador acolhedor de 5 tentativas consecutivas com pausa guiada para respiração relaxante.
- **PWA (Progressive Web App) e Instalação Descomplicada**: Implementação com `manifest.json` e Service Worker (`sw.js`). Apresenta opção centralizada de instalação rápida na própria tela de login, orientações específicas para iOS Safari, Android e navegadores Desktop, além de ocultação inteligente quando já operando em modo standalone de tela cheia.

### 3.2 Camada Backend
- **Node.js e Express**: API RESTful leve e determinística.
- **Segurança Defensiva**:
  - `Rate Limiting`: Limitador de requisições em memória para prevenção de ataques de força bruta em endpoints críticos (`/api/auth/login` e `/api/auth/register`).
  - `Headers de Segurança`: Políticas de proteção contra clickjacking (`X-Frame-Options: SAMEORIGIN`), prevenção de sniffing de MIME type (`X-Content-Type-Options: nosniff`) e mitigação de XSS.
  - `Criptografia Forte`: Geração de hashes unidirecionais com `bcryptjs` utilizando salt rounds para armazenamento seguro de senhas.
  - `Controle de Payload`: Limitação estrita do tamanho do corpo das requisições a 100 KB para prevenção de indisponibilidade por esgotamento de memória.

### 3.3 Camada de Dados e Persistência Resiliente
- **PostgreSQL**: Utilizado como banco de dados primário relacional através do driver `pg` com pool de conexões.
  - Tabela `users`: Identificação de usuários, credenciais e timestamps de criação.
  - Tabela `user_progression`: Armazenamento do progresso, baús abertos, estrelas e customizações do personagem via coluna flexível `JSONB`.
  - Tabela `audit_logs`: Registro cronológico de acessos, criação de contas e eventuais anomalias operacionais para governança.
- **Fallback Local Offline**: Caso o servidor remoto esteja indisponível ou o cliente opere sem conexão de rede, o sistema redireciona a gravação de estado para um mecanismo de persistência local resiliente, assegurando que nenhuma criança perca seus itens conquistados.

---

## 4. Módulos Educativos Disponíveis

A plataforma disponibiliza dez módulos de atividades estruturadas com progressão pedagógica:

1. **O Espelho das Emoções (Competências Socioemocionais)**:
   Apresentação de cenários cotidianos vivenciados pelo mascote Pip para identificação e nomeação de estados afetivos. Cada cenário conta com texto acessível em destaque, botão de narração em áudio e feedback falado explicativo ao acertar, seguido de 2 segundos de pausa para consolidação emocional.
2. **Construtor de Palavrinhas (Consciência Fonológica)**:
   Atividade de associação fonema-grafema onde a criança constrói palavras significativas através de letras móveis com pistas visuais e retorno sonoro individual para cada letra posicionada.
3. **Balança das Quantidades (Raciocínio Concreto e Equidade)**:
   Exploração de noções de equivalência, adição e subtração através de uma balança de dois pratos responsiva em física de inclinação angular.
4. **O Trem dos Padrões (Funções Executivas e Sequenciamento)**:
   Composição de vagões ferroviários seguindo padrões lógicos de cores, formas e ritmo de alternância, fortalecendo a memória de trabalho e a antecipação cognitiva.
5. **A Rotina Encantada (Planejamento e Autonomia)**:
   Sequenciamento temporal de ações cotidianas (acordar, higiene, alimentação, brincadeiras e descanso), promovendo organização estruturada e segurança emocional.
6. **O Jogo da Velha do Pip (Raciocínio & Parceria Amigável)**:
   Partidas lúdicas em tabuleiro de parceria com o mascote Pip, com suporte a interação por toque, arraste ou cliques simples, sem contadores regressivos e com reforço positivo a cada jogada.
7. **O Jardim da Memória (Atenção, Foco & Pares Sensoriais)**:
   Atividade de correspondência e memória de trabalho com ilustrações reconfortantes (amigos da natureza, pomar saudável e elementos celestes), promovendo concentração e foco visual em ambiente livre de frustração.
8. **O Labirinto do Pip (Orientação Espacial & Resolução de Problemas)**:
   Navegação por caminhos com rastreamento contínuo por toque ou mouse, permitindo coletar itens mágicos e alcançar o objetivo com traçado suave e acolhedor.
9. **O Jogo de Damas do Pip (Estratégia, Diagonais & Parceria Amigável)**:
   Mecânica adaptada de damas focada no aprendizado de diagonais e cooperação lúdica, equipada com inteligência acolhedora do Pip, suporte a arrastar peças e animações de movimento orgânicas.
10. **O Quebra-Cabeça Acolhedor do Pip (Percepção Visual & Encaixe Tátil)**:
    Montagem de cenários ilustrados encantadores com suporte a arrastar e soltar suave via Pointer Events ou clique simples, pistas visuais com silhueta fantasma de apoio, efeito magnético de encaixe (*snap*), celebração com confetes e ausência de penalidades.

---

## 5. Estrutura do Repositório

```
.
|-- api/                       # Função serverless para execução na borda (Vercel)
|   +-- index.js
|-- css/                       # Folhas de estilo modulares e variáveis de design
|   |-- animations.css         # Microinterações e animações visuais fluidas
|   |-- games-phase6-7.css     # Estilos dedicados aos Jogos 6 (Velha) e 7 (Memória)
|   |-- games-phase8-9.css     # Estilos dedicados aos Jogos 8 (Labirinto) e 9 (Damas)
|   |-- games-phase10.css      # Estilos dedicados ao Jogo 10 (Quebra-Cabeça Acolhedor)
|   |-- login.css              # Interface de autenticação, feedback e PWA
|   +-- style.css              # Design system global e acessibilidade sensorial
|-- js/                        # Módulos lógicos da aplicação cliente
|   |-- accessoriesData.js     # Catálogo de roupinhas e itens customizáveis do Pip
|   |-- app.js                 # Bootstrap da SPA e orquestração global
|   |-- audio.js               # Motor de síntese sonora pentatônica (Web Audio API)
|   |-- authService.js         # Cliente de comunicação com a API de autenticação
|   |-- calmMode.js            # Módulo de respiração diafragmática guiada
|   |-- educationalGames.js    # Lógica dos 10 módulos pedagógicos interativos
|   |-- emojiEnhancer.js       # Tratamento de renderização de glifos vetoriais
|   |-- login.js               # Gerenciador da interface de autenticação e regras de acesso
|   |-- mascot.js              # Sistema de renderização multicamada do Pip (52 itens)
|   |-- missions.js            # Missões diárias e trilhas de progressão
|   |-- pwaInstaller.js        # Gerenciador de instalação PWA standalone e instruções multiplataforma
|   |-- speech.js              # Motor de fala neural angelical e controle de transição
|   +-- wardrobe.js            # Guarda-roupa interativo e personalização visual
|-- server/                    # Servidor de aplicação e serviços de backend
|   |-- auth.js                # Controladores de registro e login
|   |-- db.js                  # Camada de abstração e pool PostgreSQL com fallback
|   |-- logger.js              # Serviço centralizado de auditoria e telemetria
|   +-- server.js              # Inicialização do Express, middlewares e rotas
|-- docker-compose.yml         # Orquestração de containers para desenvolvimento
|-- Dockerfile                 # Definição de imagem conteinerizada do servidor Node
|-- manifest.json              # Configurações de manifesto PWA
|-- package.json               # Gerenciamento de dependências e scripts de automação
|-- sw.js                      # Service Worker para armazenamento em cache
+-- vercel.json                # Configuração de roteamento e deploy na plataforma Vercel
```

---

## 6. Instalação e Execução em Ambiente de Desenvolvimento

### 6.1 Pré-requisitos
- Node.js versão 18 ou superior.
- Docker e Docker Compose (caso deseje executar em containers isolados).
- PostgreSQL versão 14 ou superior (caso opte por execução local direta sem Docker).

### 6.2 Execução via Docker Compose (Método Recomendado)
A inicialização conteinerizada provisiona automaticamente o servidor da aplicação e uma instância dedicada do PostgreSQL 17 com volume persistente:

```bash
docker compose up -d --build
```

A aplicação ficará disponível em:
```
http://localhost:8085
```

Para inspecionar os logs do container de aplicação em tempo real:
```bash
docker compose logs -f web
```

### 6.3 Execução Manual sem Docker
1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente criando o arquivo `.env` a partir do modelo:
   ```bash
   cp .env.example .env
   ```
3. Execute a validação sintática do código:
   ```bash
   npm run test:syntax
   ```
4. Inicie o servidor de aplicação:
   ```bash
   npm start
   ```
5. Acesse no navegador em `http://localhost:8085`.

---

## 7. Variáveis de Ambiente

As configurações sensíveis e parâmetros de infraestrutura devem ser definidos através de variáveis de ambiente:

| Variável | Descrição | Obrigatória | Exemplo |
| :--- | :--- | :--- | :--- |
| `PORT` | Porta TCP de escuta do servidor HTTP | Não (padrão 8085) | `8085` |
| `NODE_ENV` | Modo de operação do ambiente | Sim | `development` ou `production` |
| `DATABASE_URL` | String de conexão SSL com o banco PostgreSQL | Recomendada | `postgres://usuario:senha@host:5432/starkids_db` |
| `SESSION_SECRET` | Chave criptográfica para assinatura de sessões | Sim | `chave_criptografica_de_alta_entropia` |

---

## 8. Arquitetura de Deploy e Produção

A solução adota uma topologia híbrida para alta disponibilidade e baixa latência:

- **Borda Estática e Funções Serverless (Vercel)**:
  - O código frontend, assets estáticos, manifestos e service workers são distribuídos globalmente pela rede de borda (CDN) da Vercel.
  - O endpoint `/api/*` é roteado através do arquivo `vercel.json` para a função serverless `api/index.js`, conectada em modo seguro ao banco de dados remoto.
- **Banco de Dados Gerenciado (Render PostgreSQL)**:
  - Banco relacional PostgreSQL em nuvem com backups regulares e comunicação criptografada via TLS/SSL.
- **Esteira de Entrega**:
  - Validação de sintaxe e testes de integridade prévios ao versionamento.
  - Deploy contínuo ativado a cada sincronização de commits validados no branch principal (`main`).

---

## 9. Governança de Código e Segurança

- Não há exposição de credenciais ou tokens em código-fonte versionado.
- Os dados sensíveis trafegados em operações de autenticação são validados em formato e tamanho tanto no cliente quanto no servidor.
- Os registros de auditoria disponibilizados em `/api/logs` mantêm isolamento de credenciais e senhas, limitando-se a registrar carimbos temporais, operações executadas e IPs mascarados em conformidade com princípios de privacidade.

---

## 10. Licença

Este projeto é disponibilizado sob os termos da Licença **MIT**. Consulte o arquivo `LICENSE` para informações completas.
