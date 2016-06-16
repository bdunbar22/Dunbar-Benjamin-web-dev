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
                templateUrl: "templates/home/home.view.client.html",
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
            })
            .when("/user/:uid/post", {
                templateUrl: "views/post/post-list.view.client.html",
                controller: "PostListController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/new", {
                templateUrl: "views/post/post-new.view.client.html",
                controller: "NewPostController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/:pid", {
                templateUrl: "views/post/post-edit.view.client.html",
                controller: "EditPostController",
                controllerAs: "model"
            })
            .when("/user/:uid/event", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventListController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/new", {
                templateUrl: "views/event/event-new.view.client.html",
                controller: "NewEventController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/:eid", {
                templateUrl: "views/event/event-edit.view.client.html",
                controller: "EditEventController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            });
    }
})();