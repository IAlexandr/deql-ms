import { db } from './../../tools/db/sequelize/index';
import pubsub from './../../tools/graphql/pubsub';

var count = 0;
setInterval(() => {
  db.User.findAll().then(users => {
    if (users) {
      users.forEach(user => {
        console.log(user.props.displayName, count++);

        user.props.count
          ? user.set('props.count', user.props.count + 1)
          : user.set('props.count', 1);
        user.save().then(e => {
          pubsub.publish('SESSION_INFO_CHANGED', {
            sessionInfoChanged: e,
          });
        });
      });
    }
  });
}, 2000);
