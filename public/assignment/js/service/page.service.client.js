/**
 * Created by Ben on 5/29/16.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages =
            [
                { "_id": "321", "name": "Post 1", "websiteId": "456" },
                { "_id": "432", "name": "Post 2", "websiteId": "456" },
                { "_id": "543", "name": "Post 3", "websiteId": "456" }
            ]

        var api = {
            createPage: createPage,
        };
        return api;

        function createPage() {
            //TODO: implement
            return null;
        }
    }
})();