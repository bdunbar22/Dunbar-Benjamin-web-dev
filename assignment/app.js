/**
 * Created by Ben on 5/31/16.
 */

module.exports = function(app) {
    //Normal
    app.get("/sayHello", function () {
        console.log("Hello from the server.");
    });

    //Variable sent
    //Add a colon to get a variable.
    //Can retrieve the variable using a request.
    app.get("/say/:message", function (request) {
        var note = request.params["message"];
        console.log("Hello from the server. Message: " + note);
    });

    //Variable sent
    //Add a colon to get a variable.
    //Can retrieve the variable using a request.
    //Response returned.
    app.get("/talk/:message", function (request, resp) {
        var note = request.params["message"];
        resp.send({message: note});
        console.log("Hello from the server. Message: " + note);
    });

    /* User service practice */

    var users = [
        {_id: "123", username: "alice",    password: "alice",    email: "", firstName: "Alice",  lastName: "Wonder"},
        {_id: "234", username: "bob",      password: "bob",      email: "", firstName: "Bob",    lastName: "Marley"},
        {_id: "345", username: "charly",   password: "charly",   email: "", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", email: "", firstName: "Jose",   lastName: "Annunzi"}
    ];

    //Paths that are allowed.
    app.post("/api/user/", createUser);
    app.get("/api/user/", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, resp) {
        var newUser = req.body;
        
        for(var i in users) {
            if(users[i].username === newUser.username) {
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
        for(var i in users) {
            if(users[i]._id != userId) {
                keepUsers.push(users[i]);
            }
        }

        users = keepUsers;

        if(users.length < startLength) {
            resp.send(200);
        } else {
            resp.send(404, "User with id: " + userId + " could not be deleted.");
        }
    }

     function updateUser(req, resp) {
         var userId = req.params["userId"];
         var newUser = req.body;
         for(var i in users) {
             if(users[i]._id == userId) {
                 users[i].firstName = newUser.firstName;
                 users[i].lastName = newUser.lastName;
                 users[i].username = newUser.username;
                 users[i].email = newUser.email;
                 resp.send(200);
                 return;
             }
         }
         resp.send(400, "User with id: " + userId + " was not found.");
     }

    function findUserById(req, resp) {
        var userId = req.params["userId"];
        for(var i in users) {
            if(users[i]._id === userId) {
                resp.send(users[i]);
                return;
            }
        }
        resp.send(403);
    }

    function getUsers(req, resp) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, resp);
        } else if(username) {
            findUserByUsername(username, resp);
        } else {
            //In the future maybe check if admin.
            resp.send(users);
        }
    }

    function findUserByCredentials(username, password, resp) {
        for(var i in users) {
            if(users[i].username === username &&
               users[i].password === password) {
                resp.send(users[i]);
                return;
            }
        }
        resp.send(403);
    }

    function findUserByUsername(username, resp) {
        for(var i in users) {
            if(users[i].username === username) {
                resp.send(users[i]);
                return;
            }
        }
        resp.send(403);
    }
};