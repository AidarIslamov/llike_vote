FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

RUN npx sequelize-cli --version

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]