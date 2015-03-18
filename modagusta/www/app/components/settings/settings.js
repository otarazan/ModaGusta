myApp.controller('SettingsCtrl',  function($scope,$http, $ionicPopup, $rootScope){

    if(typeof analytics !== "undefined") { analytics.trackView("Settings Controller"); }

    $scope.initEvent = function() {
       if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }


    $scope.themas = [
        { id: false, name: 'dark' },
        { id: true, name: 'light' }
    ];


    $scope.thema=$scope.themas[1];



    $scope.themeChange = function () {
       setThema();
   }
});
