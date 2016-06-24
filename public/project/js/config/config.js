/**
 * Created by Ben on 5/23/16.
 */
(function () {
    angular
        .module("BenProject")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "templates/home/home.view.client.html"
            })
            .when("/about", {
                templateUrl: "templates/home/about.view.client.html"
            })
            .when("/search", {
                templateUrl: "templates/home/search.view.client.html"
            })
            .when("/login", {
                templateUrl: "templates/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "templates/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/search/user", {
                templateUrl: "templates/user/user-search-results.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model"
            })
            .when("/search/post", {
                templateUrl: "templates/post/post-search-results.view.client.html",
                controller: "PostSearchController",
                controllerAs: "model"
            })
            .when("/search/event", {
                templateUrl: "templates/event/event-search-results.view.client.html",
                controller: "EventSearchController",
                controllerAs: "model"
            })
            .when("/search/competition", {
                templateUrl: "templates/competition/competition-search-results.view.client.html",
                controller: "CompetitionSearchController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "templates/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user", {
                templateUrl: "templates/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedIn
                }
            })
            .when("/user/:uid/public", {
                templateUrl: "templates/user/public-profile.view.client.html",
                controller: "PublicProfileController",
                controllerAs: "model",
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
            .when("/user/:uid/post/:pid/flickr", {
                templateUrl: "templates/post/post-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
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
                templateUrl: "templates/home/home.view.client.html"
            });

        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var def = $q.defer();

            UserService
                .checkLoggedIn()
                .then(
                    function (resp) {
                        var user = resp.data;
                        if(user === '0') {
                            $rootScope.currentUser = null;
                            $location.url("/login");
                            def.reject();
                        }
                        else {
                            def.resolve();
                            $rootScope.currentUser = user;
                        }
                    },
                    function (err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        $location.url("/login");
                        def.reject();
                    }
                );

            return def.promise;
        }
    }
})();