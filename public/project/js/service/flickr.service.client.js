/**
 * Created by Ben on 6/1/16.
 * Allow for searching flicker.
 */

(function () {
    angular
        .module("BenProject")
        .factory("FlickrService", FlickrService);

    var key = "4326986b134c5de067c08d4864466764";
    var secret = "84166642b066cc00";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
                  "&format=json&api_key=API_KEY&text=TEXT&callback=JSON_CALLBACK";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();