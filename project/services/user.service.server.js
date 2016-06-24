/**
 * Created by Ben on 6/1/16.
 * Allows for user CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var userModel = models.userModel;

    /* Security */
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    
    //TODO: make image upload work.
    //TODO: Fix getting competitions and parameters from the url (:cid) in config now.
    //TODO: Add Judging
    //TODO: Client side error handling and input validation!
    //TODO: Video
    //TODO: REACH GOALS: Youtube Search API in new & edit Post view.
    //TODO: Reach GOALS: Comments on everything

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };
    
    /* Paths that are allowed. */
    app.post("/project/api/user/", createUser);
    app.post("/project/api/login", passport.authenticate('benProject'), login);
    app.post("/project/api/register", register);
    app.get("/project/api/user/search/:text", search);
    app.get("/project/api/user/", getUsers);
    //Above covers query cases:
    //project/api/user/?username=username
    //project/api/user/?username=username&password=password
    app.get("/project/api/loggedin", loggedIn);
    app.post("/project/api/logout", logout);
    app.get("/project/api/user/:userId", findUserById);
    app.put("/project/api/user/:userId", updateUser);
    app.delete("/project/api/user/:userId", deleteUser);
    /* Google */
    app.get("/project/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/project/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));


    /* Facebook */
    app.get("/project/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get("/project/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    passport.use('benProject', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    /**
     *  Security Functions
     */

    function auth(req, resp, next) {
        if(!req.isAuthenticated()) {
            resp.status(400).send("User is not logged in.");
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    try {
                        if (user && bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false);
                        }
                    }
                    catch (err) {
                        return done(null, false);
                    }
                },
                function (error) {
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findUserByFacebookId(id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(user);
                    }
                },
                function(err) {
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token,
                                displayName: emailParts[0]
                            }
                        };
                        return userModel
                                    .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            );
    }

    /**
     *  Functions
     */
    function createUser(req, resp) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    resp.status(400).send("Username " + newUser.username + " is already in use.");
                }
            );
    }

    function register(req, resp) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        resp.status(400).send("Username: " + username + " is already in use.");
                    }
                    else {
                        password = bcrypt.hashSync(password);
                        user = {
                            username: username,
                            password: password
                        };
                        return userModel
                            .createUser(user);
                    }
                },
                function (error) {
                    resp.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                resp.status(400).send(err);
                            } else {
                                resp.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    resp.status(400).send(error);
                }
            )
    }

    function login(req, resp) {
        var user = req.user;
        resp.json(user);
    }

    function deleteUser(req, resp) {
        var userId = req.params["userId"];

        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    resp.status(404).send("User with id: " + userId + " could not be deleted. User not found.");
                }
            );
    }

    function updateUser(req, resp) {
        var userId = req.params["userId"];
        var newUser = req.body;
        delete newUser['_id'];

        userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " was not found. Update failed.");
                }
            );
    }

    function findUserById(req, resp) {
        var userId = req.params["userId"];

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " was not found.");
                }
            );
    }

    function search(req, resp) {
        var searchText = req.params["text"];

        userModel
            .search(searchText)
            .then(
                function (users) {
                    resp.json(users);
                },
                function (err) {
                    resp.status(400).send(err);
                }
            );
    }

    function getUsers(req, resp) {
        var username = req.query["username"];
        var password = req.query["password"];
        if (username && password) {
            findUserByCredentials(username, password, req, resp);
        } else if (username) {
            findUserByUsername(username, req, resp);
        } else {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        resp.json(users);
                    },
                    function (err) {
                        resp.status(400).send(err);
                    }
                );
        }
    }

    function findUserByCredentials(username, password, req, resp) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    resp.json(user[0]);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " was not found.");
                }
            );
    }

    function findUserByUsername(username, req, resp) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    resp.json(user[0]);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " was not found.");
                }
            );
    }

    function loggedIn(req, resp) {
        resp.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }
};