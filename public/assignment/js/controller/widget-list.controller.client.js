/**
 * Created by Ben on 5/26/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;

        vm.widgets = WidgetService.findByPageId(pageId);
    }
})();