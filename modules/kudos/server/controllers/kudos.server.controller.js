'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Kudo = mongoose.model('Kudo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Kudo
 */
exports.create = function(req, res) {
  var kudo = new Kudo(req.body);
  kudo.author = req.user;

  kudo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(kudo);
    }
  });
};

/**
 * Show the current Kudo
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var kudo = req.kudo ? req.kudo.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  kudo.isCurrentUserOwner = req.user && kudo.user && kudo.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(kudo);
};

/**
 * Update a Kudo
 */
exports.update = function(req, res) {
  var kudo = req.kudo ;

  kudo = _.extend(kudo , req.body);

  kudo.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(kudo);
    }
  });
};

/**
 * Delete an Kudo
 */
exports.delete = function(req, res) {
  var kudo = req.kudo ;

  kudo.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(kudo);
    }
  });
};

/**
 * List of Kudos
 */
exports.list = function(req, res) { 
  Kudo.find().sort('-created').populate('author', 'displayName').populate('recipient', 'displayName').exec(function(err, kudos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(kudos);
    }
  });
};

/**
 * Kudo middleware
 */
exports.kudoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Kudo is invalid'
    });
  }

  Kudo.findById(id).populate('author', 'displayName').populate('recipient', 'displayName').exec(function (err, kudo) {
    if (err) {
      return next(err);
    } else if (!kudo) {
      return res.status(404).send({
        message: 'No Kudo with that identifier has been found'
      });
    }
    req.kudo = kudo;
    next();
  });
};
