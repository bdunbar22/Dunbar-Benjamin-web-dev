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
    }
})();