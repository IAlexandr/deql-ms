export default {
  administration: {
    permitAll: {
      // name: "permit all", если name НЕ указан, берется наименование ключа permitAll.
      displayName: 'Все действия разрешены',
      defaultRoles: ['mAdministration'],
    },
  },
  catalogs: {
    viewCatalog: {
      displayName: 'Просмотр каталога',
      defaultRoles: ['mCatalogs'],
    },
  },
  features: {
    viewFeature: {
      displayName: 'Просмотр фичера',
      defaultRoles: ['mFeatures'],
    },
  },
  ui: {
    viewSomething: {
      displayName: 'Просмотр чего нибудь',
      defaultRoles: ['mSomething'],
    },
  },
};
