# SERVER
FROM node:alpine

ARG DIR=/home/deql-ms

ADD package.json $DIR/
ADD ./server/package.json $DIR/server/
ADD ./server/deql-ms-server/package.json $DIR/server/deql-ms-server/
WORKDIR $DIR
RUN npm install yarn -g
RUN npm install
RUN npm run init_server

COPY ./server $DIR/server
COPY ./config $DIR/config
COPY ./package.json $DIR/package.json
COPY ./wait-for-postgres.sh $DIR/wait-for-postgres.sh
COPY ./wait-for-it.sh $DIR/wait-for-it.sh

RUN apk update
RUN apk upgrade
RUN apk add bash
RUN apk --update add postgresql-bdr

RUN chmod +x $DIR/wait-for-postgres.sh
RUN dos2unix $DIR/wait-for-postgres.sh
RUN npm install concurrently -g
RUN yarn global add babel-cli
ENV DEBUG deql*

# RUN chmod +x $DIR/wait-for-it.sh
# RUN dos2unix $DIR/wait-for-it.sh
#CMD ["/home/deql-ms/wait-for-it.sh", "--timeout=5", "redis:6379", "etcd:4001", "rabbitmq:5672", "postgis:5434", "-s", "--", "npm", "start"]
#CMD ["npm", "start"]

CMD ["/home/deql-ms/wait-for-postgres.sh", "mspostgis", "5432", "npm run server_prod"]
