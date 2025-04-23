# Utiliza imagem oficial Node para build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Usar nginx para servir os arquivos estáticos
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copiar config padrão do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
