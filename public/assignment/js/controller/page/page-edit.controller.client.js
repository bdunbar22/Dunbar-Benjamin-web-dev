/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage() {
            if(PageService.updatePage(vm.pageId, vm.page)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Error editing page.";
                return false;
            }
        }

        function deletePage() {
            if(PageService.deletePage(vm.pageId)) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Error deleting page.";
                return false;
            }
        }
    }
})();