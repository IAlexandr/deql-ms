export default {
  port: '8888',
  projectName: "deql-ms",
  graphql: {
    engineApiKey: "service:deql-ms-server:4bBKVv14mLq7dWyaQeqfjA",
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
