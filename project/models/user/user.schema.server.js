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
        trophyCount: Number,
        age: Number,
        events: [mongoose.Schema.Types.ObjectId],
        competitions: [mongoose.Schema.Types.ObjectId],
        posts: [mongoose.Schema.Types.ObjectId],
        following: [mongoose.Schema.Types.ObjectId],
        followers: [mongoose.Schema.Types.ObjectId],
        facebook: {
            id: String,
            token: String,
            displayName: String
        },
        google: {
            id: String,
            token: String,
            displayName: String
        },
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.user"});

    return UserSchema;
};