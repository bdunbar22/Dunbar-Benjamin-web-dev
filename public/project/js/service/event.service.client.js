/**
 * Created by Ben on 6/16/16.
 * Allows for API calls to the server to give CRUD operations.
 * Gives operations for the Event services.
 */

(function () {
    angular
        .module("BenProject")
        .factory("EventService", EventService);

    function EventService($http) {
        var api = {
            createEvent: createEvent,
            findEventsByUser: findEventsByUser,
            findEventById: findEventById,
            findAllEvents: findAllEvents,
            search: search,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent
        };
        return api;

        function createEvent(userId, event) {
            var url = "/project/api/user/" + userId + "/event";
            return $http.post(url, event);
        }

        function findEventsByUser(userId) {
            var url = "/project/api/user/" + userId + "/event";
            return $http.get(url);
        }

        function findEventById(eventId) {
            var url = "/project/api/event/" + eventId;
            return $http.get(url);
        }
        
        function findAllEvents() {
            var url = "/project/api/event/";
            return $http.get(url);
        }

        function search(text) {
            var url = "/project/api/event/search/" + text;
            return $http.get(url);
        }

        function updateEvent(eventId, event) {
            var url = "/project/api/event/" + eventId;
            return $http.put(url, event);
        }

        function deleteEvent(eventId) {
            var url = "/project/api/event/" + eventId;
            return $http.delete(url);
        }
    }
})();