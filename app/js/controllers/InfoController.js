'use strict';

foodMeApp.controller('InfoController',
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
});