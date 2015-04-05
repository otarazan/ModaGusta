// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('starter', ['ionic','ionic.contrib.ui.tinderCards','LocalStorageModule'])



.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {


// $cordovaGoogleAnalytics.startTrackerWithId('UA-47701506-5');
 window.analytics.startTrackerWithId('UA-47701506-5');

if (typeof analytics !== 'undefined'){
    //  analytics.startTrackerWithId('UA-47701506-5');
     // analytics.trackView('Main');
     window.analytics.startTrackerWithId('UA-47701506-5');
    }



    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
}]).config(function($stateProvider, $urlRouterProvider) {



  $stateProvider.state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "app/components/menu/menu.html",
    controller:"MenuCtrl"
  })
 .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent': {
          templateUrl: "app/components/browse/browse.html",
          controller:"BrowseCtrl"
        }
      }
    })

  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "app/components/settings/settings.html",
        controller:"SettingsCtrl"
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/browse');
});


myApp.config(function ($httpProvider,localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('myApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);
});


