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

        function init() {
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite() {
            if(WebsiteService.updateWebsite(vm.websiteId, vm.website)) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Error editing website.";
                return false;
            }
        }
    }
})();