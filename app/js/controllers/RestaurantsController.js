'use strict';

foodMeApp.controller('RestaurantsController',
    function RestaurantsController($scope, customer, $location, Restaurant, localStorage) {

  if (!customer.address) {
    $location.url('/customer');
  }

  var filter = $scope.filter = {
    cuisine: [],
    price: null,
    rating: null
  };

  var allRestaurants = Restaurant.query(filterAndSortRestaurants);
  $scope.$watch('filter', filterAndSortRestaurants, true);

  function filterAndSortRestaurants() {
    $scope.restaurants = [];
    var favorites;
    var customerObj = customer.favorites;

    if (typeof customerObj == "string") {
      favorites = JSON.parse(customerObj);
    } else {
      favorites = customerObj;
    }

    // filter
    angular.forEach(allRestaurants, function(item, key) {
      if (filter.price && filter.price !== item.price) {
        return;
      }

      if (filter.rating && filter.rating !== item.rating) {
        return;
      }

      if (filter.cuisine.length && filter.cuisine.indexOf(item.cuisine) === -1) {
        return;
      }

      item.favorite = false;
      if (favorites[item.id] != null) {
        item.favorite = true;
      }

      $scope.restaurants.push(item);
    });


    // sort
    $scope.restaurants.sort(function(a, b) {
      if (a[filter.sortBy] > b[filter.sortBy]) {
        return filter.sortAsc ? 1 : -1;
      }

      if (a[filter.sortBy] < b[filter.sortBy]) {
        return filter.sortAsc ? -1 : 1;
      }

      return 0;
    });
  };


  $scope.sortBy = function(key) {
    if (filter.sortBy === key) {
      filter.sortAsc = !filter.sortAsc;
    } else {
      filter.sortBy = key;
      filter.sortAsc = true;
    }
  };


  $scope.sortIconFor = function(key) {
    if (filter.sortBy !== key) {
      return '';
    }

    return filter.sortAsc ? '\u25B2' : '\u25BC';
  };


  $scope.CUISINE_OPTIONS = {
    african: 'African',
    american: 'American',
    barbecue: 'Barbecue',
    cafe: 'Cafe',
    chinese: 'Chinese',
    'czech/slovak': 'Czech / Slovak',
    german: 'German',
    indian: 'Indian',
    japanese: 'Japanese',
    mexican: 'Mexican',
    pizza: 'Pizza',
    thai: 'Thai',
    vegetarian: 'Vegetarian'
  };

  $scope.isFavorite = function(chk, id, name, description) {
    var favorites;
    var customerObj = customer.favorites;

    if (chk == false) { // I'm checking for false because ng-change passes the "old" value of the model
      if (typeof customerObj == "string") {
        favorites = JSON.parse(customerObj);
      } else {
        favorites = customerObj;
      }

      favorites[id] = [];
      var restaurant = { "id": id, "name": name, "description": description };
      favorites[id].push(restaurant);
      customer.favorites = JSON.stringify(favorites);
    } else {
      favorites = JSON.parse(customer.favorites);
      delete favorites[id];
      customer.favorites = JSON.stringify(favorites);
    }
  };
});
