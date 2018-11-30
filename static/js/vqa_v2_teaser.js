/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var app = angular.module("myApp", ['ui.bootstrap', 'ngStorage','infinite-scroll','ngImageAppear']);

app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
});

app.controller("datacontroller", function ($scope, $http, $location) {
    
    var jsonFile = 'balanced_data.json'
    
    $http.get(jsonFile).success( function (data) {
        $scope.resultData = data;
        $scope.dataSlice = $scope.resultData.slice(0, 5);
        
        $scope.getMoreData = function () {
            $scope.dataSlice = $scope.resultData.slice(0, $scope.dataSlice.length + 5);
            console.log($scope.dataSlice);
        }
    })
    .error( function (error) {
        // console.log("Error!!!");
        console.error(error);
    });
    
    $scope.shuffleData = function() {
        console.log("shuffle");
        shuffle($scope.resultData);
        $scope.dataSlice = $scope.resultData.slice(0, 5);
    }
    
});
