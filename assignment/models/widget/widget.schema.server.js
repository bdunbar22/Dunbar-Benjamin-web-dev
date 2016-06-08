/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: String,
        widgetType: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "WebDev2016.assignment.widget"});

    return WidgetSchema;
};
