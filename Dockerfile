FROM gcr.io/distroless/nodejs20-debian12

FROM node:latest

COPY package*.json ./

WORKDIR /app
COPY index.js index.js

RUN npm ci --only=production

EXPOSE 8080
CMD ["node","index.js"]