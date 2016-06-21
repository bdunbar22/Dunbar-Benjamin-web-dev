/**
 * Created by Ben on 6/21/16.
 */


(function () {
    angular
        .module("BenProject")
        .controller("UserSearchController", UserSearchController);

    function UserSearchController(UserService) {
        var vm = this;

        function init() {
            UserService
                .findAll()
                .then(function (resp) {
                    vm.users = resp.data;
                }, function (error) {
                    vm.users = [];
                    vm.message = error.data;
                })
        }
        init();
    }
})();