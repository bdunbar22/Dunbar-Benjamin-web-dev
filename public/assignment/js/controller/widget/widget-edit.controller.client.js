/**
 * Created by Ben on 5/30/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget() {
            //TODO: update.
        }

        function deleteWidget() {
            if(WidgetService.deleteWidget(vm.widgetId)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Error deleting widget.";
                return false;
            }
        }
    }
})();