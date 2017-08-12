var app = angular.module("myapp", ["ngRoute"]);

app.run(function($rootScope) {
    if (localStorage.getItem('token') !== null) {
        $rootScope.token = localStorage.getItem('token')
    }

});

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/registration", {
        templateUrl: "view/registrationForm.html",
        controller: "actrl"
    });
    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "bctrl"
    });
    $routeProvider.when("/Todo", {
        templateUrl: "view/createTodo.html",
        controller: "dctrl"
    });
    $routeProvider.when("/otherInformation", {
        templateUrl: "view/otherInf.html",
        controller: "cctrl"
    });

    $locationProvider.html5Mode(true);


});

app.controller("actrl", function($scope, $http) {
    $scope.submitForm = function() {
        console.log($scope.email)
        console.log($scope.password)
        $http({
            url: '/registration',
            method: 'POST',
            data: { email: $scope.email, password: $scope.password },

        }).then(function(response) {
            console.log(response)
        }, function(response) {
            console.log(response);
        });
    }
});
app.controller("bctrl", function($scope, $http, $rootScope, $location) {
    $scope.submitForm = function() {
        console.log($scope.email)
        console.log($scope.password)
        $http({
            url: '/login',
            method: 'POST',
            data: { email: $scope.email, password: $scope.password },

        }).then(function(response) {

            $rootScope.token = response.data.token;
            $rootScope.data = response.data;


            console.log(response)

            localStorage.setItem("token", response.data.token);

        }, function(response) {
            console.log(response);
        });
        $location.path('/Todo')


    }


});

app.controller("dctrl", function($scope, $http, $rootScope, $location) {

        $scope.getTodo = function() {
            var obj = $rootScope.token;
            $http({
                url: '/api/todo',
                headers: {
                    'x-access-token': obj,

                }
            }).then(function(response) {
                $scope.contacts = response.data.data
                console.log($scope.contacts)

            }, function(response) {

            })

        };

        $scope.getTodo();


        $scope.flag = 1 ;
        $scope.CreateTodo = function() {
            $scope.flag === 1 && function () {
            var obj = $rootScope.token;
            console.log(obj)
            $http({
                url: '/api/createTodo',
                method: 'POST',
                data: { email: $scope.data.email, name: $scope.data.name },
                headers: {
                    'x-access-token': obj

                }
            }).then(function(response) {
                console.log(response)
            }, function(response) {

            })
            $scope.getTodo();
        }
        $scope.flag = 1 ;
        }

        $scope.completedList = function(object) {
            var obj = $rootScope.token;
            $http({
                url: "/api/checkTodo",
                method: "POST",
                data: { _id: object._id },
                headers: {
                    'x-access-token': obj,
                }
            }).then(function(response) {
                console.log(response)
                $scope.todos = response.data;
                // var currentElement = angular.element('#element_id');


            }, function(response) {
                console.log(response)

            })


            //$scope.clearCompleted  
        }

        $scope.delete = function(object) {
            var obj = $rootScope.token;
            $http({
                url: "/api/delete",
                method: "POST",
                data: { _id: object._id},
                headers: {
                    'x-access-token': obj
                }
            }).then(function(response) {
                console.log(response)
            }, function(response) {
                console.log(response)
            })
            $scope.getTodo();

        }

        $scope.update = function(object) {
            $scope.data.name = object.name;
            $scope.flag = 2;

            var obj = $rootScope.token;
            $http({
                url: "/api/update",
                metjod: "POST",
                data: { _id: object._id , name: object.name},
                headers: {
                    'x-access-token': obj
                }
            }).then(function(response) {
                console.log(response)
            }, function(response) {
                console.log(response)
            })

            $scope.getTodo();
        }


        // $scope.clearCompleted = function () {
        //$scope.contacts = _.filter($scope.contacts, function(todo){
        // return $scope.contacts.status = 'pending';
        // });
        //};
    }

);
app.controller("cctrl", function($scope) {
    alert("first page called again");

});

app.controller("formController", function($scope) {
    $scope.submitForm = function() {
        console.log($scope.contact);
    }

})