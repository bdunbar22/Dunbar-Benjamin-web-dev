/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: Number,
        name: String,
        description: String,
        widgets: [Number],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "WebDev2016.assignment.page"});


    return PageSchema;
};