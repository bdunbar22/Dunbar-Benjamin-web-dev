/**
 * Created by Ben on 5/24/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);
    
    function LoginController($location) {
        var viewModel = this;

        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

        viewModel.login = login;

        function login(username, password) {
            for(var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    $location.url("/user/" + users[i]._id);
                } else {
                    viewModel.error = "User not found";
                }
            }
        }
    }
    
    function ProfileController($routeParams) {
        var vm = this;
        var id = $routeParams["uid"];
        console.log(id);
    }
})();