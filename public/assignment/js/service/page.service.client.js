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
            ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        /**
         * Adds the page parameter instance to the local pages array. The new page's websiteId is set to the
         * websiteId parameter.
         * @param websiteId
         * @param page
         * @returns {null}
         */
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
            return null;
        }

        /**
         * Retrieves the pages in the local pages array whose websiteId match the given websiteId
         * @param websiteId
         */
        function findPagesByWebsiteId(websiteId) {
            var pagesForId = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    pagesForId.push(pages[i]);
                }
            }
            return pagesForId;
        }

        /**
         * Retrieves the page in local pages array whose _id matches the pageId parameter.
         * @param pageId
         * @returns {*} page if found. Null if not.
         */
        function findPageById(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        /**
         * Updates the page in local pages array whose  _id matches the pageId parameter.
         * @param pageId
         * @param page
         * @returns {boolean} true if updated.
         */
        function updatePage(pageId, page) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].websiteId = page.websiteId;
                    return true;
                }
            }
            return false;
        }

        /**
         * Removes the page from local pages array whose _id matches the pageId parameter.
         * @param pageId
         * @returns {boolean} true if found a page to delete.
         */
        function deletePage(pageId) {
            var startLength = pages.length;
            pages.filter(checkId);

            //Items that pass this check will remain in the list.
            function checkId(page) {
                return page._id != pageId;
            }

            return pages.length < startLength;
        }
    }
})();