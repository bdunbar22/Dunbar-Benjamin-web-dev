/**
 * Created by Ben on 5/25/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
                { "_id": "678", "name": "Checkers",    "developerId": "123" },
                { "_id": "789", "name": "Chess",       "developerId": "234" }
            ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByDeveloperId: findWebsitesByDeveloperId
        };
        return api;

        function createWebsite() {
            //TODO: implement
            return null;
        }

        function findWebsitesByDeveloperId(id) {
            var websitesForUser = [];
            for(var i in websites) {
                if(websites[i].developerId === id) {
                    websitesForUser.push(websites[i]);
                }
            }
            return websitesForUser;
        }
    }
})();