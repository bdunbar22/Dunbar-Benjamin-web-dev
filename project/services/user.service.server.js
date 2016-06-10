/**
 * Created by Ben on 6/1/16.
 * Allows for user CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var userModel = models.userModel;
    
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
    app.get("/api/user/", getUsers);
    //Above covers query cases:
    //api/user/?username=username
    //api/user/?username=username&password=password
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    /* Functions */
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
            findUserByCredentials(username, password, resp);
        } else if (username) {
            findUserByUsername(username, resp);
        } else {
            //In the future maybe check if admin.
            resp.status(400).send("Username nor password provided.");
        }
    }

    function findUserByCredentials(username, password, resp) {
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

    function findUserByUsername(username, resp) {
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
};