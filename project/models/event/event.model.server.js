/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var EventSchema = require("./event.schema.server.js")();
    var Event = mongoose.model("Event", EventSchema);

    var api = {
        createEvent: createEvent,
        findEventsByUser: findEventsByUser,
        findEventById: findEventById,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent
    };
    return api;

    function createEvent(userId, event) {
        event._user =  userId;
        return Event.create(event);
    }

    function findEventsByUser(userId) {
        return Event.find({_user: userId});
    }

    function findEventById(eventId) {
        return Event.findById(eventId);
    }

    function updateEvent(eventId, event) {
        return Event.update({_id: eventId}, {$set: event});
    }

    function deleteEvent(eventId) {
        return Event.remove({_id: eventId});
    }
};