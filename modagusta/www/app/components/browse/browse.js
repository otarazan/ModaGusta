

myApp.controller('BrowseCtrl',  function($scope,$http, $ionicPopup, $rootScope,localStorageService){


//  if(typeof analytics !== "undefined") { analytics.trackView("Browse Controller"); }
//
//    $scope.initEvent = function() {
//        if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
//    }


  $http.get(server+'test').
  success(function(data, status, headers, config) {
    var cardTypes = data;

    $scope.cards = [];
    
    for (i = 0; i < cardTypes.length; i++) {
      $scope.cards.push(angular.extend({}, cardTypes[i]));
    };

    $scope.cardSwipedLeft = function(index) {

         //Remote last item manually
            $(".td-cards td-card:last").fadeOut(100,function(){this.remove();});

    }

    $scope.likedBtn = function(index) {
      //Remote last item manually
      $(".td-cards td-card:last").fadeOut(100,function(){this.remove();});
      //Continue same as swiping
      $scope.cardSwipedRight(index);
    }
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe: item stored'+$scope.cards[index].id);
        var card = $scope.cards[index]

        var wishList=localStorageService.get('wishList');

        if (wishList == null ){
            wishList = [];
        }
        //if there are similar items dont add{
     //   console.log(JSON.stringify(wishList));

        for (i = 0; i < wishList.length; i++) {
          if(card.id==wishList[i].id){
       //     console.log("same item ignored");
            return false;
          }
        }
        wishList.push(angular.extend({},card));
        localStorageService.set('wishList', wishList);
        return true;
    }

    $scope.onDoubletap = function(index) {
     // console.log('Right swipe');
      touched=false;
    }

    $scope.cardTouch = function(index) {
    //  console.log('Touched');

    }

    $scope.onRelease = function(index) {
    //  console.log('Released');
    }

    $scope.onTap = function(index) {
   //   console.log($scope.cards[index].image);
      window.location = server+"buy?id="+$scope.cards[index].id

    }

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
   //   console.log('Card removed');
    }
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});

var server="http://192.168.1.12:3000/";

