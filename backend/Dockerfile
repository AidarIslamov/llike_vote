# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY src/ ./src/

# Экспоз порта
EXPOSE 3000

# Команда для запуска
CMD ["npm", "run", "dev"]