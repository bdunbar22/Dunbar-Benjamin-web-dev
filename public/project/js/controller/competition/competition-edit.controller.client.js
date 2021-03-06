/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EditCompetitionController", EditCompetitionController);

    function EditCompetitionController($routeParams, $location, CompetitionService, UserService) {
        var vm = this;
        vm.updateCompetition = updateCompetition;
        vm.deleteCompetition = deleteCompetition;
        vm.addJudge = addJudge;
        vm.removeJudge = removeJudge;
        vm.computeWinner = computeWinner;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.competitionId = $routeParams["cid"];
            CompetitionService
                .findCompetitionById(vm.competitionId)
                .then(function (resp) {
                    vm.competition = resp.data;
                });
        }
        init();

        function updateCompetition() {
            CompetitionService
                .updateCompetition(vm.competitionId, vm.competition)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/competition");
                },
                function (error) {
                    vm.error = error.data;
                });
        }

        function deleteCompetition() {
            CompetitionService
                .deleteCompetition(vm.competitionId)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/competition");
                },
                function (error) {
                    vm.error = error.data;
                });
        }

        function addJudge(judgeId) {
            if(!judgeId) {
                vm.error = "Must provide judge Id.";
                return;
            }
            UserService
                .findUserById(judgeId)
                .then(
                    function (judge) {
                        judge = judge.data;
                        if(judge.userType != 'JUDGE') {
                            vm.error = "This user is not a judge.";
                        } else if(vm.competition.judges.indexOf(judge._id) != -1) {
                            vm.error = "This judge has been added already.";
                        } else {
                            vm.competition.judges.push(judge._id);
                            return CompetitionService
                                .updateCompetition(vm.competitionId, vm.competition);
                        }
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
                .then(function (resp) {
                        vm.success = "Updated Competition.";
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        function removeJudge(judgeId) {
            var array = vm.competition.judges;
            var index = array.indexOf(judgeId);

            if (index > -1) {
                array.splice(index, 1);
            } else {
                vm.error = "Couldn't find judge to remove.";
            }

            vm.competition.judges = array;

            CompetitionService
                .updateCompetition(vm.competitionId, vm.competition)
                .then(function (resp) {
                    vm.success = "Updated Competition."
                },
                function (error) {
                    vm.error = error.data;
                });
        }
        
        function computeWinner() {
            CompetitionService
                .computeWinner(vm.competition._id, vm.competition)
                .then(
                    function (resp) {
                        vm.success = "Winner computed. Competition is over.";
                    },
                    function (err) {
                        vm.error = "Could not finish competition: " + err.data;
                    }
                );
        }
    }
})();