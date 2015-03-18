myApp.controller('BrowseCtrl', function($scope, $http, $ionicPopup, $rootScope, localStorageService) {


    if (typeof analytics !== "undefined") {
        analytics.trackView("Browse Controller");
    }

    $scope.initEvent = function() {
        if (typeof analytics !== "undefined") {
            analytics.trackEvent("Category", "Action", "Label", 25);
        }
    }

    $rootScope.loadCards = function(data) {
        var cardTypes = data;

        $scope.cards = [];


        for (i = 0; i < data.length; i++) {

            eachProduct = {
                "id": data[i].id,
                "title": data[i].title,
                "productURL": data[i].productURL,
                "gender": data[i].gender,
                "cat": data[i].cat,
                "des": data[i].des,
                "brand": data[i].brand,
                "oldPrice": data[i].oldPrice,
                "newPrice": data[i].newPrice,
                "discountRate": data[i].discountRate,
                "image": data[i].image
            };

            //  console.log(JSON.stringify(eachProduct));
            $scope.cards.push(angular.extend({}, eachProduct));

        };
    }

    $scope.cardSwipedLeft = function(index) {

        //Remote last item manually
       $(".td-cards td-card:last").remove();
}

    $scope.likedBtn = function(index) {
        //Remote last item manually

     $(".td-cards td-card:last").remove();
        //Continue same as swiping
 $scope.cardSwipedRight(index);
    }
    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe: item stored' + $scope.cards[index].id);
        var card = $scope.cards[index]

        var wishList = localStorageService.get('wishList');

        if (wishList == null) {
            wishList = [];
        }
        //if there are similar items dont add{
        //   console.log(JSON.stringify(wishList));

        for (i = 0; i < wishList.length; i++) {
            if (card.id == wishList[i].id) {
                //     console.log("same item ignored");
                return false;
            }
        }
        wishList.push(angular.extend({}, card));
        localStorageService.set('wishList', wishList);
        return true;
    }

    $scope.onDoubletap = function(index) {
        // console.log('Right swipe');
        touched = false;
    }

    $scope.cardTouch = function(index) {
        //  console.log('Touched');

    }

    $scope.onRelease = function(index) {
        //  console.log('Released');
    }

    $scope.onTap = function(index) {
        //   console.log($scope.cards[index].image);
    //    window.location =  $scope.cards[index].productURL + "?modagusta=1";

  window.open($scope.cards[index].productURL + "?modagusta=1", '_system', 'location=yes');


    }

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        //   console.log('Card removed');
    }

    $scope.shareBtn = function(){

   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });


    }



  ionic.Platform.ready(function(){

  });

});

var server = "http://192.168.1.6:3000/";
