'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Achievement Schema
 */
var AchievementSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Achievement name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  achievement_id : {
    type: Number
  },
  point_threshold : {
    type: Number
  },
  icon_url : {
    type: String
  }

});

mongoose.model('Achievement', AchievementSchema);
