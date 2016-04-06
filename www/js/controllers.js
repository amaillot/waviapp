angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $http, $ionicPopup) {

  if (window.localStorage.getItem("username") != undefined) {
      $scope.localuser = window.localStorage.getItem("username");
      $scope.localpassword = window.localStorage.getItem("password");
      var link = 'http://www.wavi.fr/php/wavi-api/login.php';

      $http.post(link, {
        pseudo : $scope.localuser,
        password : $scope.localpassword
      }).then(function (res){
          $scope.auth = res.data[0];
          window.location.replace("#/app/home");
          $scope.currentUser = $scope.auth;
          var avatar = $scope.currentUser.avatar;
          $('.avatarmenu').css('background-image', 'url('+avatar+')');
          $('#textmenu').html($scope.currentUser.prenom);
          window.localStorage.setItem("username", $scope.currentUser.pseudo);
          window.localStorage.setItem("password", $scope.currentUser.password);
  });

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

          $scope.doInscription = function(){

            if ($scope.data.password === $scope.data.password2) {
              var link = 'http://www.wavi.fr/php/wavi-api/inscription.php';
              // var link = 'http://localhost:8888/inscription.php';

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
                var alertPopup = $ionicPopup.alert({
                title: 'Vous êtes bien inscrit ! Bienvenue sur Wavi!'
               });
                $scope.modal.hide();

            }else {
              var alertPopup = $ionicPopup.alert({
              title: 'Mot de passe incorrect'
             });
            }

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
                if ($scope.data.check == true) {
                  window.localStorage.setItem("username", $scope.currentUser.pseudo);
                  window.localStorage.setItem("password", $scope.currentUser.password);
                }
                var alertPopup = $ionicPopup.alert({
                title: 'Bienvenue '+$scope.currentUser.pseudo+' !'
               });
              }
            });
          };

    })

.controller('CompteCtrl', function($scope, $http, $ionicModal, $ionicPopup){

  $scope.data = {};

      $scope.info = true;

      $scope.modification = function() {
        $scope.info = false;
        $scope.modif = true;
      }

      $scope.annuler = function() {
        $scope.info = true;
        $scope.modif = false;
      }

      $scope.modifier = function() {

        console.log($scope.data.newpassword);
        console.log($scope.data.newpassword2);


        if ($scope.data.newpassword === $scope.data.newpassword2) {

          var link = 'http://www.wavi.fr/php/wavi-api/modificationcompte.php';

          $http.post(link, {
            pseudoactuel : $scope.currentUser.pseudo,
            prenom : $scope.data.prenom,
            nom : $scope.data.nom,
            mail : $scope.data.mail,
            newpassword : $scope.data.newpassword,
            pseudo : $scope.data.pseudo,
            description : $scope.data.description
          }).then(function (res){
              $scope.reponse = res.data;
            });

          $scope.info = true;
          $scope.modif = false;
        }else {
          var alertPopup = $ionicPopup.alert({
          title: 'Mot de passe incorrect'
         });
        }

      }

      $scope.deconnexion = function(){
          window.location.replace("#/app/login");
          window.localStorage.removeItem("username");
          window.localStorage.removeItem("password");
      };
   })

.controller('homeCtrl', function($scope, $http, $ionicModal, $rootScope, Camera){
    $scope.data = {};

    $scope.lastPhoto = "img/wavicouv.jpg";

        $scope.position = {};

        var onSuccess = function(position) {
          $scope.position.latitude = position.coords.latitude;
          $scope.position.longitude = position.coords.longitude;

          $rootScope.lat = $scope.position.latitude;
          $rootScope.lng = $scope.position.longitude;

        console.log($scope.position);
      };

      navigator.geolocation.getCurrentPosition(onSuccess);


      $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };


  $scope.uploadPhoto = function() {
      var imageURI        = $scope.lastPhoto;
      var options         = new FileUploadOptions();
      options.fileKey     = "file";

      options.fileName    = imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType    = "image/jpeg";

      var params          = {};
      params.value1       = "test";
      params.value2       = "param";

      options.params      = params;
      options.chunkedMode = false;

      var win = function(r) {
          console.log("Code = " + r.responseCode);
          console.log("Response = " + r.response);
          console.log("Sent = " + r.bytesSent);
          alert(r.response);
      };

      var fail = function(error) {
          alert("An error has occurred: Code = " + error.code);
      };

      var ft = new FileTransfer();
      ft.upload(imageURI, "http://www.wavi.fr/php/wavi-api/upload.php", win, fail, options);

      $scope.lien = "http://www.wavi.fr/php/wavi-api/";

      var s = $scope.lastPhoto;

      $scope.nom_photo = s.substr(s.lastIndexOf('/') + 1); // +1 pour commencer au caractère suivant

      $scope.photo = $scope.lien+$scope.nom_photo;

      // var link = 'http://localhost:8888/inser_lieu.php'
        var link = 'http://www.wavi.fr/php/wavi-api/inser_lieu.php';

        $scope.reponse = {
          nom : $scope.data.nom,
          categorie : $scope.data.cat,
          description : $scope.data.description,
          lat : $scope.lat,
          lng : $scope.lng,
          utilisateur : $scope.currentUser.id,
          photo : $scope.photo
        };

        $http.post(link, {
          nom : $scope.data.nom,
          categorie : $scope.data.cat,
          description : $scope.data.description,
          lat : $scope.lat,
          lng : $scope.lng,
          utilisateur : $scope.currentUser.id,
          photo : $scope.photo
              }).then(function (res){
          $scope.reponse2 = res.data;
          });

  };



        var windowWidth = $(window).width();
        var windowWidth = windowWidth*(85/100);

      $('.button-collapse').sideNav({
      menuWidth: windowWidth, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

  // var link = 'http://localhost:8888/getcategorie.php';
  var link = 'http://www.wavi.fr/php/wavi-api/getcategorie.php';

    $http.get(link).then(function (res){
    $scope.cats = res.data;
    // console.log($scope.cats.length);
        });

      $scope.filtrer = function() {

        // var link = 'http://localhost:8888/markers.php';
        var link = 'http://www.wavi.fr/php/wavi-api/markers.php';


        $http.post(link, {
          id1 : $scope.cats[0].value,
          id2 : $scope.cats[1].value,
          id3 : $scope.cats[2].value,
          id4 : $scope.cats[3].value,
          id5 : $scope.cats[4].value,
          id6 : $scope.cats[5].value
        }).then(function (res){
            $rootScope.lieus = res.data;
                        });
      }

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




    $scope.localiser = function() {


  $scope.position = {};

  var onSuccess = function(position) {
    $scope.position.latitude = position.coords.latitude;
    $scope.position.longitude = position.coords.longitude;

    $scope.lat = $scope.position.latitude;
    $scope.lng = $scope.position.longitude;

  console.log($scope.position);
};

navigator.geolocation.getCurrentPosition(onSuccess);

  };

      })

.controller('mapCtrl', function($scope, $http, $ionicModal, NgMap, $ionicPopup, $timeout, $rootScope) {

        var zoom = $scope.zoom;
        $scope.data = {};

        NgMap.getMap().then(function(map) {
                $scope.map = map;
            });

        $scope.showInfos = function(event, lieu) {
                  console.log(lieu);
                   $scope.selectedlieu = lieu;
                   console.log($scope.selectedlieu);
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
