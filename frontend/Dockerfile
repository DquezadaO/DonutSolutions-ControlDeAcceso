FROM node:12-alpine AS node
#################################
#####     Builder image     #####
#################################
FROM node as builder

WORKDIR /app

COPY package.json yarn.lock craco.config.js tailwind.config.js ./

RUN yarn install

COPY . .

RUN yarn build

#################################
#####     Runtime image     #####
#################################
FROM node as runtime

ARG PORT=80

ENV PORT=${PORT}

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/build ./build

EXPOSE ${PORT}

ENTRYPOINT [ "serve", "-s", "build", "-l", "80"]
