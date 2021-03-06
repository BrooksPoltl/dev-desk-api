
# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node
WORKDIR /usr/app
COPY package*.json ./

RUN npm install --production

COPY --from=builder /usr/app/dist ./dist
RUN mkdir data
COPY /data ./data
COPY .env ./
RUN ls ./dist
EXPOSE 3000
CMD node dist/app.js