/**
 * Created by Ben on 5/25/16.
 * Allows for API calls to the server to give CRUD operations.
 * Gives operations for the Post services.
 */

(function () {
    angular
        .module("BenProject")
        .factory("PostService", PostService);

    function PostService($http) {
        var api = {
            createPost: createPost,
            findPostsByUser: findPostsByUser,
            findPostById: findPostById,
            findAll: findAll,
            updatePost: updatePost,
            deletePost: deletePost
        };
        return api;

        function createPost(userId, post) {
            var url = "/project/api/user/" + userId + "/post";
            return $http.post(url, post);
        }

        function findPostsByUser(userId) {
            var url = "/project/api/user/" + userId + "/post";
            return $http.get(url);
        }

        function findPostById(postId) {
            var url = "/project/api/post/" + postId;
            return $http.get(url);
        }

        function findAll() {
            var url = "/project/api/post/";
            return $http.get(url);
        }

        function updatePost(postId, post) {
            var url = "/project/api/post/" + postId;
            return $http.put(url, post);
        }

        function deletePost(postId) {
            var url = "/project/api/post/" + postId;
            return $http.delete(url);
        }
    }
})();