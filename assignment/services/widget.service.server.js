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
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var userId = req.body.userId;
        var width = req.body.width;
        var myFile = req.file; //Dedicated attribute for files.

        var originalname = myFile.originalname;
        var filename     = myFile.filename; //Service will need this filename to find the file in the future.
        var path         = myFile.path;
        var destination  = myFile.destination;
        var size         = myFile.size;
        var mimetype     = myFile.mimetype;

        var widgetFound = false;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId && widgets[i].pageId === pageId) {
                widgetFound = true;
                widgets[i].width = width;
                widgets[i].url = path;
            }
        }
        if(widgetFound) {
            resp.redirect("./../assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        } else {
            resp.status(404).send("Could not add image to widget with id: " + widgetId);
        }
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
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    /* Functions */
    function createWidget(req, resp) {

        //Example
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

    function findWidgetsByPageId(req, resp) {

        //Example
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

    function findWidgetById(req, resp) {

        //Example
        var pageId =  req.params["pageId"];
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                resp.send(pages[i]);
                return;
            }
        }
        resp.status(403).send("Could not find page with id: " + pageId);
    }

    function updateWidget(req, resp) {

        //Example
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

    function deleteWidget(req, resp) {

        //Example
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