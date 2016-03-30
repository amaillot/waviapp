angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $http, $ionicPopup) {
  
  if (window.localStorage.getItem("username") =! undefined) {
    $scope.localuser = window.localStorage.getItem("username");
  }

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/inscription.html', {
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
              var link = 'http://www.wavi.fr/php/wavi-api/api.php';

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
          var link = 'http://www.wavi.fr/php/wavi-api/login.php';

          $http.post(link, {
            pseudo : $scope.data.pseudo,
            password : $scope.data.password
          }).then(function (res){
              $scope.auth = res.data[0];
              if ($scope.auth.prenom == 'Erreur') {
                var alertPopup = $ionicPopup.alert({
                title: "Erreur d'authentification !"})
              }else if ($scope.auth.prenom == '') {
                var alertPopup = $ionicPopup.alert({
                title: "Erreur d'authentification !"
               });

              }else{

                window.location.replace("#/app/home");
                $scope.currentUser = $scope.auth;
                var avatar = $scope.currentUser.avatar;
                $('.avatarmenu').css('background-image', 'url('+avatar+')');
                $('#textmenu').html($scope.currentUser.prenom);
                window.localStorage.setItem("username", $scope.currentUser.pseudo);
                window.localStorage.setItem("password", $scope.currentUser.password);
                var alertPopup = $ionicPopup.alert({
                title: 'Bienvenue '+$scope.currentUser.pseudo+' !'
               });
              }
            });
          };

    })

.controller('CompteCtrl', function($scope, $http, $ionicModal){
      $scope.deconnexion = function(){
          window.location.replace("#/app/login");
      };
   })

.controller('aproposCtrl', function($scope, $http, $ionicModal){

      $scope.sheet = function() {
        var options = {
          'buttonLabels' : ['Library', 'Camera'],
          'androidEnableCancelButton' : true,
          'winphoneEnableCancelButton' : true,
          'addCancelButtonWithLabel' : 'Cancel'
        };
        window.plugins.actionsheet.show(options, callback);
      };

      $(".testbutton").click(function(){
          $(".test").slideToggle(300);
      });

  })


.controller('homeCtrl', function($scope, $http, $ionicModal){
    var link = 'http://www.wavi.fr/php/wavi-api/getcategorie.php';

      $http.get(link).then(function (res){
      $scope.cats = res.data;
          });





        var windowWidth = $(window).width();
        var windowWidth = windowWidth*(85/100);

      $('.button-collapse').sideNav({
      menuWidth: windowWidth, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

      $(".down").click(function(){
        if ($(".down").hasClass('up')) {
          $(".filtres").delay(300).fadeOut(200);
          $(".listefiltre").slideUp(300);
          $(".down").removeClass('up');
        } else {
          $(".filtres").fadeIn(200);
          $(".listefiltre").delay(200).slideDown(300);
          $(".down").addClass('up');
        }
      });

      $scope.check = function(id){
        $('#'+id+'').prop('checked', function (i, value) {
        return !value;
      });

      }

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

      };

      $scope.data = {};

        $scope.submit = function(){
            var link = 'http://www.wavi.fr/php/wavi-api/inser_lieu.php';
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
      })

.controller('mapCtrl', function($scope, $http, $ionicModal, NgMap, $ionicPopup, $timeout) {

    var link = 'http://www.wavi.fr/php/wavi-api/getcategorie.php';

    $http.get(link).then(function (res){
    $scope.cats = res.data;
        });

        var zoom = $scope.zoom;
        $scope.data = {};

        NgMap.getMap().then(function(map) {
                $scope.map = map;
            });

        var link = 'http://www.wavi.fr/php/wavi-api/markers.php';

        $http.get(link).then(function (res){
            $scope.lieus = res.data;
                        });

        $scope.showInfos = function(event, lieu) {
                   $scope.selectedlieu = lieu;
                   $scope.map.showInfoWindow('myInfoWindow', this);
                   $scope.go = false;
               };


        $scope.allonsy = function() {
            $scope.go = true;
            $scope.modal.hide();
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
          var link2 = 'http://www.wavi.fr/php/wavi-api/comments.php';

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
          var link2 = 'http://www.wavi.fr/php/wavi-api/comments.php';

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
       var PopupCommentaire = $ionicPopup.show({
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
                 var link3 = 'http://www.wavi.fr/php/wavi-api/inser_comments.php';

                 $http.post(link3, {
                   commentaire : $scope.data.texte,
                   lieu : $scope.selectedlieu.id,
                   utilisateur : $scope.currentUser.id

                 }).then(function(res){
                   $scope.reponse = commentairenow.data;
                 });


               }
             }
           },
         ]
       });
       PopupCommentaire.then(function(res) {
      console.log('Tapped!', res);
    });
    $timeout(function() {
       PopupCommentaire.close(); //close the popup after 10 seconds for some reason
    }, 10000);
    };

    $scope.noter = function(note){
      $scope.note = note;
    }

    $scope.showPopupNote = function() {
   $scope.data = {}


   // An elaborate, custom popup
   var PopupNote = $ionicPopup.show({
     template: '<div class="rating"><a href="#" ng-click="noter(5)">☆</a><a href="#" ng-click="noter(4)">☆</a><a href="#" ng-click="noter(3)">☆</a><a href="#" ng-click="noter(2)">☆</a><a href="#" ng-click="noter(1)">☆</a></div>',
     title: 'Entrer votre note',
    //  subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Annuler' },
       {
         text: '<b>Envoyer</b>',
         type: 'button-positive',
         onTap: function(e) {
            // on envoie le commentaire
             var link = 'http://www.wavi.fr/php/wavi-api/note.php';

             $http.post(link, {
               note : $scope.note,
               lieu : $scope.selectedlieu.id
             }).then(function(res){
               $scope.notation = res.data;
             });

            myPopup.close();

         }
       },
     ]
   });
   PopupNote.then(function(res) {
  console.log('Tapped!', res);
});
$timeout(function() {
   PopupNote.close(); //close the popup after 10 seconds for some reason
}, 10000);
};


});
