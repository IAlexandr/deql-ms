import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

// const session = {
// Roles: {
// User: ['viewCatalog', 'viewCatalogs', 'viewFeature', 'viewFeatures'],
// Administrator: [
//   'viewAdminPanel',
//   'viewCatalog',
//   'viewCatalogs',
//   'viewFeature',
//   'viewFeatures',
// ],
// },
// };

class hasAccessDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    if (this.args && this.args.not) {
      type._notRules = this.args.not;
    }
    if (this.args && this.args.and) {
      type._andRules = this.args.and;
    }
    if (this.args && this.args.or) {
      type._orRules = this.args.or;
    }
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    if (this.args && this.args.not) {
      field._notRules = this.args.not;
    }
    if (this.args && this.args.and) {
      field._andRules = this.args.and;
    }
    if (this.args && this.args.or) {
      field._orRules = this.args.or;
    }
  }
  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        const session = args[2].session.info ? args[2].session.info : null;

        const notRules = field._notRules || objectType._notRules;
        const andRules = field._andRules || objectType._andRules;
        const orRules = field._orRules || objectType._orRules;

        /* check for user not have the rule */
        let not =
          notRules && session && session.Roles
            ? checkForNotClause(notRules, session.Roles)
            : null;
        /* check for user have all rules from array */
        let and =
          andRules && session && session.Roles
            ? checkForAndClause(andRules, session.Roles)
            : null;
        /* check for user have any rule from array */
        let or =
          orRules && session && session.Roles
            ? checkForOrClause(orRules, session.Roles)
            : null;
        if (not) {
          return resolve.apply(this, args);
        } else {
          if (and && and === andRules.length) {
            return resolve.apply(this, args);
          } else {
            if (or) {
              return resolve.apply(this, args);
            } else {
              throw new Error('not authorized');
            }
          }
        }
      };
    });
  }
}

export default { hasAccess: hasAccessDirective };

/**
 *
 * @param {Array<String>} notRules
 * @param {Object} roles
 * @returns {Boolean}
 */
const checkForNotClause = (notRules, roles) => {
  let not = true;
  notRules.forEach(rule => {
    Object.keys(roles).forEach(role => {
      console.log(rule, roles[role], roles[role].indexOf(rule));
      if (roles[role].indexOf(rule) !== -1) {
        not = false;
      }
    });
  });
  return not;
};

/**
 *
 * @param {Array<String>} andRules
 * @param {Object} session
 * @returns {Number}
 */
const checkForAndClause = (andRules, roles) => {
  let and = 0;
  andRules.forEach(rule => {
    Object.keys(roles).forEach(role => {
      if (roles[role].indexOf(rule) !== -1) {
        and += 1;
      }
    });
  });
  return and;
};

/**
 *
 * @param {Array<String>} orRules
 * @param {Object} session
 * @returns {Boolean}
 */
const checkForOrClause = (orRules, roles) => {
  let or = false;
  orRules.forEach(rule => {
    Object.keys(roles).forEach(role => {
      if (roles[role].indexOf(rule) !== -1) {
        or = true;
      }
    });
  });
  return or;
};
