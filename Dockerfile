FROM docker.io/node:16-alpine as build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src src
RUN npm install
RUN npm run build

FROM docker.io/node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g cross-env
RUN npm install --production
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npm", "start"]