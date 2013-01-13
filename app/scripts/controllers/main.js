/*global testGameApp*/
testGameApp.controller('MainCtrl', function ($scope, $http) {
    'use strict';

    //shuffles list in-place
    $scope.shuffle = function (list) {
        var i, j, t;
        for (i = 1; i < list.length; i += 1) {
            j = Math.floor(Math.random() * (1 + i));  // choose j in [0..i]
            if (j !== i) {
                t = list[i];                        // swap list[i] and list[j]
                list[i] = list[j];
                list[j] = t;
            }
        }
        return list;
    };

    $http.get('scripts/json/img.json').success(function (data) {
        $scope.cards = $scope.shuffle(data);
    });
});
