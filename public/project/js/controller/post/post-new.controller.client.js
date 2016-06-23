/**
 * Created by Ben on 6/13/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("NewPostController", NewPostController);

    function NewPostController($routeParams, $location, $scope, PostService) {
        var vm = this;
        //Give Default Radio choice
        $scope.postType = "VIDEO";
        vm.createPost = createPost;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();

        function createPost(name, description, postType) {
            if(name == "" || name == null) {
                vm.error = "Post needs a name.";
                return false;
            } else if(postType == "" || postType == null) {
                vm.error = "Post needs a type.";
                return false;
            }
            var post = {
                name: name,
                description: description,
                postType: postType
            };
            PostService
                .createPost(vm.userId, post)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/post");
                }, function (error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();