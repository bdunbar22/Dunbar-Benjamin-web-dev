/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var EventSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        when: String,
        where: String,
        participants: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.event"});

    /* 
     * Note: when and where are left as strings so they can be included in the text query.
     * It is possible to query dates, but would require too much time to implement given the short semester.
     */

    return EventSchema;
};