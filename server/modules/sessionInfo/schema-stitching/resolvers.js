export default mergeInfo => ({
  Layer: {
    catalogs: {
      fragment: 'fragment LayerFragment on Layer {name}',
      resolve(parent, args, { db }, info) {
        return db.Layer.findOne({ where: { name: parent.name } }).then(
          doc => {
            if (!doc) {
              throw new Error(`Layer with '${parent.name}' not found`);
            }
            return doc.getCatalogs();
          }
        );
      },
    },
  },
  Organization: {
    catalogs: {
      fragment: 'fragment FileFragment on Organization {name}',
      resolve(parent, args, { db }, info) {
        return db.Organization.findOne({
          where: { name: parent.name },
        }).then(doc => {
          if (!doc) {
            throw new Error(`Organization with '${parent.name}' not found`);
          }
          return doc.getCatalogs();
        });
      },
    },
  },
  Feature: {
    catalogDocs: {
      fragment: 'fragment FileFragment on Feature {id}',
      resolve(parent, args, { db }, info) {
        return db.Feature.findOne({
          where: { id: parent.id },
        }).then(doc => {
          if (!doc) {
            throw new Error(`Feature with '${parent.id}' not found`);
          }
          return doc.getCatalogDoc();
        });
      },
    },
  },
});
