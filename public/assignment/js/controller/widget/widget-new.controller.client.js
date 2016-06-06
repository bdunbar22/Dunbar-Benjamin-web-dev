/**
 * Created by Ben on 5/26/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType
            };
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .then(function (resp) {
                    newWidget = resp.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId +
                    "/widget/" + newWidget._id);
                }, function (error) {
                    vm.error = error.data;
                });
        }
    }
})();