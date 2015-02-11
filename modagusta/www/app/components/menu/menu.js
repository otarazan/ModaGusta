myApp.controller('MenuCtrl',  function($scope,$http, $ionicPopup, $rootScope,$ionicSideMenuDelegate,localStorageService){

 $scope.$watch(function() {
   return $ionicSideMenuDelegate.isOpenRight();
 }, function(value) {

  if ($rootScope.wishList == null ){
         $rootScope.wishList = [];
  }else{
         $scope.wishList = localStorageService.get('wishList');
  }

$scope.sendWishListMail = function(){

alert("implement me");

};

$scope.clearWishList = function(){


localStorageService.clearAll();
$scope.wishList=null;
$rootScope.wishList = null;

};


 });

   });