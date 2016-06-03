/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (resp) {
                    vm.website = resp.data;
                });
        }
        init();

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/website");
                },
                function (error) {
                    vm.error = error.data;
                });
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/website");
                },
                function (error) {
                    vm.error = error.data;
                });
        }
    }
})();