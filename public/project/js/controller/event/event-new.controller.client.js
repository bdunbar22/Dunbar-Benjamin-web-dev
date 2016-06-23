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

        function createEvent(name, description, when, where) {

            if(name == "" || name == null) {
                vm.error = "Event needs a name.";
                return false;
            } else if(description == "" || description == null) {
                vm.error = "Event needs a summary.";
                return false;
            }
            var event = {
                name: name,
                description: description,
                when: when,
                where: where
            };
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