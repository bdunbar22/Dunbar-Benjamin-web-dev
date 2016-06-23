/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var PostSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        description: String,
        postType: {type: String, enum: ['IMAGE', 'VIDEO', 'TEXT'], default: 'VIDEO'},
        url: String,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.post"});


    return PostSchema;
};