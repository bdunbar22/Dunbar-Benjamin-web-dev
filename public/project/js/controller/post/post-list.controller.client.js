/**
 * Created by Ben on 6/13/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("PostListController", PostListController);
    
    function PostListController($routeParams, PostService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams["uid"];
            PostService
                .findPostsByUser(vm.userId)
                .then(function (resp) {
                    vm.posts = resp.data;
                }, function (error) {
                    vm.posts = [];
                    vm.message = error.data;
                })
        }
        init();
    }
})();