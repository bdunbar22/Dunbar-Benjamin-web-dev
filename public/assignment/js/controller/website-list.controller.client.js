/**
 * Created by Ben on 5/25/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
    
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams.uid;
            vm.websites = WebsiteService.findWebsitesByDeveloperId(vm.userId);
        }
        init();
    }
})();