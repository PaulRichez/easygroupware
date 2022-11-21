FROM node:16-alpine

WORKDIR /my-path

COPY . .
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN yarn install

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]