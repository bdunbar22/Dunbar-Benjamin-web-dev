/**
 * Created by Ben on 5/31/16.
 */

module.exports = function(app) {

    var models = require("./models/models")();

    /**
     * Get the services from the different service files.
     */
    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);

    /**
     * Examples of how to use paths.
     */
    /*
    //Normal path
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
    */
};