# 🌟 StarKids: Aventuras Educativas & Coleção
> **Plataforma Educativa Acolhedora, Sensorialmente Equilibrada e Neuroinclusiva**  
> Repositório Oficial: [https://github.com/augdev1/STARKIDS_NEUROINCLUSIVE](https://github.com/augdev1/STARKIDS_NEUROINCLUSIVE)

---

## 🎯 Objetivo do Projeto

O **StarKids** foi idealizado e construído com um propósito claro: **oferecer uma experiência de aprendizagem digital verdadeiramente acolhedora, respeitosa e acessível para crianças neurodivergentes**, abrangendo perfis com:

- 🧩 **Transtorno do Espectro Autista (TEA)**: Previsibilidade nas transições, comandos claros, estímulos visuais controlados e ausência de ruídos estridentes ou piscantes.
- ⚡ **TDAH (Atenção & Hiperatividade)**: Estímulo ao foco por meio de tarefas modulares, gratificação suave contínua e opção imediata de pausas guiadas.
- 📖 **Dislexia e Dificuldades de Processamento Visual**: Tipografia científica, espaçamentos generosos e marcadores de base anti-espelhamento.
- 🌿 **Hipersensibilidade Sensorial**: Ausência de cronômetros punitivos, telas de "Game Over" ou pontuações negativas; cada tentativa é acolhida como uma oportunidade de exploração.

---

## 🎨 Pilares Pedagógicos & Sensoriais

### 1. Paleta de Cores *Deep Calm*
Desenvolvida a partir de pesquisas cromáticas para neurodiversidade:
- **Azul Ardósia & Azul Noturno (`#162438`, `#2B4263`)**: Foco e profundidade sem agressão visual.
- **Areia Quente & Bege Suave (`#C49E74`, `#F4EFEA`)**: Aconchego e calor, reduzindo o brilho branco puro.
- **Creme de Fundo (`#FAF8F5`)**: Baixa intensidade de reflexo de luz, evitando fadiga ocular.

### 2. Tipografia Científica Acomodável (Lexend)
- Utilização da família tipográfica **Lexend**, desenvolvida especificamente para diminuir o efeito de aglomeração de caracteres (*visual crowding*).
- **Âncora de Base Anti-Espelhamento**: Linha sutil de sustentação na parte inferior de letras móveis, prevenindo confusão comum em crianças disléxicas (como *b/d*, *p/q*, *n/u*).
- Alternador dinâmico de caixa (Letra Bastão Maiúscula vs. Minúscula) e modo ampliado (+25%).

### 3. Mecânica Tátil de Arraste (Drag-and-Drop) & Toque Direto
- Interação física suave de **clicar, segurar e puxar** pecinhas para suas caixinhas correspondentes.
- Suporte unificado a Pointer Events em **Desktop (mouse), Tablets e Smartphones (toque)** a 60fps.
- **Acessibilidade Motora Dupla**: Crianças que sintam dificuldade no movimento de arrastar podem simplesmente **dar um toque** na letrinha ou item para encaixe automático.

### 4. Áudio Pentatônico & Locução com Voz Guia
- **Web Audio API**: Síntese sonora harmônica em escala pentatônica maior, evitando frequências agudas estressantes.
- **Web Speech API**: Locução clara e paciente com o mascote Pip lendo as orientações da fase para crianças em fase de pré-alfabetização.

### 5. Modo Calma (Respiração Diafragmática)
- Ferramenta integrada de regulação emocional com bolha respiratória suave inspirada em técnicas de *mindfulness* infantil.
- Detecção gentil de inatividade ou agitação para sugerir momentos de relaxamento.

---

## 👗 O Mascote Pip & Camarim de 52 Acessórios

O Pip é o guia e companheiro do jogador. A cada fase completada, o **Baú das Descobertas** se abre com um novo item colecionável para vestir o Pip:
- **5 Camadas Simultâneas em SVG**: Auras encantadas (arco-íris, cristais, constelação), Roupas/Capas, Óculos/Rosto, Chapéus/Tiaras e Amiguinhos/Pets de estimação.
- Sem cortes visuais ou sobreposições indesejadas: proporções calculadas para total harmonia visual.

---

## 🎮 Jogos Educativos Integrados

1. **O Espelho das Emoções**: Reconhecimento socioemocional e empatia através de expressões acolhedoras.
2. **Construtor de Palavrinhas**: Consciência fonológica e ortografia com letras móveis e ilustrações vetoriais encantadoras.
3. **Balança das Quantidades**: Raciocínio lógico e matemática concreta equilibrando frutinhas nos pratos.
4. **O Trem dos Padrões**: Funções executivas, seriação e sequenciamento de cores e formas geométricas.
5. **A Rotina Encantada**: Autonomia e organização da rotina diária em ordem temporal.

---

## 🛠️ Arquitetura Técnica

- **Frontend**: HTML5 Semântico, CSS3 Moderno (Vanilla com Variáveis CSS), JavaScript ES6 Modular, Twemoji SVGs integrados.
- **Backend**: Node.js, Express, CORS, autenticação segura com tokens e senhas criptografadas com `bcryptjs`.
- **Banco de Dados**: PostgreSQL com pool de conexões (`pg`), tabelas relacionais `users` e `user_progression` com dados em JSONB. Possui fallback automático local (`local_db.json`) para uso offline ou desenvolvimento sem Docker.
- **Containerização**: Docker e Docker Compose orquestrando o app web e o PostgreSQL 17 Alpine com volume persistente.

---

## 🚀 Como Rodar Localmente

### Opção 1: Via Docker Compose (Recomendado)
Certifique-se de ter o Docker Desktop instalado e execute:
```bash
docker compose up -d --build
```
Acesse a aplicação no navegador em:
👉 **`http://localhost:8085`**

Para visualizar os logs:
```bash
docker compose logs -f web
```

### Opção 2: Via Node.js Local
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Copie o arquivo de exemplo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```
4. Acesse: **`http://localhost:8085`**

---

## ☁️ Guia de Deploy (Vercel & Render)

Este projeto está pronto para arquitetura dividida:
- **Frontend**: Hospedado no **Vercel** (com CDN global ultrarrápida).
- **Backend & Banco de Dados**: Hospedados no **Render** (Node Web Service + PostgreSQL Gerenciado).

---

### Passo 1: Subir o Banco e Backend no RENDER

1. Acesse o [Render Dashboard](https://dashboard.render.com/) e faça login.
2. **Criar o Banco PostgreSQL**:
   - Clique em **New +** ➔ **PostgreSQL**.
   - **Name**: `starkids-db`
   - **Database**: `starkids_db`
   - **User**: `starkids`
   - **Plan**: **Free**
   - Clique em **Create Database**.
   - Após criado, copie a **External Database URL** (e a **Internal Database URL**).
3. **Criar o Web Service (Backend Node)**:
   - Clique em **New +** ➔ **Web Service**.
   - Conecte o repositório GitHub `augdev1/STARKIDS_NEUROINCLUSIVE`.
   - **Language**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**
   - Adicione as variáveis em **Environment Variables**:
     - `DATABASE_URL`: *(Cole a URL do PostgreSQL copiada acima)*
     - `SESSION_SECRET`: *(Uma chave secreta longa, ex: `starkids_secret_chave_2026`)*
     - `NODE_ENV`: `production`
   - Clique em **Create Web Service**.
   - Sua API estará no ar (ex: `https://starkids-api.onrender.com`).

---

### Passo 2: Subir o Frontend no VERCEL

1. Acesse o [Vercel](https://vercel.com/) e clique em **Add New...** ➔ **Project**.
2. Importe o repositório `augdev1/STARKIDS_NEUROINCLUSIVE`.
3. Em **Configure Project**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./`
4. Em **Environment Variables**:
   - `DATABASE_URL`: *(A External Database URL do PostgreSQL do Render)*
   - `SESSION_SECRET`: `starkids_secret_chave_2026`
   *(O arquivo `vercel.json` e a função serverless `api/index.js` já vêm configurados para rodar a API nativamente no Vercel conectada ao banco do Render, ou você pode apontar as rotas para o seu Web Service do Render).*
5. Clique em **Deploy**!
   - Em segundos sua aplicação estará online com HTTPS automático: `https://starkids.vercel.app`.

---

## 🔒 Variáveis de Ambiente

Consulte o arquivo `.env.example`:
| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `PORT` | Porta de escuta da aplicação | `8085` |
| `NODE_ENV` | Modo de execução (`development` / `production`) | `production` |
| `DATABASE_URL` | String de conexão com o PostgreSQL | `postgres://user:pass@host:5432/dbname` |
| `SESSION_SECRET` | Chave de segurança para assinatura de tokens de sessão | `sua_chave_secreta_2026` |

---

## 📄 Licença
Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais detalhes.
Criado com carinho e dedicação à educação inclusiva. 🌈✨
