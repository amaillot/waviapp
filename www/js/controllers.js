angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $http) {

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/logintestdata.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
          $scope.modal.show();
        };

        // Form data for the login modal
        $scope.data = {};

          $scope.submit = function(){
              var link = 'http://localhost:8888/api.php';

              $http.post(link, {
                prenom : $scope.data.prenom,
                nom : $scope.data.nom,
                mail : $scope.data.mail,
                password : $scope.data.password,
                pseudo : $scope.data.pseudo,
                description : $scope.data.description
              }).then(function (res){
                  $scope.user = res.data;
                });
          };

      $scope.doLogin = function(){
          var link = 'http://localhost:8888/login.php';

          $http.post(link, {
            pseudo : $scope.data.pseudo,
            password : $scope.data.password
          }).then(function (res){
              $scope.currentUser = res.data[0];
            });
          };
    })

.controller('homeCtrl', function($scope, $http, $ionicModal, Camera){

      $ionicModal.fromTemplateUrl('templates/ajoutlieu.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeActivity = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.Activity = function() {
        $scope.modal.show();
        var link = 'http://localhost:8888/getcategorie.php';

        $http.get(link).then(function (res){
            $scope.cats = res.data;
                });

      };

      $scope.data = {};

        $scope.submit = function(){
            var link = 'http://localhost:8888/inser_lieu.php';

            $http.post(link, {
              nom : $scope.data.nom,
              categorie : $scope.data.cat,
              description : $scope.data.description,
              adresse : $scope.data.adresse,
              utilisateur : $scope.currentUser.id,
              photo : $scope.data.photo
                  }).then(function (res){
              $scope.reponse = res.data;
              });
            };


        // $scope.getPhoto = function() {
        //     Camera.getPicture().then(function(imageURI) {
        //     console.log(imageURI);
        //   }, function(err) {
        //     console.err(err);
        //   })
        //
        // };
      })

.controller('mapCtrl', function($scope, $http, $ionicModal, NgMap, $ionicPopup, $timeout) {


        var zoom = $scope.zoom;
        $scope.data = {};

        NgMap.getMap().then(function(map) {
                $scope.map = map;
            });

        var link = 'http://localhost:8888/markers.php';

        $http.get(link).then(function (res){
            $scope.lieus = res.data;
                });

        $scope.showInfos = function(event, lieu) {
                   $scope.selectedlieu = lieu;
                   $scope.map.showInfoWindow('myInfoWindow', this);
               };


        $ionicModal.fromTemplateUrl('templates/lieu.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLieu = function() {
          $scope.modal.hide();

        };

        // Open the login modal
        $scope.Lieu = function() {
          $scope.modal.show();
          var link2 = 'http://localhost:8888/comments.php';

          $http.post(link2, {
            id : $scope.selectedlieu.id,
            tous : 0  //On prend 3 commentaires
          }).then(function (res){
              $scope.comments = res.data;
                  });
        };

        //afficher tout les commentaires
        $scope.showComments = function() {
          $scope.modal.show();
          var link2 = 'http://localhost:8888/comments.php';

          $http.post(link2, {
            id : $scope.selectedlieu.id,
            tous : 1 //On prend tous les commentaires
          }).then(function (res){
              $scope.comments = res.data;
                  });
        };

        //Système de commentaire
        $scope.showPopup = function() {
       $scope.data = {}

       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
         template: '<input type="texte" ng-model="data.texte">',
         title: 'Entrer votre commentaire',
        //  subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
           { text: 'Annuler' },
           {
             text: '<b>Envoyer</b>',
             type: 'button-positive',
             onTap: function(e) {
               if (!$scope.data.texte) {
                 //don't allow the user to close unless he enters wifi password
                 e.preventDefault();
               } else {

                //on envoie le commentaire
                 var link3 = 'http://localhost:8888/inser_comments.php';

                 $http.post(link3, {
                   commentaire : $scope.data.texte,
                   lieu : $scope.selectedlieu.id,
                   utilisateur : $scope.currentUser.id

                 }).then(function(res){
                   $scope.reponse = res.data;
                 });


               }
             }
           },
         ]
       });
       myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
       myPopup.close(); //close the popup after 10 seconds for some reason
    }, 10000);
    };

});
