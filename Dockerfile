FROM node:16.15.1

RUN apt-get update

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY ["package.json", "yarn.lock"]

RUN yarn

COPY . .

USER node

CMD ["yarn", "dev"]