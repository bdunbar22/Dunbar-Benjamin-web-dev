/**
 * Created by Ben on 6/1/16.
 * Allows for website CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var websiteModel = models.websiteModel;

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
        var developerId = req.params["userId"];

        websiteModel
            .createWebsite(developerId, newWebsite)
            .then(
                function (website) {
                    resp.json(website);
                },
                function (error) {
                    resp.status(400).send("Website creation failed.");
                }
            );
    }

    function findWebsitesByUser(req, resp) {
        var userId =  req.params["userId"];

        websiteModel
            .findWebsitesByUser(userId)
            .then(
                function (website) {
                    resp.json(website);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " has no websites.");
                }
            );
    }

    function findWebsiteById(req, resp) {
        var websiteId =  req.params["websiteId"];

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    resp.json(website);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + websiteId + " not found.");
                }
            );
    }

    function updateWebsite(req, resp) {
        var websiteId =  req.params["websiteId"];
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (website) {
                    resp.json(website);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + websiteId + " not found.");
                }
            );
    }

    function deleteWebsite(req, resp) {
        var websiteId =  req.params["websiteId"];

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (website) {
                    resp.json(website);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + websiteId + " not found.");
                }
            );
    }
};