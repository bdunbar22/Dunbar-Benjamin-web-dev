/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EditCompetitionController", EditCompetitionController);

    function EditCompetitionController($routeParams, $location, CompetitionService) {
        var vm = this;
        vm.updateCompetition = updateCompetition;
        vm.deleteCompetition = deleteCompetition;
        vm.addJudge = addJudge;
        vm.removeJudge = removeJudge;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.competitionId = $routeParams["eid"];
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
            vm.competition.judges.push(judgeId);
            CompetitionService
                .updateCompetition(vm.competitionId, vm.competition)
                .then(function (resp) {
                    vm.success = "Updated Competition."
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
    }
})();