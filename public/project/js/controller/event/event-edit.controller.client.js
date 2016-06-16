/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("EditEventController", EditEventController);

    function EditEventController($routeParams, $location, EventService) {
        var vm = this;
        vm.updateEvent = updateEvent;
        vm.deleteEvent = deleteEvent;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.eventId = $routeParams["eid"];
            EventService
                .findEventById(vm.eventId)
                .then(function (resp) {
                    vm.event = resp.data;
                });
        }
        init();

        function updateEvent() {
            EventService
                .updateEvent(vm.eventId, vm.event)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/event");
                },
                function (error) {
                    vm.error = error.data;
                });
        }

        function deleteEvent() {
            EventService
                .deleteEvent(vm.eventId)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/event");
                },
                function (error) {
                    vm.error = error.data;
                });
        }
    }
})();