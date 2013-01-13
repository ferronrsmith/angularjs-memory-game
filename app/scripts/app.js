/*global angular */
var testGameApp = angular.module('testGameApp', []).config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
