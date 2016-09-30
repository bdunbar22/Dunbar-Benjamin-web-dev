/**
 * Created by Ben on 6/13/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("PublicPostController", PublicPostController);
    
    function PublicPostController($routeParams, $sce, PostService) {
        var vm = this;
        vm.getTrustedUrl = getTrustedUrl;

        function init() {
            vm.postId = $routeParams["pid"];
            PostService
                .findPostById(vm.postId)
                .then(function (resp) {
                    vm.post = resp.data;
                    vm.userId = vm.post._user;
                });
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