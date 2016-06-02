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
            website.name = name;
            website.description = description;
            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();