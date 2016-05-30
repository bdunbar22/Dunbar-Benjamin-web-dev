/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
        }
        init();

        function createPage(name, title) {
            var page = {};
            if(name == "" || name == null) {
                vm.error = "Page needs a name.";
                return false;
            }
            page._id = (new Date()).getTime();
            page.name = name;
            page.title = title;
            if(PageService.createPage(vm.websiteId, page)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +"/page");
            } else {
                vm.error = "Error creating page.";
                return false;
            }
        }
    }
})();