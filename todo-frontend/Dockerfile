# Etapa 1: Build do React
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Cria arquivo .env.production diretamente no container
RUN echo "REACT_APP_API_URL=http://backend:3001" > .env.production

RUN npm run build

# Etapa 2: Servindo com Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
