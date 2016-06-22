/**
 * Created by Ben on 6/1/16.
 * Allows for user CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

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
    app.get("/project/api/user/:userId", findUserById);
    app.put("/project/api/user/:userId", updateUser);
    app.delete("/project/api/user/:userId", deleteUser);


    passport.use('benProject', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    /**
     *  Passport Functions
     */
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
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user && user.username === username && user.password === password) {
                        return done(null, user);
                    }
                    else {
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
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user) {
                        resp.status(400).send("Username: " + username + " is already in use.");
                    }
                    else {
                        return userModel
                            .createUser(req.body);
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
};