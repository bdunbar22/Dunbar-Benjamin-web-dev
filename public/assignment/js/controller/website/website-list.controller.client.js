/**
 * Created by Ben on 5/25/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams["uid"];
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (resp) {
                    vm.websites = resp.data;
                }, function (error) {
                    vm.websites = [];
                    vm.message = "You have no websites right now.";
                })
        }
        init();
    }
})();