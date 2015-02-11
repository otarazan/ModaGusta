

myApp.controller('BrowseCtrl',  function($scope,$http, $ionicPopup, $rootScope,localStorageService){

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

    for(var i = 0; i < 12; i++) $scope.addCard();

    $scope.cardSwipedLeft = function(index) {
      console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
      console.log('Right swipe: item stored');

         if ($rootScope.wishList == null ){
                $rootScope.wishList = [];
          }

         $rootScope.wishList.push(angular.extend({},$scope.cards[index]));
         localStorageService.set('wishList', $rootScope.wishList);

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


  $scope.btnDislike = function(){

  };

  $scope.btnLike = function(){

  $scope.cardSwipedRight();


  };


});
var server="http://localhost:3000/";