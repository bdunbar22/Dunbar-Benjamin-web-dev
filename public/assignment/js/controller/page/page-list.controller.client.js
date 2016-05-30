/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();
    }
})();