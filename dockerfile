# Frontend Dockerfile (coloque na pasta ./frontend/Dockerfile)
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]