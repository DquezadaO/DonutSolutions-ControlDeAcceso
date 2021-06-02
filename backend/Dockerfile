#################################
#####     Runtime image     #####
#################################
FROM node:12-alpine AS node
ARG PORT=3000

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn install --production

ENV PATH=/server/node_modules/.bin:$PATH

COPY . .

EXPOSE ${PORT}

ENTRYPOINT [ "yarn", "start"]
