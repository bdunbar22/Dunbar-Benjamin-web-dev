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
            vm.eventId = $routeParams["eid"];
            EventService
                .findEventById(vm.eventId)
                .then(function (resp) {
                    vm.event = resp.data;
                    vm.userId = vm.event._user;
                });

            if($rootScope.currentUser) {
                vm.currentUser = $rootScope.currentUser;
            }
        }
        init();

        function joinEvent() {
            if(vm.currentUser) {
                if(vm.event.participants.indexOf(vm.currentUser._id) != -1) {
                    vm.error = "You have already joined this event.";
                    return;
                }
                vm.event.participants.push(vm.currentUser._id);
                EventService
                    .updateEvent(vm.eventId, vm.event)
                    .then(function (resp) {
                            vm.success = "Joined event.";
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            } else {
                vm.error = "You are not logged in.";
            }
        }
    }
})();