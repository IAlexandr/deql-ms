import session from 'tools/express-session-sequelize';
import logger from 'tools/logger';
//Выбираем базу данных
import { init } from 'tools/db/sequelize';
import options from 'tools/options';

const { debug, time } = logger('project.dependencies');

export const dependencies = async function({ app }) {
  const initialized = time('initializing');
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
