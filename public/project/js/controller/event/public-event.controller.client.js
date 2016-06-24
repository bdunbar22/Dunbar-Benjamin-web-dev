/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("PublicEventController", PublicEventController);

    function PublicEventController($routeParams, $rootScope, EventService) {
        var vm = this;
        vm.joinEvent = joinEvent;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.eventId = $routeParams["eid"];
            EventService
                .findEventById(vm.eventId)
                .then(function (resp) {
                    vm.event = resp.data;
                });

            if($rootScope.currentUser) {
                vm.currentUser = $rootScope.currentUser;
            }
        }
        init();

        function joinEvent() {
            if(vm.currentUser) {
                vm.event.participants.push(vm.currentUser._id);
                EventService
                    .updateEvent(vm.eventId, vm.event)
                    .then(function (resp) {
                            vm.message = "Joined event.";
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }
        }
    }
})();