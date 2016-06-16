/**
 * Created by Ben on 6/16/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("NewEventController", NewEventController);

    function NewEventController($routeParams, $location, EventService) {
        var vm = this;
        vm.createEvent = createEvent;

        function init() {
            vm.userId = $routeParams["uid"];
        }
        init();

        function createEvent(name, description) {
            var event = {};
            if(name == "" || name == null) {
                vm.error = "Event needs a name.";
                return false;
            }
            event.name = name;
            event.description = description;
            EventService
                .createEvent(vm.userId, event)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/event");
                }, function (error) {
                    vm.error = error.data;
                    return false;
                });
        }
    }
})();