/**
 * Created by Ben on 5/26/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        var pageId = $routeParams.pid;

        vm.userId = $routeParams.uid;
        vm.widgets = WidgetService.findByPageId(pageId);

        vm.getTrustedHtml = getTrustedHtml;
        vm.getTrustedUrl = getTrustedUrl;

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.txt);
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