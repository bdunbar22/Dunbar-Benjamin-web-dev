/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("CompetitionListController", CompetitionListController);
    
    function CompetitionListController($routeParams, CompetitionService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams["uid"];
            CompetitionService
                .findCompetitionsByUser(vm.userId)
                .then(function (resp) {
                    vm.competitions = resp.data;
                }, function (error) {
                    vm.competitions = [];
                    vm.message = error.data;
                })
        }
        init();
    }
})();