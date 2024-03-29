myApp.controller('MenuCtrl', function($scope, $http, $ionicPopup, $timeout, $rootScope, $ionicSideMenuDelegate, localStorageService) {

    var reklamActionToken;


    if (typeof analytics !== "undefined") {
        analytics.trackView("Menu Controller");
    }

    $scope.initEvent = function() {
        if (typeof analytics !== "undefined") {
            analytics.trackEvent("Category", "Action", "Label", 25);
        }
    }


    $scope.validateEmail = function(email) {

            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);

        } //validateEmail




    $scope.btnRemoveFromWishList = function(index) {

        $scope.wishList.splice($scope.wishList.indexOf(index), 1);
        localStorageService.set('wishList', $scope.wishList);
        $rootScope.osman--;

    };


    $scope.clearWishList = function() {

        $ionicSideMenuDelegate.toggleRight();
        localStorageService.clearAll();
        $scope.wishList = null;
        $rootScope.wishList = null;
        $rootScope.osman = 0;

    }; //clearWishlist



    $scope.sendWishListMail = function() {

        $scope.data = {}
        $scope.data.email = "tarazansafak@gmail.com";
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
                            if ($scope.wishList != null && $scope.wishList.length != 0) {
                                $http.post($rootScope.server + "sendWishListMail", {
                                    wishList: $scope.wishList,
                                    mailTo: $scope.data.email
                                }).
                                success(function(data, status, headers, config) {
                                    console.log("sending mail isk");
                                    alert("Mail is sent to: " + $scope.data.email);

                                }).
                                error(function(data, status, headers, config) {
                                    console.log("error sending mail");
                                });
                            } else {
                                alert("Your wishlist is empty!");
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
        console.log($rootScope.cardFilterOfset);




    $scope.genders = [
        { id: 'Tümü' , name: 'Tümü' },
        { id: false, name: 'Erkek' },
        { id: true , name: 'kadin' }
    ];

    $rootScope.server="http://limitless-journey-4984.herokuapp.com/";
  //  var server="
    $http.post($rootScope.server + 'getAll').
    success(function(data, status, headers, config) {

        if ($rootScope.loadCards != null) {
            $rootScope.loadCards(data);
        }
    }).
    error(function(data, status, headers, config) {});

    //Get categories from the server
    $http.get($rootScope.server + 'menu').
    success(function(data, status, headers, config) {
        //Put result from server to menu
        $scope.cat = [];
        $scope.providers = [];
        $scope.discountRates = [];

        data.cat.forEach(function(entry) {
                    $scope.cat.push({id: entry, name: entry});
        });

        //$scope.providers.push({id: "Tümü" , name: 'Tümü'});
        data.providers.forEach(function(entry) {
                    $scope.providers.push({id: entry, name: entry});
        });

        //$scope.discountRates.push({id: null, name: 'Tümü'});
        data.discountRates.forEach(function(entry) {
                    $scope.discountRates.push({id: entry, name: entry});
        });

        //After getting the categories set everything
        $rootScope.selection = {
            gender: $scope.genders[0],
            cat: $scope.cat[0],
            provider: $scope.providers[0],
            discountRate: $scope.discountRates[0],
            price: {
                minPrice: 10,
                maxPrice: 1000
            }
        };

        $rootScope["Tümü"]=[];
        $rootScope["Tümü"].cardFilterOfset=0;

        data.cat.forEach(function(entry) {
            $rootScope[entry] = [];
            $rootScope[entry].cardFilterOfset = 0;
        });

    }); //categories



    function getSelectedProducts(selection) {
        console.log("Your selection:");
        console.log(selection);
        selection["ofset"] = $rootScope[$rootScope.selection.cat.name].cardFilterOfset;
        $http.post($rootScope.server + 'filter', selection).
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
        window.open(url + "?modagusta=1", '_system', 'location=yes');
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
