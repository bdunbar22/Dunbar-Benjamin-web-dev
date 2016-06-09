/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://127.0.0.1:27017/WebDev2016/project';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server")();
    var eventModel = require("./event/event.model.server")();
    var competitionModel = require("./competition/competition.model.server")();
    var postModel = require("./post/post.model.server")();


    var models = {
        userModel: userModel,
        eventModel: eventModel,
        competitionModel: competitionModel,
        postModel: postModel
    };

    return models;
};