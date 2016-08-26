'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Kudo Schema
 */
var KudoSchema = new Schema({
  description: {
    type: String,
    default: '',
    required: 'Please fill Kudo Description',
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  award: {
    type: String,
    trim: true
  },
  points: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  recipient_team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  kudo_id: {
    type: Number
  }
});

mongoose.model('Kudo', KudoSchema);
