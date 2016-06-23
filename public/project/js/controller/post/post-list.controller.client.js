/**
 * Created by Ben on 6/13/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("PostListController", PostListController);
    
    function PostListController($routeParams, $sce, PostService) {
        var vm = this;
        vm.getTrustedUrl = getTrustedUrl;

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

        function getTrustedUrl(post) {
            var urlParts = post.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();