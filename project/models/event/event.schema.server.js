/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var EventSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        participants: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.event"});

    return EventSchema;
};