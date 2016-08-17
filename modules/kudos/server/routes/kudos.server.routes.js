'use strict';

/**
 * Module dependencies
 */
var kudosPolicy = require('../policies/kudos.server.policy'),
  kudos = require('../controllers/kudos.server.controller');

module.exports = function(app) {
  // Kudos Routes
  app.route('/api/kudos').all(kudosPolicy.isAllowed)
    .get(kudos.list)
    .post(kudos.create);

  app.route('/api/kudos/:kudoId').all(kudosPolicy.isAllowed)
    .get(kudos.read)
    .put(kudos.update)
    .delete(kudos.delete);

  // Finish by binding the Kudo middleware
  app.param('kudoId', kudos.kudoByID);
};
