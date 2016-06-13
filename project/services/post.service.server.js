/**
 * Created by Ben on 6/13/16.
 * Allows for post CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var postModel = models.postModel;

    /* Paths that are allowed. */
    app.post("/api/user/:userId/post", createWebsite);
    app.get("/api/user/:userId/post", findWebsitesByUser);
    app.get("/api/post/:postId", findWebsiteById);
    app.put("/api/post/:postId", updateWebsite);
    app.delete("/api/post/:postId", deleteWebsite);

    /* Functions */
    function createWebsite(req, resp) {
        var newWebsite = req.body;
        var developerId = req.params["userId"];

        postModel
            .createWebsite(developerId, newWebsite)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Website creation failed.");
                }
            );
    }

    function findWebsitesByUser(req, resp) {
        var userId =  req.params["userId"];

        postModel
            .findWebsitesByUser(userId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " has no posts.");
                }
            );
    }

    function findWebsiteById(req, resp) {
        var postId =  req.params["postId"];

        postModel
            .findWebsiteById(postId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + postId + " not found.");
                }
            );
    }

    function updateWebsite(req, resp) {
        var postId =  req.params["postId"];
        var newWebsite = req.body;

        postModel
            .updateWebsite(postId, newWebsite)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + postId + " not found.");
                }
            );
    }

    function deleteWebsite(req, resp) {
        var postId =  req.params["postId"];

        postModel
            .deleteWebsite(postId)
            .then(
                function (post) {
                    resp.json(post);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + postId + " not found.");
                }
            );
    }
};