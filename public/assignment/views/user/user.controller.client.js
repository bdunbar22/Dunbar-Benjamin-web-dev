/**
 * Created by Ben on 5/24/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController);

    var users =
        [
            {_id: "123", username: "alice",    password: "alice",    email: "", firstName: "Alice",  lastName: "Wonder"},
            {_id: "234", username: "bob",      password: "bob",      email: "", firstName: "Bob",    lastName: "Marley"},
            {_id: "345", username: "charly",   password: "charly",   email: "", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "", firstName: "Jose",   lastName: "Annunzi"}
        ];

    function LoginController($location) {
        var viewModel = this;

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
        for(var i in users) {
            if(users[i]._id === id) {
                vm.user = users[i];
            }
        }

        vm.updateUser = updateUser;

        function updateUser() {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].username = vm.user.username;
                    users[i].firstName = vm.user.firstName;
                    users[i].lastName = vm.user.lastName;
                    users[i].email = vm.user.email;
                }
            }
        }
    }
})();