import GraphQLJSON from 'graphql-type-json';
import logger from 'tools/logger';
const { time, debug, errDebug } = logger('appState.resolvers', true);

const guest = {
  isElevated: false,
  login: 'guest',
  userName: 'guest',
  roles: [
    {
      id: 0,
      name: 'guest',
      rules: [],
    },
  ],
};
var t = 0;
export default pubsub => ({
  JSON: GraphQLJSON,
  Query: {
    SessionInfo: (users, args, { db, session }) => {
      if (session.user && session.user.login) {
        return {
          isElevated: true,
          login: session.user.login,
          roles: session.user.Roles,
        };
      } else {
        session.user = guest;
        return guest;
      }
    },
  },
  Subscription: {
    sessionInfoChanged: {
      subscribe: () => {
        debug('sessionInfoChanged subscribed!');
        return pubsub.asyncIterator('SESSION_INFO_CHANGED');
      },
    },
  },
});
