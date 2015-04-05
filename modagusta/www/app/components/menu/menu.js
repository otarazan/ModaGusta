myApp.controller('MenuCtrl', function($scope, $http, $ionicPopup, $timeout, $rootScope, $ionicSideMenuDelegate, localStorageService) {

var reklamActionToken;


  if(typeof analytics !== "undefined") { analytics.trackView("Menu Controller"); }

    $scope.initEvent = function() {
        if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }


    $scope.validateEmail = function(email) {

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);

        } //validateEmail





    $scope.btnRemoveFromWishList = function(index) {

        $scope.wishList.splice($scope.wishList.indexOf(index), 1);
        localStorageService.set('wishList', $scope.wishList);

    };


    $scope.clearWishList = function() {

 $ionicSideMenuDelegate.toggleRight();
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
  $ionicSideMenuDelegate.toggleRight();
                        if($scope.wishList!=null&&$scope.wishList.length!=0){
                                                    $http.post(server+"sendWishListMail", {wishList:$scope.wishList,mailTo:$scope.data.email}).
                                                          success(function(data, status, headers, config) {
                                                                console.log("sending mail isk");
                                                                alert("Mail is sent to: "+$scope.data.email);

                                                          }).
                                                          error(function(data, status, headers, config) {
                                                                console.log("error sending mail");
                                                          });
                        }else{alert("Your wishlist is empty!");
                        }

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
        { id: false, name: 'Erkek' },
        { id: true, name: 'kadin' }
    ];


    var server="http://192.168.1.3:3000/";

    $http.post(server+'getAll').
             success(function(data, status, headers, config) {

               if ($rootScope.loadCards!=null){
                 $rootScope.loadCards(data);
               }
             }).
             error(function(data, status, headers, config) {
             });

    //Get categories from the server
    $http.get(server+'cat').
              success(function(data, status, headers, config) {
                $scope.categories = [];
                data.cat.forEach(function(entry) {
                    $scope.categories.push({id: entry, name: entry});
                });

                //Get providers from the server
                $http.get(server+'providers').
                          success(function(data, status, headers, config) {
                            $scope.providers = [];
                            data.providers.forEach(function(entry) {
                                $scope.providers.push({id: entry, name: entry});
                            });

                            //After getting the categories set everything
                            $scope.selection = {
                            "gender": $scope.genders[1],
                            "cat": $scope.categories[0],
                            provider: $scope.providers[0],
                            price:{
                                minPrice: 10,
                                maxPrice: 500
                              }
                            };

                          }); //providers


              }); //categories




    $scope.discounts = [
        { id: 15, name: '%15' },
        { id: 82, name: '%82' }
    ];


    function getSelectedProducts(selection){
      console.log("Your selection:");
      console.log(selection);
      selection["ofset"] =$rootScope.cardFilterOfset;
      $http.post(server+'filter', selection).
      success(function(data, status, headers, config) {
        $rootScope.loadCards(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }


    $scope.btnFilter = function(selection) {
    $ionicSideMenuDelegate.toggleLeft();
      getSelectedProducts(selection);

    };


   $scope.btnBuy = function(url) {
             window.open(url+ "?modagusta=1", '_system', 'location=yes');
    };


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
