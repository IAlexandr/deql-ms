// import session from 'tools/express-session-sequelize';
import session from 'tools/redis/express-session';
import { getValue, connect as redisConnect } from 'tools/redis';
import logger from 'tools/logger';
//Выбираем базу данных
import { init } from 'tools/db/sequelize';
import options from 'tools/options';

const { debug, time } = logger('project.dependencies');

export const dependencies = async function({ app }) {
  const initialized = time('initializing');
  await redisConnect();

  const db = await init({
    dbConfig: options.config.sequelize,
    NODE_ENV: options.config.NODE_ENV,
    modules: options.modules,
  });

  const sessionMidleware = session(app, db);
  app.use(sessionMidleware);
  initialized('done.');
  return { db };
};
