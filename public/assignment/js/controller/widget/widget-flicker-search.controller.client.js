/**
 * Created by Ben on 6/1/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;

        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService.searchPhotos(searchText).then(function () {

            }, 
            function (error) {
                vm.error = error.data;
            });
        }
    }
})();