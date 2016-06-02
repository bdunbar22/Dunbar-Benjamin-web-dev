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
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (resp) {
                    vm.pages = resp.data;
                }, function (error) {
                    vm.pages = [];
                    vm.message = error.data;
                })
        }
        init();
    }
})();