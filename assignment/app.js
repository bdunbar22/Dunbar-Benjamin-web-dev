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

    //Could return json object of users.
    app.get("/user/", getUsers);

    //Can search for specific users.
    app.get("/user/:username", function (req, resp) {
        var username = req.params["username"];
        for(var i in users) {
            if(users[i].username === username) {
                resp.send(users[i]);
            }
        }
    });

    function getUsers(req, resp) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            findUserByCredentials(username, password, resp);
        }
        if(username) {
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
            }
        }
    }

    function findUserByUsername(username, resp) {
        for(var i in users) {
            if(users[i].username === username) {
                resp.send(users[i]);
            }
        }
    }
};