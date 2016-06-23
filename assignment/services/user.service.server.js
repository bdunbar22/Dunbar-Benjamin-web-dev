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
    var bcrypt = require('bcrypt-nodejs');

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    /* Paths that are allowed. */
    app.post("/api/user/", createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/register", register);
    app.get("/api/user/", getUsers);
    app.get("/api/loggedin", loggedIn);
    app.post("/api/logout", logout);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", auth, deleteUser);
    /* Facebook */
    app.get("/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
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
                }
            )
            .then(
                function (user) {
                    return done(null, user);
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
                    resp.status(400).send(error);
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

    function getUsers(req, resp) {
        var username = req.query["username"];
        var password = req.query["password"];
        if (username && password) {
            findUserByCredentials(username, password, req, resp);
        } else if (username) {
            findUserByUsername(username, req, resp);
        } else {
            //In the future maybe check if admin.
            resp.status(400).send("Username nor password provided.");
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