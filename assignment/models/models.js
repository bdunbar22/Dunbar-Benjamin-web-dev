/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var userModel = require("./user/user.model.server");
    var websiteModel = require("./website/website.model.server");
    var pageModel = require("./page/page.model.server");
    var widgetModel = require("./widget/widget.model.server");


    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};