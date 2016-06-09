/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        pages: [String],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "WebDev2016.assignment.website"});


    return WebsiteSchema;
};