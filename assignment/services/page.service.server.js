/**
 * Created by Ben on 6/1/16.
 * Allows for page CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app) {
    /* DB Model */
    var pageModel = models.pageModel;

    /* Data */
    var pages =
        [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

    /* Paths that are allowed. */
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    /* Functions */
    function createPage(req, resp) {
        var newPage = req.body;
        newPage.websiteId = req.params["websiteId"];

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    resp.json(page);
                },
                function (error) {
                    resp.status(400).send("Page creation failed.");
                }
            );
    }

    function findPagesByWebsiteId(req, resp) {
        var websiteId =  req.params["websiteId"];

        pageModel
            .findPagesByWebsiteId(websiteId)
            .then(
                function (page) {
                    resp.json(page);
                },
                function (error) {
                    resp.status(400).send("Website with id: " + websiteId + " has no pages.");
                }
            );
    }

    function findPageById(req, resp) {
        var pageId =  req.params["pageId"];

        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    resp.json(page);
                },
                function (error) {
                    resp.status(400).send("Page with id: " + pageId + " was not found.");
                }
            );
    }

    function updatePage(req, resp) {
        var pageId =  req.params["pageId"];
        var newPage = req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(
                function (page) {
                    resp.json(page);
                },
                function (error) {
                    resp.status(400).send("Page with id: " + pageId + " was not found. Update failed.");
                }
            );
    }

    function deletePage(req, resp) {
        var pageId =  req.params["pageId"];

        pageModel
            .deletePage(pageId)
            .then(
                function (page) {
                    resp.json(page);
                },
                function (error) {
                    resp.status(400).send("Page with id: " + pageId + " was not found. Delete failed.");
                }
            );
    }
};