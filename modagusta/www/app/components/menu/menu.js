myApp.controller('MenuCtrl',  function($scope,$http, $ionicPopup,$timeout, $rootScope,$ionicSideMenuDelegate,localStorageService){

var server="http://localhost:3000/";

 $scope.$watch(function() {
   return $ionicSideMenuDelegate.isOpenRight();
 }, function(value) {

  if ($rootScope.wishList == null ){
         $rootScope.wishList = [];
  }else{
         $scope.wishList = localStorageService.get('wishList');
  }



$scope.sendWishListMail = function(){

$scope.data = {}

var myPopup = $ionicPopup.show({
     template: '<input type="normal" ng-model="data.email">',
     title: 'Please enter your E-mail.',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Send</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.email) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {

                    if($scope.validateEmail($scope.data.email))
                    {
                       window.location = server+"sendWishListMail;

                    alert("WishList is sent to: "+$scope.data.email);
                    }
                    else{
                    alert("Please enter a valid email... "); $scope.sendWishListMail();
                    }

                                 return $scope.data.email;
                               }
                             }
                           },
                 ]
         });


};//sendWishlistMail




$scope.validateEmail = function(email){

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);

}//validateEmail


$scope.btnRemoveFromWishList = function(index){

$scope.wishList.splice($scope.wishList.indexOf(index), 1);
 localStorageService.set('wishList', $scope.wishList);

};


$scope.clearWishList = function(){


localStorageService.clearAll();
$scope.wishList=null;
$rootScope.wishList = null;

};//clearWishlist


 });

   });