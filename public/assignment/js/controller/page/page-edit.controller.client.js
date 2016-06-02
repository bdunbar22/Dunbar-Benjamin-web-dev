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
            PageService
                .findPageById(vm.pageId)
                .then(function (resp) {
                    vm.page = resp.data;
                });
        }
        init();

        function updatePage() {
            PageService
                .updatePage(vm.pageId, vm.page)
                .then(function(resp) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function(error) {
                    vm.error = "Error editing page.";
                    return false;
                });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function(resp) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function(error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();