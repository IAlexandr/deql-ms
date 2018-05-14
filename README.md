## deql-ms

The template-service (ms) includes a set for the [server](https://github.com/IAlexandr/deql-ms-server) and [client](https://github.com/IAlexandr/deql-ms-client).

You can use both the server and client parts separately.

The ms are tools:

### v.1

* [x] Apollo Server
* [x] Apollo Engine
* [x] Graphql Playground
* [x] Graphql Voyager
* [x] Express-session (sequelize)
* [ ] Schema stitching
* [ ] Apollo Client

### v.2

* [ ] Express-session (connect-redis)
* [ ] Prisma GraphQL API (Database Connector: Postgres)

You can add other tools to repository [deql-ms-server](https://github.com/IAlexandr/deql-ms-server)

* [x] VSCode server debugging (launch.json)

### Initializing submodules:

* `git submodule init; git submodule update`

For one submodule (client/server):

* `git submodule init server/deql-ms-server`

* `git submodule update server/deql-ms-server`

### NPM commands:

`npm run <operation>`

* "init" - install dependencies: client and server,
* "init_client",
* "init_server",
* "client",
* "server",
* "start" - run: client and server
