/**
 * Created by Ben on 6/13/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EditPostController", EditPostController);

    function EditPostController($routeParams, $location, PostService) {
        var vm = this;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.postId = $routeParams["pid"];
            PostService
                .findPostById(vm.postId)
                .then(function (resp) {
                    vm.post = resp.data;
                });
        }
        init();

        function updatePost() {
            PostService
                .updatePost(vm.postId, vm.post)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/post");
                },
                function (error) {
                    vm.error = error.data;
                });
        }

        function deletePost() {
            PostService
                .deletePost(vm.postId)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/post");
                },
                function (error) {
                    vm.error = error.data;
                });
        }
    }
})();