/**
 * Created by Ben on 5/23/16.
 */

/**
 * Keep code in a function so that it isn't interacting with global variables.
 * This design patter is IIFE - Immediately Invoked Function Environment.
 *
 * Create the module that will be used in the other js files.
 */
(function () {
    angular.module("WebAppMaker", ["ngRoute"]);
})();
