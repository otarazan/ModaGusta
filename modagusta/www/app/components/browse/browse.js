

myApp.controller('BrowseCtrl',  function($scope,$http, $ionicPopup, $rootScope,localStorageService){


  if(typeof analytics !== "undefined") { analytics.trackView("Browse Controller"); }

    $scope.initEvent = function() {
        if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }


  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Don\'t eat that!',
      template: 'It might taste good'
    });
    alertPopup.then(function(res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };


  $http.get(server+'test').
  success(function(data, status, headers, config) {
    var cardTypes = data;

    $scope.cards = [];

    $scope.addCard = function(i) {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 3; i++){
    $scope.addCard()
    };//readability :)

    $scope.cardSwipedLeft = function(index) {
      console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe: item stored'+$scope.cards[index].id);
        var card = $scope.cards[index]

        var wishList=localStorageService.get('wishList');

        if (wishList == null ){
            wishList = [];
        }
        for (var oldCard in wishList){
            if(oldCard.id==card.id ){
             break;
            }
        }
        wishList.push(angular.extend({},card));
        localStorageService.set('wishList', wishList);

    }

    $scope.onDoubletap = function(index) {
      console.log('Right swipe');
      touched=false;
    }

    $scope.cardTouch = function(index) {
      console.log('Touched');

    }

    $scope.onRelease = function(index) {
      console.log('Released');
    }

    $scope.onTap = function(index) {
      console.log($scope.cards[index].image);
      window.location = server+"buy?id="+$scope.cards[index].id

    }

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
      console.log('Card removed');
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});
var server="http://192.168.1.5:3000/";