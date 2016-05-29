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
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        /**
         * Adds the website parameter instance to the local websites array. The new website's developerId is
         * set to the  userId parameter.
         * @param userId
         * @param website
         * @returns {null}
         */
        function createWebsite(userId, website) {
            website.developerId = userId;
            websites.push(website);
            return null;
        }

        /**
         * Retrieves the websites in local websites array whose developerId matches the parameter  userId.
         * @param userId
         * @returns {Array} websites
         */
        function findWebsitesByUser(userId) {
            var websitesForUser = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    websitesForUser.push(websites[i]);
                }
            }
            return websitesForUser;
        }

        /**
         * Retrieves the website in local websites array whose _id matches the websiteId parameter.
         * @param websiteId
         * @returns null if no website found.
         */
        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        /**
         * Updates the website in local websites array whose _id matches the websiteId parameter.
         * @param websiteId
         * @param website
         * @returns {boolean} true if updated.
         */
        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    websites[i].developerId = website.developerId;
                    return true;
                }
            }
            return false;
        }

        /**
         * Removes the website from local websites array whose  _id matches the websiteId parameter.
         * @param websiteId
         * @returns {boolean}
         */
        function deleteWebsite(websiteId) {
            var startLength = websites.length;
            websites.filter(checkId);

            //Items that pass this check will remain in the list.
            function checkId(website) {
                return website._id != websiteId;
            }

            return websites.length < startLength;
        }
    }
})();