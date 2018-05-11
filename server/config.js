export default {
  port: '8888',
  graphql: {
    engineApiKey: 'service:IAlexandr-1989:nBVcdqY2LeFflojnCBFd8w',
    useEngine: false,
  },
  sequelize: {
    options: {
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      logging: false,
    },
    username: 'postgres',
    password: 'postgres',
    dbName: 'template_postgis',
    accessDbSeed: true,
    syncForce: true,
    accessSyncForce: true,
  },
  rabbitmq: {
    connection: {
      name: '',
      user: '',
      pass: '',
      host: '',
      port: '',
      vhost: '%2f',
    },
  },
  NODE_ENV: 'development',
};
