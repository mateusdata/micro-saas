FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]