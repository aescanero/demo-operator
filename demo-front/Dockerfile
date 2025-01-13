FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i 
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS server
COPY --from=builder /app/dist /usr/share/nginx/html
COPY assets/nginx.conf /etc/nginx/conf.d/default.conf
COPY assets/env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
