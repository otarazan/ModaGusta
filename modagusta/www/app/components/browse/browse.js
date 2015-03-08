myApp.controller('BrowseCtrl', function($scope, $http, $ionicPopup, $rootScope, localStorageService) {


    if (typeof analytics !== "undefined") {
        analytics.trackView("Browse Controller");
    }

    $scope.initEvent = function() {
        if (typeof analytics !== "undefined") {
            analytics.trackEvent("Category", "Action", "Label", 25);
        }
    }


    $http.get(server + 'product/gender/1').
    success(function(data, status, headers, config) {


        //  data = x2js.xml_str2json(data);

        var cardTypes = data;

        $scope.cards = [];




        for (i = 0; i < data.length; i++) {

            var discount = ((data[i].price - data[i].deal_price) / data[i].price) * 100;
            var eachProduct;


            eachProduct = {
                "id": data[i].id,
                "title": data[i].title,
                "image": $rootScope.eachImgUrl,
                "productURL": data[i].productURL,
                "gender": data[i].gender,
                "merchantCategory": data[i].merchantCategory,
                "cat1": data[i].cat1,
                "cat2": data[i].cat2,
                "cat3": data[i].cat3,
                "des1": data[i].des1,
                "des2": data[i].des2,
                "des3": data[i].des3,
                "brandName": data[i].brandName,
                "modelName": data[i].model_name,
                "oldPrice": data[i].oldPrice,
                "newPrice": data[i].newPrice,
                "discountRate": data[i].discountRate,
                "city": data[i].city,
                "startDate": data[i].startDate,
                "endDate": data[i].endDate,
                "shortTitle": data[i].shortTitle
            };

            if (i > 10) {
                break;
            }
            $http.get(data[i].productURL).
            success(function(data, status, headers, config) {

                $rootScope.eachImgUrl = $(data).find("[id='zoom1']").attr("href");

                eachProduct = {
                    "image": $rootScope.eachImgUrl
                };
                $scope.cards.push(angular.extend({}, eachProduct));

            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


            //console.log(eachProduct);

        };

        $scope.cardSwipedLeft = function(index) {

            //Remote last item manually
            $(".td-cards td-card:last").fadeOut(100, function() {
                this.remove();
            });

        }

        $scope.likedBtn = function(index) {
            //Remote last item manually
            $(".td-cards td-card:last").fadeOut(100, function() {
                this.remove();
            });
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
            window.location = server + "buy?id=" + $scope.cards[index].id

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

var server = "http://localhost:3000/";
