/**
 * Created by Ben on 6/21/16.
 */


(function () {
    angular
        .module("BenProject")
        .controller("CompetitionSearchController", CompetitionSearchController);

    function CompetitionSearchController(CompetitionService) {
        var vm = this;
        vm.search = search;

        function init() {
            CompetitionService
                .findAllCompetitions()
                .then(function (resp) {
                    vm.competitions = resp.data;
                }, function (error) {
                    vm.competitions = [];
                    vm.message = error.data;
                })
        }
        init();

        function search(text) {
            CompetitionService
                .search(text)
                .then(function (resp) {
                    vm.competitions = resp.data;
                }, function (error) {
                    vm.competitions = [];
                    vm.message = error.data;
                });
        }
    }
})();