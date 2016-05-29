/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();
    }
})();