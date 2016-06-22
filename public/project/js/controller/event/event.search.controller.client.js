/**
 * Created by Ben on 6/21/16.
 */


(function () {
    angular
        .module("BenProject")
        .controller("EventSearchController", EventSearchController);

    function EventSearchController(EventService) {
        var vm = this;
        vm.search = search;

        function init() {
            EventService
                .findAllEvents()
                .then(function (resp) {
                    vm.events = resp.data;
                }, function (error) {
                    vm.events = [];
                    vm.message = error.data;
                })
        }
        init();

        function search(text) {
            EventService
                .search(text)
                .then(function (resp) {
                    vm.events = resp.data;
                }, function (error) {
                    vm.events = [];
                    vm.message = error.data;
                });
        }
    }
})();