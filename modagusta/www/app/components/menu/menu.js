myApp.controller('MenuCtrl', function($scope, $http, $ionicPopup, $timeout, $rootScope, $ionicSideMenuDelegate, localStorageService) {

var reklamActionToken;

  if(typeof analytics !== "undefined") { analytics.trackView("Menu Controller"); }

    $scope.initEvent = function() {
        if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }




//
//$scope.getProductID = function(token){
//
//$http.get('http://feed.reklamaction.com/restapi/offers?accessToken='+token).
//  success(function(data, status, headers, config) {
//   console.log("product id" + JSON.stringify(data));
//    $scope.getproductsWithID('1691',token);
//  }).
//  error(function(data, status, headers, config) {
// console.log("cant get product IDs");
//  });
//
//};

    $scope.validateEmail = function(email) {

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);

        } //validateEmail


    $scope.btnRemoveFromWishList = function(index) {

        $scope.wishList.splice($scope.wishList.indexOf(index), 1);
        localStorageService.set('wishList', $scope.wishList);

    };


    $scope.clearWishList = function() {


        localStorageService.clearAll();
        $scope.wishList = null;
        $rootScope.wishList = null;

    }; //clearWishlist



    $scope.sendWishListMail = function() {

        $scope.data = {}
        $scope.data.email="tarazansafak@gmail.com";
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.email">',
            title: 'Please enter your E-mail.',
            scope: $scope,
            buttons: [{
                text: 'Cancel'
            }, {
                text: '<b>Send</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.email) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {

                        if ($scope.validateEmail($scope.data.email)) {
                            $http.post(server+"sendWishListMail", {wishList:$scope.wishList}).
                                  success(function(data, status, headers, config) {
                                        console.log("sending mail isk");
                                        alert("Mail is sent to: "+$scope.data.email);
                                  }).
                                  error(function(data, status, headers, config) {
                                        console.log("error sending mail");
                                  });
                        } else {
                            alert("Please enter a valid email... ");
                            $scope.sendWishListMail();
                        }

                        return $scope.data.email;
                    }
                }
            }, ]
        });


    }; //sendWishlistMail

    $scope.genders = [
        { id: 1, name: 'Erkek' },
        { id: 2, name: 'kadin' }
    ];
    $scope.categories = [
        { id: 1, name: 'Ayakkabi' },
        { id: 2, name: 'Çanta' }
    ];
    $scope.discounts = [
        { id: 1, name: '%15' }
    ];
    $scope.prices = [
        { id: 1, name: '100TL alti' }
    ];



    $scope.btnFilter = function(selection) {

      console.log("Your selection:");
      console.log(selection);

      $http.post(server+'filter', selection).
      success(function(data, status, headers, config) {
        $rootScope.loadCards(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    var server="http://localhost:3000/";

    $scope.$watch(function() {
        return $ionicSideMenuDelegate.isOpenRight();
    }, function(value) {

      if ($rootScope.wishList == null) {
          $rootScope.wishList = [];
      } else {
          $scope.wishList = localStorageService.get('wishList');
      }

    });

});
