/**
 * Created by Ben on 5/26/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;
        vm.sortList = sortList;

        $(".widget-container")
            .sortable({axis: "y"});

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (resp) {
                        vm.widgets = resp.data;
                    },
                    function (error) {
                        vm.widgets = [];
                        vm.message = error.data;
                    }
                );
        }
        init();

        function sortList(start, stop) {
            console.log("WidgetListController");
            console.log("start: " + start + ", stop: " + stop);
            WidgetService
                .reorderWidgetsByPageId(vm.pageId, start, stop)
                .then(
                    function (resp) {
                        vm.widgets = resp.data;
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function getTrustedHtml(widget) {
             return $sce.trustAsHtml(widget.text);
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();