/**
 * Created by Ben on 5/30/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updateWidget = updateWidget;

        function updateWidget() {
            //TODO: update.
        }
    }
})();