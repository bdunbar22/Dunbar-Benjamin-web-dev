/**
 * Created by Ben on 6/8/16.
 */

(function () {
    angular.module("bmdDirectives", [])
        .directive("bmdSortTable", bmdSortTable);
    
    function bmdSortTable() {
        function linker(scope, element, attributes) {
           $(element)
               .find("tbody")
               .sortable();
        }
        return {
            templateUrl: "bmdSortTable.html",
            scope: {
                title: "=",
                border: "=",
                data: "="
            }
        }
    }
})();