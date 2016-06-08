/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: String,
        name: String,
        description: String,
        widgets: [String],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "WebDev2016.assignment.page"});


    return PageSchema;
};