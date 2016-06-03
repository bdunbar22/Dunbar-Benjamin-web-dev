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
        var newWidget = req.body;
        newWidget.pageId = req.params["pageId"];
        newWidget._id = (new Date()).getTime() + "";
        widgets.push(newWidget);
        resp.send(newWidget);
    }

    function findWidgetsByPageId(req, resp) {
        var pageId =  req.params["pageId"];
        var widgetsForPage = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                widgetsForPage.push(widgets[i]);
            }
        }
        if(widgetsForPage.length > 0) {
            resp.send(widgetsForPage);
            return;
        }
        resp.status(403).send("Page with id: " + pageId + " has no widgets.");
    }

    function findWidgetById(req, resp) {
        var widgetId =  req.params["widgetId"];
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                resp.send(widgets[i]);
                return;
            }
        }
        resp.status(403).send("Could not find widget with id: " + widgetId);
    }

    function updateWidget(req, resp) {
        var widgetId =  req.params["widgetId"];
        var newWidget = req.body;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                if(newWidget.widgetType === "HEADER") {
                    widgets[i].size = newWidget.size;
                }
                if(newWidget.widgetType === "HEADER" || newWidget.widgetType === "HTML") {
                    widgets[i].text = newWidget.text;
                }
                if(newWidget.widgetType === "YOUTUBE" || newWidget.widgetType === "IMAGE") {
                    widgets[i].width = newWidget.width;
                    widgets[i].url = newWidget.url;
                }
                resp.sendStatus(200);
                return;
            }
        }
        resp.status(400).send("Widget with id: " + widgetId + " could not be updated. Widget not found.");
    }

    function deleteWidget(req, resp) {
        var widgetId =  req.params["widgetId"];
        var startLength = widgets.length;

        var keepWidgets = [];
        for(var i in widgets) {
            if(widgets[i]._id != widgetId) {
                keepWidgets.push(widgets[i]);
            }
        }

        widgets = keepWidgets;

        if (widgets.length < startLength) {
            resp.sendStatus(200);
        } else {
            resp.status(404).send("Widget with id: " + widgetId + " could not be deleted. Widget not found.");
        }
    }
};