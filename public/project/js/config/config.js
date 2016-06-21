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
                templateUrl: "templates/post/post-list.view.client.html",
                controller: "PostListController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/new", {
                templateUrl: "templates/post/post-new.view.client.html",
                controller: "NewPostController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/:pid", {
                templateUrl: "templates/post/post-edit.view.client.html",
                controller: "EditPostController",
                controllerAs: "model"
            })
            .when("/user/:uid/event", {
                templateUrl: "templates/event/event-list.view.client.html",
                controller: "EventListController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/new", {
                templateUrl: "templates/event/event-new.view.client.html",
                controller: "NewEventController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/:eid", {
                templateUrl: "templates/event/event-edit.view.client.html",
                controller: "EditEventController",
                controllerAs: "model"
            })

            .when("/user/:uid/competition", {
                templateUrl: "templates/competition/competition-list.view.client.html",
                controller: "CompetitionListController",
                controllerAs: "model"
            })
            .when("/user/:uid/competition/new", {
                templateUrl: "templates/competition/competition-new.view.client.html",
                controller: "NewCompetitionController",
                controllerAs: "model"
            })
            .when("/user/:uid/competition/:eid", {
                templateUrl: "templates/competition/competition-edit.view.client.html",
                controller: "EditCompetitionController",
                controllerAs: "model"
            })
            .otherwise({
                templateUrl: "templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            });
    }
})();