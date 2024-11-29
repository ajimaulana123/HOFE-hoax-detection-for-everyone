FROM node:20-alpine

COPY . /app

WORKDIR /app

RUN yarn install --frozen-lockfile

CMD ["node", "src/index.js"]
