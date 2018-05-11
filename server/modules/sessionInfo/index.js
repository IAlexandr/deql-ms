import typeDefs from './type-defs';
import resolvers from './resolvers';
import directives from './directives';
//import './service';
export default {
  moduleName: 'appState',
  graphql: {
    typeDefs,
    resolvers,
    directives,
  },
};
