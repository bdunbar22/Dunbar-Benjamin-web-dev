/**
 * Created by Ben on 6/6/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgetsByPageId: reorderWidgetsByPageId
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        var widgets = Widget.find({_page: pageId});
        widget.order = widgets.length;
        return Widget.create(widget);
    }

    function findWidgetsByPageId(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return Widget.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    function reorderWidgetsByPageId(pageId, start, end) {
        var widgets = Widget.find({_page: pageId});

        for(var i in widgets) {
            var widget = widgets[i];

            if(start < end) {
                if(widget.order >= start && widget.order < end) {
                    widget.order --;
                    widget.save();
                } else if(widget.order === start) {
                    widget.order = end;
                    widget.save();
                }
            } else {
                if(widget.order >= start && widget.order < end) {
                    widget.order ++;
                    widget.save();
                } else if(widget.order === end) {
                    widget.order = start;
                    widget.save();
                }
            }
        }
        return Widget.find({_page: pageId});
    }
};