'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Kudo = mongoose.model('Kudo'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, kudo;

/**
 * Kudo routes tests
 */
describe('Kudo CRUD tests', function () {

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

    // Save a user to the test db and create new Kudo
    user.save(function () {
      kudo = {
        name: 'Kudo name'
      };

      done();
    });
  });

  it('should be able to save a Kudo if logged in', function (done) {
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

        // Save a new Kudo
        agent.post('/api/kudos')
          .send(kudo)
          .expect(200)
          .end(function (kudoSaveErr, kudoSaveRes) {
            // Handle Kudo save error
            if (kudoSaveErr) {
              return done(kudoSaveErr);
            }

            // Get a list of Kudos
            agent.get('/api/kudos')
              .end(function (kudosGetErr, kudosGetRes) {
                // Handle Kudo save error
                if (kudosGetErr) {
                  return done(kudosGetErr);
                }

                // Get Kudos list
                var kudos = kudosGetRes.body;

                // Set assertions
                (kudos[0].user._id).should.equal(userId);
                (kudos[0].name).should.match('Kudo name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Kudo if not logged in', function (done) {
    agent.post('/api/kudos')
      .send(kudo)
      .expect(403)
      .end(function (kudoSaveErr, kudoSaveRes) {
        // Call the assertion callback
        done(kudoSaveErr);
      });
  });

  it('should not be able to save an Kudo if no name is provided', function (done) {
    // Invalidate name field
    kudo.name = '';

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

        // Save a new Kudo
        agent.post('/api/kudos')
          .send(kudo)
          .expect(400)
          .end(function (kudoSaveErr, kudoSaveRes) {
            // Set message assertion
            (kudoSaveRes.body.message).should.match('Please fill Kudo name');

            // Handle Kudo save error
            done(kudoSaveErr);
          });
      });
  });

  it('should be able to update an Kudo if signed in', function (done) {
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

        // Save a new Kudo
        agent.post('/api/kudos')
          .send(kudo)
          .expect(200)
          .end(function (kudoSaveErr, kudoSaveRes) {
            // Handle Kudo save error
            if (kudoSaveErr) {
              return done(kudoSaveErr);
            }

            // Update Kudo name
            kudo.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Kudo
            agent.put('/api/kudos/' + kudoSaveRes.body._id)
              .send(kudo)
              .expect(200)
              .end(function (kudoUpdateErr, kudoUpdateRes) {
                // Handle Kudo update error
                if (kudoUpdateErr) {
                  return done(kudoUpdateErr);
                }

                // Set assertions
                (kudoUpdateRes.body._id).should.equal(kudoSaveRes.body._id);
                (kudoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Kudos if not signed in', function (done) {
    // Create new Kudo model instance
    var kudoObj = new Kudo(kudo);

    // Save the kudo
    kudoObj.save(function () {
      // Request Kudos
      request(app).get('/api/kudos')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Kudo if not signed in', function (done) {
    // Create new Kudo model instance
    var kudoObj = new Kudo(kudo);

    // Save the Kudo
    kudoObj.save(function () {
      request(app).get('/api/kudos/' + kudoObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', kudo.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Kudo with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/kudos/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Kudo is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Kudo which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Kudo
    request(app).get('/api/kudos/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Kudo with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Kudo if signed in', function (done) {
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

        // Save a new Kudo
        agent.post('/api/kudos')
          .send(kudo)
          .expect(200)
          .end(function (kudoSaveErr, kudoSaveRes) {
            // Handle Kudo save error
            if (kudoSaveErr) {
              return done(kudoSaveErr);
            }

            // Delete an existing Kudo
            agent.delete('/api/kudos/' + kudoSaveRes.body._id)
              .send(kudo)
              .expect(200)
              .end(function (kudoDeleteErr, kudoDeleteRes) {
                // Handle kudo error error
                if (kudoDeleteErr) {
                  return done(kudoDeleteErr);
                }

                // Set assertions
                (kudoDeleteRes.body._id).should.equal(kudoSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Kudo if not signed in', function (done) {
    // Set Kudo user
    kudo.user = user;

    // Create new Kudo model instance
    var kudoObj = new Kudo(kudo);

    // Save the Kudo
    kudoObj.save(function () {
      // Try deleting Kudo
      request(app).delete('/api/kudos/' + kudoObj._id)
        .expect(403)
        .end(function (kudoDeleteErr, kudoDeleteRes) {
          // Set message assertion
          (kudoDeleteRes.body.message).should.match('User is not authorized');

          // Handle Kudo error error
          done(kudoDeleteErr);
        });

    });
  });

  it('should be able to get a single Kudo that has an orphaned user reference', function (done) {
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

          // Save a new Kudo
          agent.post('/api/kudos')
            .send(kudo)
            .expect(200)
            .end(function (kudoSaveErr, kudoSaveRes) {
              // Handle Kudo save error
              if (kudoSaveErr) {
                return done(kudoSaveErr);
              }

              // Set assertions on new Kudo
              (kudoSaveRes.body.name).should.equal(kudo.name);
              should.exist(kudoSaveRes.body.user);
              should.equal(kudoSaveRes.body.user._id, orphanId);

              // force the Kudo to have an orphaned user reference
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

                    // Get the Kudo
                    agent.get('/api/kudos/' + kudoSaveRes.body._id)
                      .expect(200)
                      .end(function (kudoInfoErr, kudoInfoRes) {
                        // Handle Kudo error
                        if (kudoInfoErr) {
                          return done(kudoInfoErr);
                        }

                        // Set assertions
                        (kudoInfoRes.body._id).should.equal(kudoSaveRes.body._id);
                        (kudoInfoRes.body.name).should.equal(kudo.name);
                        should.equal(kudoInfoRes.body.user, undefined);

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
      Kudo.remove().exec(done);
    });
  });
});
