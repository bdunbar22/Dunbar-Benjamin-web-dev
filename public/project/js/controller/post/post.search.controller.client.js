/**
 * Created by Ben on 6/21/16.
 */


(function () {
    angular
        .module("BenProject")
        .controller("PostSearchController", PostSearchController);

    function PostSearchController(PostService) {
        var vm = this;
        vm.search = search;

        function init() {
            PostService
                .findAllPosts()
                .then(function (resp) {
                    vm.posts = resp.data;
                }, function (error) {
                    vm.posts = [];
                    vm.message = error.data;
                })
        }
        init();

        function search(text) {
            PostService
                .search(text)
                .then(function (resp) {
                    vm.posts = resp.data;
                }, function (error) {
                    vm.posts = [];
                    vm.message = error.data;
                });
        }
    }
})();