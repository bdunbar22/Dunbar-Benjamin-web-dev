/**
 * Created by Ben on 5/23/16.
 */
(function () {
    angular
        .module("BenProject")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "templates/user/login.view.client.html"
            })
            .when("/", {
                templateUrl: "templates/user/login.view.client.html"
            })
            .when("/default", {
                templateUrl: "templates/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "templates/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "templates/user/profile.view.client.html"
            });
    }
})();