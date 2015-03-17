myApp.controller('SettingsCtrl',  function($scope,$http, $ionicPopup, $rootScope){

    if(typeof analytics !== "undefined") { analytics.trackView("Settings Controller"); }

    $scope.initEvent = function() {
       if(typeof analytics !== "undefined") { analytics.trackEvent("Category", "Action", "Label", 25); }
    }


    $scope.themas = [
        { id: false, name: 'Dark' },
        { id: true, name: 'Light' }
    ];

    $scope.thema=$scope.themas[1];

    var thema = document.getElementById('thema');
    if (thema)
    {
      head.removeChild(link);
    }else{
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = 'thema';
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://bootswatch.com/cyborg/bootstrap.min.css';
        link.media = 'all';
        head.appendChild(link);
    }
    alert("ss");
});
