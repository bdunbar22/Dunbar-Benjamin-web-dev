/**
 * Created by Ben on 6/1/16.
 * Allows for user CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    
    /* Data */
    var users = 
        [
            {_id: "123", username: "alice", password: "alice", email: "", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", email: "", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", email: "", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "", firstName: "Jose", lastName: "Annunzi"}
        ];

    /* Paths that are allowed. */
    app.post("/api/user/", createUser);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/register", register);
    app.get("/api/user/", getUsers);
    //Above covers query cases:
    //api/user/?username=username
    //api/user/?username=username&password=password
    app.get("/api/loggedin", loggedIn);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    passport.use('wam', new LocalStrategy(localStrategy));
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
                    if(user.username === username && user.password === password) {
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
};