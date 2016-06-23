/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("NewCompetitionController", NewCompetitionController);

    function NewCompetitionController($routeParams, $location, CompetitionService) {
        var vm = this;
        vm.createCompetition = createCompetition;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();

        function createCompetition(name, description, judgingStarts) {
            var competition = {};
            if(name == "" || name == null) {
                vm.error = "Competition needs a name.";
                return false;
            }
            competition.name = name;
            competition.description = description;
            competition.judgingStarts = judgingStarts;
            CompetitionService
                .createCompetition(vm.userId, competition)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/competition");
                }, function (error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();