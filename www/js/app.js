// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      // StatusBar.styleColor('green');
    }
  });
})

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])


.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
  url: '/login',
  views: {
    'menuContent': {
      templateUrl: 'templates/login.html',
      controller : 'AppCtrl'
    }
  }
})

  .state('app.compte', {
    url: '/compte',
    views: {
      'menuContent': {
        templateUrl: 'templates/compte.html',
        controller : 'CompteCtrl'
      }
    }
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller : 'homeCtrl'
        }
      }
    })

    .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html'
          }
        }
      })

      .state('app.information', {
          url: '/information',
          views: {
            'menuContent': {
              templateUrl: 'templates/apropos.html'
              }
          }
        })


  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
//
// .controller('MainCtrl', function($scope, Camera) {
//
//   $scope.getPhoto = function() {
//     Camera.getPicture().then(function(imageURI) {
//       console.log(imageURI);
//       $scope.lastPhoto = imageURI;
//     }, function(err) {
//       console.err(err);
//     }, {
//       quality: 75,
//       targetWidth: 320,
//       targetHeight: 320,
//       saveToPhotoAlbum: false
//     });
//   };
//
//
//   $scope.uploadPhoto = function() {
//       var imageURI        = $scope.lastPhoto;
//       var options         = new FileUploadOptions();
//       options.fileKey     = "file";
//
//       options.fileName    = imageURI.substr(imageURI.lastIndexOf('/')+1);
//       options.mimeType    = "image/jpeg";
//
//       var params          = {};
//       params.value1       = "test";
//       params.value2       = "param";
//
//       options.params      = params;
//       options.chunkedMode = false;
//
//       var win = function(r) {
//           console.log("Code = " + r.responseCode);
//           console.log("Response = " + r.response);
//           console.log("Sent = " + r.bytesSent);
//           alert(r.response);
//       };
//
//       var fail = function(error) {
//           alert("An error has occurred: Code = " + error.code);
//       };
//
//       var ft = new FileTransfer();
//       ft.upload(imageURI, "http://www.wavi.fr/php/wavi-api/upload.php", win, fail, options);
//   };
//
// });
