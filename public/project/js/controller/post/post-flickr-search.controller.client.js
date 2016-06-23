/**
 * Created by Ben on 6/1/16.
 */

(function () {
    angular
        .module("BenProject")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, PostService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            vm.userId = $routeParams["uid"];
            vm.postId = $routeParams["pid"];
            PostService
                .findPostById(vm.postId)
                .then(function (resp) {
                    vm.post = resp.data;
                });
        }
        init();

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        var data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        //Update the url to be the url of the chosen photo.
        function selectPhoto(photo) {
            if(!vm.post) {
                vm.error = "Could not update post. Post not found.";
                return;
            }
            vm.post.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id +
                            "_" + photo.secret + "_s.jpg";
            PostService
                .updatePost(vm.postId, vm.post)
                .then(function (resp) {
                    $location.url("/user/" + vm.userId + "/post");
                }, function (error) {
                    vm.error = error.data;
                });
        }
    }
})();

