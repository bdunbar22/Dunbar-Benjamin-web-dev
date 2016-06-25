/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("PublicCompetitionController", PublicCompetitionController);

    function PublicCompetitionController($routeParams, $rootScope, CompetitionService, PostService) {
        var vm = this;
        vm.addPost = addPost;

        function init() {
            vm.competitionId = $routeParams["cid"];
            CompetitionService
                .findCompetitionById(vm.competitionId)
                .then(function (resp) {
                    vm.competition = resp.data;
                    vm.userId = vm.competition._user;
                });

            if($rootScope.currentUser) {
                vm.currentUser = $rootScope.currentUser;
            }
        }
        init();

        function addPost(postId) {
            if(!postId) {
                vm.error = "need a post id.";
                return;
            }
            PostService
                .findPostById(postId)
                .then(
                    function (post) {
                        if(post) {
                            post = post.data;
                            if(vm.competition.posts.indexOf(post._id) != -1) {
                                vm.error = "You have already added this post.";
                                return;
                            }
                            vm.competition.posts.push(post._id);
                            CompetitionService
                                .updateCompetition(vm.competitionId, vm.competition);
                        } else {
                            vm.error = "Not a valid post.";
                        }
                    },
                    function (err) {
                        vm.error = "Not a valid post.";
                    }
                )
                .then(function (resp) {
                        vm.success = "Updated Competition."
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }
    }
})();