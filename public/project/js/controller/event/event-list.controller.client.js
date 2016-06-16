/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EventListController", EventListController);
    
    function EventListController($routeParams, EventService) {
        var vm = this;
        
        function init() {
            vm.userId = $routeParams["uid"];
            EventService
                .findEventsByUser(vm.userId)
                .then(function (resp) {
                    vm.events = resp.data;
                }, function (error) {
                    vm.events = [];
                    vm.message = error.data;
                })
        }
        init();
    }
})();