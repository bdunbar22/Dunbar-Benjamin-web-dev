/**
 * Created by Ben on 6/13/16.
 * Allows for event CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var eventModel = models.eventModel;

    /* Paths that are allowed. */
    app.post("/project/api/user/:userId/event", createEvent);
    app.get("/project/api/user/:userId/event", findEventsByUser);
    app.get("/project/api/event/:eventId", findEventById);
    app.get("/project/api/event/", findAll);
    app.put("/project/api/event/:eventId", updateEvent);
    app.delete("/project/api/event/:eventId", deleteEvent);

    /* Functions */
    function createEvent(req, resp) {
        var newEvent = req.body;
        var userId = req.params["userId"];

        eventModel
            .createEvent(userId, newEvent)
            .then(
                function (event) {
                    resp.json(event);
                },
                function (error) {
                    resp.status(400).send("Event creation failed.");
                }
            );
    }

    function findEventsByUser(req, resp) {
        var userId =  req.params["userId"];

        eventModel
            .findEventsByUser(userId)
            .then(
                function (event) {
                    resp.json(event);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " has no events.");
                }
            );
    }

    function findEventById(req, resp) {
        var eventId =  req.params["eventId"];

        eventModel
            .findEventById(eventId)
            .then(
                function (event) {
                    resp.json(event);
                },
                function (error) {
                    resp.status(400).send("Event with id: " + eventId + " not found.");
                }
            );
    }

    function findAll(req, resp) {
        eventModel
            .findAll()
            .then(
                function (events) {
                    resp.json(events);
                },
                function (error) {
                    resp.status(400).send(error);
                }
            );
    }

    function updateEvent(req, resp) {
        var eventId =  req.params["eventId"];
        var newEvent = req.body;

        eventModel
            .updateEvent(eventId, newEvent)
            .then(
                function (event) {
                    resp.json(event);
                },
                function (error) {
                    resp.status(400).send("Event with id: " + eventId + " not found.");
                }
            );
    }

    function deleteEvent(req, resp) {
        var eventId =  req.params["eventId"];

        eventModel
            .deleteEvent(eventId)
            .then(
                function (event) {
                    resp.json(event);
                },
                function (error) {
                    resp.status(400).send("Event with id: " + eventId + " not found.");
                }
            );
    }
};