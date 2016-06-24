/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EditCompetitionController", EditCompetitionController);

    function EditCompetitionController($routeParams, $rootScope, CompetitionService, PostService) {
        var vm = this;
        vm.addPost = addPost;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.competitionId = $routeParams["cid"];
            CompetitionService
                .findCompetitionById(vm.competitionId)
                .then(function (resp) {
                    vm.competition = resp.data;
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
                        vm.competition.posts.push(postId);
                        CompetitionService
                            .updateCompetition(vm.competitionId, vm.competition);
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