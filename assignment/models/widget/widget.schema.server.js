/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: String,
        type: String,
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: Number,
        height: Number,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date
    }, {collection: "WebDev2016.assignment.widget"});

    return WidgetSchema;
};
