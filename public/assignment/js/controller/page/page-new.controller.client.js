/**
 * Created by Ben on 5/29/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();

        function createWebsite(name, description) {
            var website = {};
            if(name == "" || name == null) {
                vm.error = "Website needs a name.";
                return false;
            }
            website._id = (new Date()).getTime();
            website.name = name;
            website.description = description;
            if(WebsiteService.createWebsite(vm.userId, website)) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Error creating website.";
                return false;
            }
        }
    }
})();