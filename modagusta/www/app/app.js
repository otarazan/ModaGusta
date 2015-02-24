// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('starter', ['ionic','ionic.contrib.ui.tinderCards','LocalStorageModule'])



.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

 if(typeof analytics !== "undefined") {
			window.analytics.startTrackerWithId("UA-47701506-5");
             //     alert("google analytics is available");
                console.log("analytic is working");
                window.analytics.trackView('Main');
                window.analytics.debugMode()
            }else {
                     console.log("Google Analytics Unavailable");
            //            alert("google analytics is NOT available");
                         console.log("analytic is NOT working");

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


