'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Team name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  organization: {
    type: Schema.ObjectId,
    ref: 'Organization'
  },
  leader: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Schema.ObjectId,
    ref: 'User'
  }
  ]
});

mongoose.model('Team', TeamSchema);
