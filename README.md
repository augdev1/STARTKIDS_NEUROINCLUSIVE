# StartKids: Plataforma Educacional Neuroinclusiva

Plataforma web progressiva (PWA) desenvolvida para proporcionar experiências de aprendizagem acessíveis, cognitivamente confortáveis e sensorialmente equilibradas para crianças neurodivergentes, com ênfase no atendimento a perfis com Transtorno do Espectro Autista (TEA), TDAH, Dislexia e sensibilidades sensoriais. O projeto está alinhado ao Objetivo de Desenvolvimento Sustentável 4 (ODS 4: Educacao de Qualidade) da Organizacao das Nacoes Unidas (ONU).

---

## 1. Visao Geral e Proposito Tecnico-Pedagogico

Aplicacoes convencionais de tecnologia educacional infantil frequentemente recorrem a hiperestimulos: paletas de cores saturadas, cronometros punitivos, efeitos sonoros estridentes de alta frequencia e interfaces carregadas de elementos competitivos. Embora atraentes para perfis neurotipicos padronizados, tais padroes atuam como barreiras severas para criancas com sobrecarga sensorial, disfuncoes executivas ou dificuldades no processamento visual.

O StartKids foi concebido a partir de principios de Ergonomia Cognitiva e Design Universal para a Aprendizagem:

- **Previsibilidade e Reducao de Ansiedade**: A interface nao possui telas de "Game Over", penalidades ou perdas de pontos. O erro e tratado como uma hipotese experimental em reformulacao, acompanhado de pistas contextuais graduais.
- **Isolamento de Estimulos**: Cada cenario apresenta apenas as informacoes estritamente necessarias para a tomada de decisao pedagogica, mitigando o esforco atencional concorrente.
- **Acomodacao Auditiva e Temporal**: Feedbacks sonoros e de voz sintetizada respeitam janelas de processamento cerebral. Apos qualquer leitura guiada ou explicacao, o sistema garante uma pausa de consolidacao antes de qualquer transicao de tela.
- **Dinamica de Autonomia**: Um mascote guia (Pip) acompanha as jornadas, reforçando o vinculo afetivo e fornecendo reforco positivo consistente.

---

## 2. Fundamentos de Acessibilidade e Ergonomia Sensorial

### 2.1 Teoria Cromatica "Deep Calm"
A paleta visual adota valores de reflectancia e saturacao calculados para mitigar a fadiga ocular e o estresse fotossensivel:
- **Azul Ardosia e Noturno (#162438, #2B4263)**: Fornece estabilidade e ancora focal com contraste seguro sem a dureza do preto absoluto.
- **Areia e Bege Suave (#C49E74, #F4EFEA)**: Substitui o fundo branco puro (#FFFFFF), atenuando reflexos intensos e desconfortos visuais comuns em salas iluminadas.
- **Creme de Fundo (#FAF8F5)**: Proporciona uma superficie neutra, garantindo conformidade com os padroes WCAG AAA para relacao de contraste em elementos textuais.

### 2.2 Tipografia Lexend e Âncora Anti-Espelhamento
A aplicacao utiliza a familia tipografica Lexend, projetada por especialistas para reduzir o efeito de aglomeracao visual (*visual crowding*) e acelerar a fluencia leitora em pessoas com dislexia:
- **Espacamento Intercaractere e Entrelinha Calibrados**: Maior distanciamento entre glifos para evitar a fusao perceptual de letras contiguas.
- **Base Anti-Espelhamento**: Letras moveis contam com microindicadores de sustentacao na base inferior, minimizando rotacoes e inversoes involuntarias frequentes (como entre b e d, p e q, n e u).
- **Controle de Caixa**: O usuario pode alternar dinamicamente entre letras em caixa alta (bastao maiuscula) e caixa baixa conforme o nivel de letramento.

### 2.3 Engenharia de Voz Angelical e Síntese de Fala Acessivel
Implementada sobre a Web Speech API (`SpeechSynthesis`) atraves de um motor dedicado (`SpeechEngine`):
- **Curadoria de Voz**: Prioriza motores neurais e naturais femininos em portugues brasileiro (`Microsoft Francisca Online Natural`, `Microsoft Thalita Online Natural`, `Google portugues do Brasil`, `Luciana Siri`), eliminando timbres metalicos ou agressivos.
- **Parametrizacao Acustica**: Taxa de elocucao reduzida para 0.88x (ritmo compassado de leitura compartilhada) e pitch ajustado para 1.15x (timbre suave e acolhedor).
- **Delay Pós-Locucao de 2000ms**: No encerramento de cada resposta ou explicacao, o sistema aguarda o evento nativo de termino (`utterance.onend`) e aplica um atraso intencional de 2 segundos antes de mudar de exercicio, respeitando o tempo de absorcao cognitiva da crianca.
- **Resiliencia de Execucao**: Protecao de referencia contra coleta prematura de lixo (Garbage Collection) no Chromium e temporizador de seguranca heuristico para prevencao de bloqueio de interface.

### 2.4 Síntese Sonora Pentatônica
Implementada via Web Audio API (`AudioEngine`):
- O sistema dispensa arquivos pesados de audio gravado, sintetizando ondas sonoras diretamente no hardware do cliente via osciladores em escala pentatonica maior.
- A escala pentatonica elimina intervalos dissonantes (segundas menores e tritonos), garantindo que qualquer combinacao acidental de notas resulte em harmonias relaxantes e confortaveis.

---

## 3. Arquitetura de Software

O sistema adota uma arquitetura em camadas desacopladas, priorizando carregamento rapido, resiliencia a falhas de conectividade e baixo consumo de memoria.

```
                    +-------------------------------------+
                    |       Cliente Web / PWA (SPA)       |
                    |  - Modulos ES6 (App, Jogos, Sons)   |
                    |  - Service Worker (Cache Offline)   |
                    |  - Web Audio API & Web Speech API   |
                    +-------------------+-----------------+
                                        |
                             HTTPS / JSON REST API
                                        |
                    +-------------------v-----------------+
                    |     Servidor Node.js / Express      |
                    |  - Rate Limiting e Sanitizacao      |
                    |  - Seguranca HTTP (Headers / CORS)  |
                    |  - Autenticacao com Criptografia    |
                    |  - Auditoria e Telemetria de Logs   |
                    +-------------------+-----------------+
                                        |
                          Conexao Pool TCP (SSL Seguro)
                                        |
                    +-------------------v-----------------+
                    |       PostgreSQL Gerenciado         |
                    |  - users (Credenciais Criptografadas)|
                    |  - user_progression (JSONB Dinamico)|
                    |  - audit_logs (Eventos e Seguranca) |
                    +-------------------------------------+
```

### 3.1 Camada Frontend
- **Abordagem Vanilla e Modularidade**: Desenvolvido em JavaScript ES6 nativo, HTML5 semantico e CSS3 puro via variaveis (CSS Custom Properties). Elimina sobrecargas de frameworks densos, resultando em inicializacao instantanea mesmo em dispositivos escolares de baixa potencia.
- **Tratamento Hibrido de Entrada (Pointer Events)**: Todas as mecanicas interativas (como arrastar pecas ou equilibrar balancas) suportam indistintamente eventos de mouse, caneta stylus e toque em tela capacitiva (touchscreens), disponibilizando tambem a alternativa de clique unico para criancas com comprometimento motor fino.
- **PWA (Progressive Web App)**: Implementacao com `manifest.json` e Service Worker (`sw.js`). Permite instalacao standalone no Android, iOS, Windows e macOS, funcionando em tela cheia sem barras de navegacao que gerem distracao.

### 3.2 Camada Backend
- **Node.js e Express**: API RESTful leve e deterministica.
- **Seguranca Defensiva**:
  - `Rate Limiting`: Limitador de requisicoes em memoria para prevencao de ataques de forca bruta em endpoints criticos (`/api/auth/login` e `/api/auth/register`).
  - `Headers de Seguranca`: Politicas de protecao contra clickjacking (`X-Frame-Options: SAMEORIGIN`), prevencao de sniffing de MIME type (`X-Content-Type-Options: nosniff`) e mitigacao de XSS.
  - `Criptografia Forte`: Geracao de hashes unidirecionais com `bcryptjs` utilizando salt rounds para armazenamento seguro de senhas.
  - `Controle de Payload`: Limitacao estrita do tamanho do corpo das requisicoes a 100 KB para prevencao de indisponibilidade por esgotamento de memoria.

### 3.3 Camada de Dados e Persistência Resiliente
- **PostgreSQL**: Utilizado como banco de dados primario relacional atraves do driver `pg` com pool de conexoes.
  - Tabela `users`: Identificacao de usuarios, credenciais e timestamps de criacao.
  - Tabela `user_progression`: Armazenamento do progresso, baus abertos, estrelas e customizacoes do personagem via coluna flexivel `JSONB`.
  - Tabela `audit_logs`: Registro cronologico de acessos, criacao de contas e eventuais anomalias operacionais para governanca.
- **Fallback Local Offline**: Caso o servidor remoto esteja indisponivel ou o cliente opere sem conexao de rede, o sistema redireciona a gravacao de estado para um mecanismo de persistencia local resiliente, assegurando que nenhuma crianca perca seus itens conquistados.

---

## 4. Modulos Educativos Disponiveis

A plataforma disponibiliza cinco modulos de atividades estruturadas com progressao pedagogica:

1. **O Espelho das Emocoes (Competencias Socioemocionais)**:
   Apresentacao de cenarios cotidianos vivenciados pelo mascote Pip para identificacao e nomeacao de estados afetivos. Cada cenario conta com texto acessivel em destaque, botao de narracao em audio e feedback falado explicativo ao acertar, seguido de 2 segundos de pausa para consolidacao emocional.
2. **Construtor de Palavrinhas (Consciencia Fonologica)**:
   Atividade de associacao fonema-grafema onde a crianca constroi palavras significativas atraves de letras moveis com pistas visuais e retorno sonoro individual para cada letra posicionada.
3. **Balanca das Quantidades (Raciocinio Concreto e Equidade)**:
   Exploracao de nocoes de equivalencia, adicao e subtracao atraves de uma balanca de dois pratos responsiva em fisica de inclinacao angular.
4. **O Trem dos Padroes (Funcoes Executivas e Sequenciamento)**:
   Composicao de vagoes ferroviarios seguindo padroes logicos de cores, formas e ritmo de alternancia, fortalecendo a memoria de trabalho e a antecipacao cognitiva.
5. **A Rotina Encantada (Planejamento e Autonomia)**:
   Sequenciamento temporal de acoes cotidianas (acordar, higiene, alimentacao, brincadeiras e descanso), promovendo organizacao estruturada e seguranca emocional.

---

## 5. Estrutura do Repositorio

```
.
|-- api/                       # Funcao serverless para execucao na borda (Vercel)
|   +-- index.js
|-- css/                       # Folhas de estilo modulares e variaveis de design
|   |-- login.css
|   +-- style.css
|-- js/                        # Modulos logicos da aplicacao cliente
|   |-- app.js                 # Bootstrap da SPA e orquestracao global
|   |-- audio.js               # Motor de sintese sonora pentatonica (Web Audio API)
|   |-- authService.js         # Cliente de comunicacao com a API de autenticacao
|   |-- calmMode.js            # Modulo de respiracao diafragmatica guiada
|   |-- educationalGames.js    # Logica dos 5 modulos pedagogicos
|   |-- emojiEnhancer.js       # Tratamento de renderizacao de glifos vetoriais
|   |-- login.js               # Gerenciador da interface de autenticacao
|   |-- mascot.js              # Sistema de renderizacao multicamada do Pip (52 itens)
|   |-- missions.js            # Missoes diarias e trilhas de progressao
|   |-- pwaInstaller.js        # Gerenciador de instalacao PWA standalone
|   +-- speech.js              # Motor de fala neural angelical e controle de transicao
|-- server/                    # Servidor de aplicacao e servicos de backend
|   |-- auth.js                # Controladores de registro e login
|   |-- db.js                  # Camada de abstracao e pool PostgreSQL com fallback
|   |-- logger.js              # Servico centralizado de auditoria e telemetria
|   +-- server.js              # Inicializacao do Express, middlewares e rotas
|-- docker-compose.yml         # Orquestracao de containers para desenvolvimento
|-- Dockerfile                 # Definicao de imagem conteinerizada do servidor Node
|-- manifest.json              # Configuracoes de manifesto PWA
|-- package.json               # Gerenciamento de dependencias e scripts de automacao
|-- sw.js                      # Service Worker para armazenamento em cache
+-- vercel.json                # Configuracao de roteamento e deploy na plataforma Vercel
```

---

## 6. Instalacao e Execucao em Ambiente de Desenvolvimento

### 6.1 Pre-requisitos
- Node.js versao 18 ou superior.
- Docker e Docker Compose (caso deseje executar em containers isolados).
- PostgreSQL versao 14 ou superior (caso opte por execucao local direta sem Docker).

### 6.2 Execucao via Docker Compose (Metodo Recomendado)
A inicializacao conteinerizada provisiona automaticamente o servidor da aplicacao e uma instancia dedicada do PostgreSQL 17 com volume persistente:

```bash
docker compose up -d --build
```

A aplicacao ficara disponivel em:
```
http://localhost:8085
```

Para inspecionar os logs do container de aplicacao em tempo real:
```bash
docker compose logs -f web
```

### 6.3 Execucao Manual sem Docker
1. Instale as dependencias do projeto:
   ```bash
   npm install
   ```
2. Configure as variaveis de ambiente criando o arquivo `.env` a partir do modelo:
   ```bash
   cp .env.example .env
   ```
3. Execute a validacao sintatica do codigo:
   ```bash
   npm run test:syntax
   ```
4. Inicie o servidor de aplicacao:
   ```bash
   npm start
   ```
5. Acesse no navegador em `http://localhost:8085`.

---

## 7. Variaveis de Ambiente

As configuracoes sensiveis e parametros de infraestrutura devem ser definidos atraves de variaveis de ambiente:

| Variavel | Descricao | Obrigatoria | Exemplo |
| :--- | :--- | :--- | :--- |
| `PORT` | Porta TCP de escuta do servidor HTTP | Nao (padrao 8085) | `8085` |
| `NODE_ENV` | Modo de operacao do ambiente | Sim | `development` ou `production` |
| `DATABASE_URL` | String de conexao SSL com o banco PostgreSQL | Recomendada | `postgres://usuario:senha@host:5432/starkids_db` |
| `SESSION_SECRET` | Chave criptografica para assinatura de sessoes | Sim | `chave_criptografica_de_alta_entropia` |

---

## 8. Arquitetura de Deploy e Producao

A solucao adota uma topologia hibrida para alta disponibilidade e baixa latencia:

- **Borda Estatica e Funcoes Serverless (Vercel)**:
  - O codigo frontend, assets estaticos, manifestos e service workers sao distribuidos globalmente pela rede de borda (CDN) da Vercel.
  - O endpoint `/api/*` e roteado atraves do arquivo `vercel.json` para a funcao serverless `api/index.js`, conectada em modo seguro ao banco de dados remoto.
- **Banco de Dados Gerenciado (Render PostgreSQL)**:
  - Banco relacional PostgreSQL em nuvem com backups regulares e comunicacao criptografada via TLS/SSL.
- **Esteira de Entrega**:
  - Validacao de sintaxe e testes de integridade previos ao versionamento.
  - Deploy continuo ativado a cada sincronizacao de commits validados no branch principal (`main`).

---

## 9. Governanca de Codigo e Seguranca

- Nao ha exposicao de credenciais ou tokens em codigo-fonte versionado.
- Os dados sensiveis trafegados em operacoes de autenticacao sao validados em formato e tamanho tanto no cliente quanto no servidor.
- Os registros de auditoria disponibilizados em `/api/logs` mantêm isolamento de credenciais e senhas, limitando-se a registrar carimbos temporais, operacoes executadas e IPs mascarados em conformidade com principios de privacidade.

---

## 10. Licenca

Este projeto e disponibilizado sob os termos da Licenca **MIT**. Consulte o arquivo `LICENSE` para informacoes completas.
