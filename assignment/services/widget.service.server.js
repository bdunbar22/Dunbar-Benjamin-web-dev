/**
 * Created by Ben on 6/1/16.
 * Allows for widget CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var widgetModel = models.widgetModel;
    
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
        var pageId = req.params["pageId"];
        
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    resp.json(widget);
                },
                function (error) {
                    resp.status(400).send("Widget creation failed.");
                }
            );
    }

    function findWidgetsByPageId(req, resp) {
        var pageId =  req.params["pageId"];

        widgetModel
            .findWidgetsByPageId(pageId)
            .then(
                function (widget) {
                    resp.json(widget);
                },
                function (error) {
                    resp.status(403).send("Page with id: " + pageId + " has no widgets.");
                }
            );
    }

    function findWidgetById(req, resp) {
        var widgetId =  req.params["widgetId"];

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    resp.json(widget);
                },
                function (error) {
                    resp.status(403).send("Could not find widget with id: " + widgetId);
                }
            );
    }

    function updateWidget(req, resp) {
        var widgetId =  req.params["widgetId"];
        var newWidget = req.body;

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (widget) {
                    resp.json(widget);
                },
                function (error) {
                    resp.status(400).send("Widget with id: " + widgetId + " could not be updated. Widget not found.");
                }
            );
    }

    function deleteWidget(req, resp) {
        var widgetId =  req.params["widgetId"];

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (widget) {
                    resp.json(widget);
                },
                function (error) {
                    resp.status(404).send("Widget with id: " + widgetId + " could not be deleted. Widget not found.");
                }
            );
    }
    
    /* Image upload */
    var multer = require('multer'); //npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads' });

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


        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    var widgetToEdit = widget;
                    widgetToEdit.width = width;
                    widgetToEdit.url = "/../uploads/" + filename;
                    widgetModel
                        .updateWidget(widgetId, widgetToEdit)
                        .then(
                            function (widget) {
                                resp.redirect("./../assignment/index.html#/user/" + userId + "/website/" + websiteId +
                                              "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (error) {
                                resp.status(400).send("Widget with id: " + widgetId +
                                                      " could not be updated. Widget not found.");
                            }
                        );
                },
                function (error) {
                    resp.status(404).send("Could not add image to widget with id: " + widgetId);
                }
            );
    }
};