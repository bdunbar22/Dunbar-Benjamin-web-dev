/**
 * Created by Ben on 6/13/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var CompetitionSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        judges: [mongoose.Schema.Types.ObjectId],
        votes: [mongoose.Schema.Types.ObjectId],
        name: String,
        description: String,
        judgingStarts: String,
        complete: {type: Boolean, default: false},
        winner: mongoose.Schema.Types.ObjectId,
        posts: [mongoose.Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "project.competition"});

    return CompetitionSchema;
};