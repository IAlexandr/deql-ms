# SERVER
FROM node:10.1.0-alpine

ARG DIR=/home/deql-ms

ADD package.json $DIR/
ADD ./server/package.json $DIR/server/
ADD ./server/deql-ms-server/package.json $DIR/server/deql-ms-server/
WORKDIR $DIR
RUN npm install yarn -g
RUN yarn global add concurrently
RUN yarn global add babel-cli
RUN yarn
RUN yarn run init_server

COPY ./server $DIR/server
COPY ./config $DIR/config
COPY ./package.json $DIR/package.json
COPY ./wait-for-postgres.sh $DIR/wait-for-postgres.sh
COPY ./wait-for-it.sh $DIR/wait-for-it.sh

RUN chmod +x $DIR/wait-for-postgres.sh
RUN dos2unix $DIR/wait-for-postgres.sh

RUN apk update
RUN apk upgrade
RUN apk add bash
RUN apk --update add postgresql-client
RUN apk --update add postgresql-bdr
ENV DEBUG deql*
# RUN chmod +x $DIR/wait-for-it.sh
# RUN dos2unix $DIR/wait-for-it.sh
# CMD ["/home/deql-ms/wait-for-it.sh", "--timeout=5", "redis:6379", "etcd:4001", "rabbitmq:5672", "postgis:5434", "-s", "--", "npm", "start"]
# CMD ["yarn", "start"]

CMD ["/home/deql-ms/wait-for-postgres.sh", "mspostgis", "5432", "yarn run server_prod"]
