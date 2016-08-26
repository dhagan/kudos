'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Achievement = mongoose.model('Achievement'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, achievement;

/**
 * Achievement routes tests
 */
describe('Achievement CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Achievement
    user.save(function () {
      achievement = {
        name: 'Achievement name'
      };

      done();
    });
  });

  it('should be able to save a Achievement if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Achievement
        agent.post('/api/achievements')
          .send(achievement)
          .expect(200)
          .end(function (achievementSaveErr, achievementSaveRes) {
            // Handle Achievement save error
            if (achievementSaveErr) {
              return done(achievementSaveErr);
            }

            // Get a list of Achievements
            agent.get('/api/achievements')
              .end(function (achievementsGetErr, achievementsGetRes) {
                // Handle Achievement save error
                if (achievementsGetErr) {
                  return done(achievementsGetErr);
                }

                // Get Achievements list
                var achievements = achievementsGetRes.body;

                // Set assertions
                (achievements[0].user._id).should.equal(userId);
                (achievements[0].name).should.match('Achievement name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Achievement if not logged in', function (done) {
    agent.post('/api/achievements')
      .send(achievement)
      .expect(403)
      .end(function (achievementSaveErr, achievementSaveRes) {
        // Call the assertion callback
        done(achievementSaveErr);
      });
  });

  it('should not be able to save an Achievement if no name is provided', function (done) {
    // Invalidate name field
    achievement.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Achievement
        agent.post('/api/achievements')
          .send(achievement)
          .expect(400)
          .end(function (achievementSaveErr, achievementSaveRes) {
            // Set message assertion
            (achievementSaveRes.body.message).should.match('Please fill Achievement name');

            // Handle Achievement save error
            done(achievementSaveErr);
          });
      });
  });

  it('should be able to update an Achievement if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Achievement
        agent.post('/api/achievements')
          .send(achievement)
          .expect(200)
          .end(function (achievementSaveErr, achievementSaveRes) {
            // Handle Achievement save error
            if (achievementSaveErr) {
              return done(achievementSaveErr);
            }

            // Update Achievement name
            achievement.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Achievement
            agent.put('/api/achievements/' + achievementSaveRes.body._id)
              .send(achievement)
              .expect(200)
              .end(function (achievementUpdateErr, achievementUpdateRes) {
                // Handle Achievement update error
                if (achievementUpdateErr) {
                  return done(achievementUpdateErr);
                }

                // Set assertions
                (achievementUpdateRes.body._id).should.equal(achievementSaveRes.body._id);
                (achievementUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Achievements if not signed in', function (done) {
    // Create new Achievement model instance
    var achievementObj = new Achievement(achievement);

    // Save the achievement
    achievementObj.save(function () {
      // Request Achievements
      request(app).get('/api/achievements')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Achievement if not signed in', function (done) {
    // Create new Achievement model instance
    var achievementObj = new Achievement(achievement);

    // Save the Achievement
    achievementObj.save(function () {
      request(app).get('/api/achievements/' + achievementObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', achievement.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Achievement with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/achievements/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Achievement is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Achievement which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Achievement
    request(app).get('/api/achievements/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Achievement with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Achievement if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Achievement
        agent.post('/api/achievements')
          .send(achievement)
          .expect(200)
          .end(function (achievementSaveErr, achievementSaveRes) {
            // Handle Achievement save error
            if (achievementSaveErr) {
              return done(achievementSaveErr);
            }

            // Delete an existing Achievement
            agent.delete('/api/achievements/' + achievementSaveRes.body._id)
              .send(achievement)
              .expect(200)
              .end(function (achievementDeleteErr, achievementDeleteRes) {
                // Handle achievement error error
                if (achievementDeleteErr) {
                  return done(achievementDeleteErr);
                }

                // Set assertions
                (achievementDeleteRes.body._id).should.equal(achievementSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Achievement if not signed in', function (done) {
    // Set Achievement user
    achievement.user = user;

    // Create new Achievement model instance
    var achievementObj = new Achievement(achievement);

    // Save the Achievement
    achievementObj.save(function () {
      // Try deleting Achievement
      request(app).delete('/api/achievements/' + achievementObj._id)
        .expect(403)
        .end(function (achievementDeleteErr, achievementDeleteRes) {
          // Set message assertion
          (achievementDeleteRes.body.message).should.match('User is not authorized');

          // Handle Achievement error error
          done(achievementDeleteErr);
        });

    });
  });

  it('should be able to get a single Achievement that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Achievement
          agent.post('/api/achievements')
            .send(achievement)
            .expect(200)
            .end(function (achievementSaveErr, achievementSaveRes) {
              // Handle Achievement save error
              if (achievementSaveErr) {
                return done(achievementSaveErr);
              }

              // Set assertions on new Achievement
              (achievementSaveRes.body.name).should.equal(achievement.name);
              should.exist(achievementSaveRes.body.user);
              should.equal(achievementSaveRes.body.user._id, orphanId);

              // force the Achievement to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Achievement
                    agent.get('/api/achievements/' + achievementSaveRes.body._id)
                      .expect(200)
                      .end(function (achievementInfoErr, achievementInfoRes) {
                        // Handle Achievement error
                        if (achievementInfoErr) {
                          return done(achievementInfoErr);
                        }

                        // Set assertions
                        (achievementInfoRes.body._id).should.equal(achievementSaveRes.body._id);
                        (achievementInfoRes.body.name).should.equal(achievement.name);
                        should.equal(achievementInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Achievement.remove().exec(done);
    });
  });
});
