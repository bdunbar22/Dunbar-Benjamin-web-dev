/**
 * Created by Ben on 6/1/16.
 * Allows for website CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app) {

    /* Data */
    var websites =
        [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

    /* Paths that are allowed. */
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    /* Functions */
    function createWebsite(req, resp) {
        var newWebsite = req.body;
        newWebsite.developerId = req.params["userId"];

        for (var i in websites) {
            if (websites[i].name === newWebsite.name && websites[i].developerId === newWebsite.developerId) {
                resp.status(400).send("You already have a website with the name: " + newWebsite.name + ".");
                return;
            }
        }

        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        resp.send(newWebsite);
    }

    function findWebsitesByUser(req, resp) {
        var userId =  req.params["userId"];
        var websitesForUser = [];
        for(var i in websites) {
            if(websites[i].developerId === userId) {
                websitesForUser.push(websites[i]);
            }
        }
        if(websitesForUser.length > 0) {
            resp.send(websitesForUser);
            return;
        }
        resp.status(403).send("User with id: " + userId + " has no websites.");
    }

    function findWebsiteById(req, resp) {
        var websiteId =  req.params["websiteId"];
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                resp.send(websites[i]);
                return;
            }
        }
        resp.status(403).send("Could not find website with id: " + websiteId);
    }

    function updateWebsite(req, resp) {
        var websiteId =  req.params["websiteId"];
        var newWebsite = req.body;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                websites[i].name = newWebsite.name;
                websites[i].developerId = newWebsite.developerId;
                resp.sendStatus(200);
                return;
            }
        }
        resp.status(400).send("Website with id: " + websiteId + " was not found.");
    }

    function deleteWebsite(req, resp) {
        var websiteId =  req.params["websiteId"];
        var startLength = websites.length;

        var keepWebsites = [];
        for(var i in websites) {
            if(websites[i]._id != websiteId) {
                keepWebsites.push(websites[i]);
            }
        }

        websites = keepWebsites;

        if (websites.length < startLength) {
            resp.sendStatus(200);
        } else {
            resp.status(404).send("Website with id: " + websiteId + " could not be deleted.");
        }
    }
};