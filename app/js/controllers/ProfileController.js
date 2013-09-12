'use strict';

foodMeApp.controller('ProfileController',
    function ProfileController($scope, customer) {

  $scope.favorites = [];

  $scope.filterFavorites = function() {
    var array = [];
    var favs = customer.favorites;

    if (typeof favs == "string") {
      favs = JSON.parse(favs);
    }

    angular.forEach(favs, function(item, key) {
      array.push(item[0]);
    });

    return array;
  };

});

