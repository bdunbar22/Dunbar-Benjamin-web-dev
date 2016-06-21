/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        events: [mongoose.Schema.Types.ObjectId],
        competitions: [mongoose.Schema.Types.ObjectId],
        posts: [mongoose.Schema.Types.ObjectId],
        following: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.user"});

    return UserSchema;
};