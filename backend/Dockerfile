# crud_contabilidade/backend/Dockerfile
FROM node:18

# Cria a pasta /app no container
WORKDIR /app

# Copia os arquivos e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Porta que o Next.js vai rodar
EXPOSE 3000

# Comando default
CMD ["npm", "run", "dev"]
