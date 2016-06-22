/**
 * Created by Ben on 6/21/16.
 */


(function () {
    angular
        .module("BenProject")
        .controller("UserSearchController", UserSearchController);

    function UserSearchController(UserService) {
        var vm = this;
        vm.search = search;

        function init() {
            UserService
                .findAllUsers()
                .then(function (resp) {
                    vm.users = resp.data;
                }, function (error) {
                    vm.users = [];
                    vm.message = error.data;
                })
        }
        init();

        function search(text) {
            UserService
                .search(text)
                .then(function (resp) {
                    vm.users = resp.data;
                }, function (error) {
                    vm.users = [];
                    vm.message = error.data;
                })
        }
    }
})();