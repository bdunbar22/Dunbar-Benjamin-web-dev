/**
 * Created by Ben on 6/1/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        /**
         * Searches photos from flickr.
         * @param searchText to use.
         */
        function searchPhotos(searchText) {
            var url = "/api/user";
            return $http.post(url, user);
        }
    }
})();