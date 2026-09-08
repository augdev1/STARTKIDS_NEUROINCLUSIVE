# Imagem base oficial do Node.js
FROM node:22-alpine AS runner

WORKDIR /app

# Definir ambiente de produção
ENV NODE_ENV=production
ENV PORT=8085

# Copiar manifesto de pacotes e instalar dependências de produção
COPY package*.json ./
RUN npm install --omit=dev

# Copiar o restante da aplicação
COPY . .

# Expor a porta do StarKids
EXPOSE 8085

# Iniciar o servidor com persistência e API
CMD ["node", "server/server.js"]
