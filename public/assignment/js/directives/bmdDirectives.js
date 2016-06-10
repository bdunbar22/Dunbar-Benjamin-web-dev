/**
 * Created by Ben on 6/8/16.
 */

(function () {
    angular.module("bmdDirectives", [])
        .directive("bmdSortTable", bmdSortTable);
    
    function bmdSortTable() {
        function linker(scope, element, attributes) {
            var start = -1;
            var stop = -1;
            $(element)
               .find("tbody")
               .sortable({
                   start: function (event, ui) {
                       start =  ui.item.index;
                       console.log("Start");
                   },
                   stop: function (event, ui) {
                       stop = ui.item.index;
                       console.log("Stop");

                       var sortedElement = scope.data.splice(start, 1)[0];
                       scope.data.splice(stop, 0, sortedElement);

                       scope.$apply();

                       //scope.$parent.model.sortList(start, stop);
                       scope.sort({start: start, stop: stop});
                   }
               });
        }
        return {
            templateUrl: "js/directives/bmdSortTable.html",
            scope: {
                title: "=",
                border: "=",
                data: "=",
                sort: "&sortList"
            },
            link: linker
        }
    }
})();