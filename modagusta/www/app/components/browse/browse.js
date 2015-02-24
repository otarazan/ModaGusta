

myApp.controller('BrowseCtrl',  function($scope,$http, $ionicPopup, $rootScope,localStorageService){


  if(typeof analytics !== "undefined") { analytics.trackView("Browse Controller"); }

    $scope.initEvent = function() {
        if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }


  $http.get("http://api.gelirortaklari.com/feed?id=7235&key=bc34a7f1f7a2bd5dff42e9708530e63f7164&offset=0&count=10").
  success(function(data, status, headers, config) {
osman  = data;
  data = x2js.xml_str2json(data);

    var cardTypes = data;

    $scope.cards = [];

    for (i = 0; i <data.products.product.length; i++) {

    var discount = ((data.products.product[i].price - data.products.product[i].deal_price)/data.products.product[i].price)*100;
    var eachProduct;


      eachProduct =
                         {
                             "id": data.products.product[i].product_id,
                             "title": data.products.product[i].title,
                             "image":$rootScope.eachImgUrl,
                             "productURL":data.products.product[i].product_url,
                             "gender":data.products.product[i].gender,
                             "merchantCategory":data.products.product[i].merchant_category,
                             "cat1": data.products.product[i].category1,
                             "cat2": data.products.product[i].category2,
                             "cat3":data.products.product[i].category3,
                             "des1": data.products.product[i].description1,
                             "des2": data.products.product[i].description2,
                             "des3":data.products.product[i].description3,
                             "brandName": data.products.product[i].brand_name,
                             "modelName": data.products.product[i].model_name,
                             "oldPrice": data.products.product[i].price,
                             "newPrice":data.products.product[i].deal_price,
                             "discountRate":discount,
                             "city":data.products.product[i].city,
                             "startDate":data.products.product[i].start_date,
                             "endDate":data.products.product[i].end_date,
                             "shortTitle":data.products.product[i].short_title
                         };


            $http.get(data.products.product[i].product_url).
              success(function(data, status, headers, config) {

            $rootScope.eachImgUrl= $(data).find("[id='zoom1']").attr("href");

                  eachProduct =
                                     {
                                         "image":$rootScope.eachImgUrl
                                      };
                    $scope.cards.push(angular.extend({}, eachProduct));

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });


console.log(eachProduct);

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

var server="http://1ocalhost:3000/";

