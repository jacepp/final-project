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

function InfoController($scope, customer) {
  $scope.editedItem = null;
  $scope.cName = { name: customer.name, editing: false };
  $scope.cAddress = { name: customer.address, editing: false };

  $scope.startEditing = function(item){
    item.editing=true;
    $scope.editedItem = item;
  }

  $scope.doneEditing = function(key, item){
    switch (key) {
    case 'name':
      customer.name = item.name;
      break;
    case 'address':
      customer.address = item.name;
      break;
    }
    item.editing=false;
    $scope.editedItem = null;
  }
}