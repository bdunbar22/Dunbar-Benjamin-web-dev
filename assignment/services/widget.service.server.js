/**
 * Created by Ben on 6/1/16.
 * Allows for widget CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app) {
    /* Image upload */
    var multer = require('multer'); //npm install multer --save
    var upload = multer({dest: __dirname+'/../../public/uploads' });

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, resp) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file; //Dedicated attribute for files.

        var originalname = myFile.originalname;
        var filename     = myFile.filename; //Service will need this filename to find the file in the future.
        var path         = myFile.path;
        var destination  = myFile.destination;
        var size         = myFile.size;
        var mimetype     = myFile.mimetype;

        //TODO: find widget and update to match this new file.
    }

    /* Data */
    var widgets =
        [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    /* Paths that are allowed. */
    app.post("/api/user/", createUser);
    app.get("/api/user/", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    /* Functions */
    function createUser(req, resp) {
        var newUser = req.body;

        for (var i in users) {
            if (users[i].username === newUser.username) {
                resp.status(400).send("Username " + newUser.username + " is already in use.");
                return;
            }
        }

        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        resp.send(newUser);
    }

    function deleteUser(req, resp) {
        var userId = req.params["userId"];
        var startLength = users.length;

        var keepUsers = [];
        for (var i in users) {
            if (users[i]._id != userId) {
                keepUsers.push(users[i]);
            }
        }

        users = keepUsers;

        if (users.length < startLength) {
            resp.sendStatus(200);
        } else {
            resp.status(404).send("User with id: " + userId + " could not be deleted.");
        }
    }

    function updateUser(req, resp) {
        var userId = req.params["userId"];
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].username = newUser.username;
                users[i].email = newUser.email;
                resp.sendStatus(200);
                return;
            }
        }
        resp.status(400).send("User with id: " + userId + " was not found.");
    }

    function findUserById(req, resp) {
        var userId = req.params["userId"];
        for (var i in users) {
            if (users[i]._id === userId) {
                resp.send(users[i]);
                return;
            }
        }
        resp.sendStatus(403);
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
            resp.send(users);
        }
    }

    function findUserByCredentials(username, password, resp) {
        for (var i in users) {
            if (users[i].username === username &&
                users[i].password === password) {
                resp.send(users[i]);
                return;
            }
        }
        resp.status(403).send("Could not match username and password for user with username " + username);
    }

    function findUserByUsername(username, resp) {
        for (var i in users) {
            if (users[i].username === username) {
                resp.send(users[i]);
                return;
            }
        }
        resp.status(403).send("Could not find user with username " + username);
    }
};