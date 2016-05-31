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
                templateUrl: "templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/default", {
                templateUrl: "templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "templates/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "templates/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            });
    }
})();