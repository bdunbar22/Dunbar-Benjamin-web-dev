/**
 * Created by Ben on 5/26/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getTrustedUrl(widget) {
            var urlParts = widget.url.split("/");
            var urlId = urlParts[urlParts.length - 1];
            var urlToEmbed = "https://www.youtube.com/embed/" + urlId;
            $sce.trustAsResourceUrl(urlToEmbed);
            return urlToEmbed;
        }
    }
})();