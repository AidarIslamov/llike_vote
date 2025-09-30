FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем ВСЕ исходные файлы (кроме node_modules через .dockerignore)
COPY . .

# Экспоз порта
EXPOSE 3000

# Команда для запуска
CMD ["npm", "run", "dev"]