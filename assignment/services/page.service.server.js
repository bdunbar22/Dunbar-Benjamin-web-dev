/**
 * Created by Ben on 6/1/16.
 * Allows for page CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app) {

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

        for (var i in pages) {
            if (pages[i].name === newPage.name && pages[i].websiteId === newPage.websiteId) {
                resp.status(400).send("This website already has a page with the name: " + newPage.name + ".");
                return;
            }
        }

        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        resp.send(newPage);
    }

    function findPagesByWebsiteId(req, resp) {
        var websiteId =  req.params["websiteId"];
        var pagesForWebsite = [];
        for(var i in pages) {
            if(pages[i].websiteId === websiteId) {
                pagesForWebsite.push(pages[i]);
            }
        }
        if(pagesForWebsite.length > 0) {
            resp.send(pagesForWebsite);
            return;
        }
        resp.status(403).send("Website with id: " + websiteId + " has no pages.");
    }

    function findPageById(req, resp) {
        var pageId =  req.params["pageId"];
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                resp.send(pages[i]);
                return;
            }
        }
        resp.status(403).send("Could not find page with id: " + pageId);
    }

    function updatePage(req, resp) {
        var pageId =  req.params["pageId"];
        var newPage = req.body;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                resp.sendStatus(200);
                return;
            }
        }
        resp.status(400).send("Page with id: " + pageId + " could not be updated. Page not found.");
    }

    function deletePage(req, resp) {
        var pageId =  req.params["pageId"];
        var startLength = pages.length;

        var keepPages = [];
        for(var i in pages) {
            if(pages[i]._id != pageId) {
                keepPages.push(pages[i]);
            }
        }

        pages = keepPages;

        if (pages.length < startLength) {
            resp.sendStatus(200);
        } else {
            resp.status(404).send("Page with id: " + pageId + " could not be deleted. Page not found.");
        }
    }
};