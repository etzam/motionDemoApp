'use strict';

/* Controllers */

var motionDemoControllers = angular.module('motionDemoControllers', ['ui.bootstrap']);

  //HomeCtrl
  motionDemoControllers.controller('HomeCtrl', ['$scope',
    function($scope) {
        //enthält bislang keine Logik
    }]);


  motionDemoControllers.controller('ApiDocuCtrl', ['$scope', 'ApiDocu',
    function($scope, ApiDocu) {
      //ApiDocuCtrl holt sich die im api-docu.json enthaltene Schnittstellenbeschreibung über den ServiceController
      $scope.apidocus = ApiDocu.query();
    }]);


  motionDemoControllers.controller('ConfigCtrl', ['$scope', '$rootScope','Config', 'PurgeTime', 'SetPurgeTime', 'Beep', 'SetBeep',
    function($scope, $rootScope, Config, PurgeTime, SetPurgeTime, Beep, SetBeep) {
        //holt sich die Konfiguration über den ServiceController, welcher den Webservice konsumiert
      $scope.configs = Config.query();


      //überschreiben des Passwort für die Konfigurationsoberlfäche
      $scope.updatePassword = function(new_password) {
        $rootScope.password.value = new_password;
      }

      //Toggeln des inputType: anzeigen des Passwort im Klartext bzw. verstecken
      $scope.inputType = 'password';
      $scope.hideShowPassword = function() {
        if ($scope.inputType == 'password')
          $scope.inputType = 'text';
        else
          $scope.inputType = 'password';
      };

      //PurgeTime beschreibt nach welcher Anzahl von Tagen eine Aufzeichnung gelöscht werden soll
      $scope.purgeTime = PurgeTime.query();
      var pt = $scope.purgeTime;

      //überschreibt die PurgeTime
      $scope.setPurgeValue = function (new_purge_value) {
        pt.days_to_purge = new_purge_value;
        SetPurgeTime.update({days_to_purge:pt.days_to_purge}, pt);
      };

      //beep ist das Synoym für den Alarmton, Abfrage ob Alarmton eingeschaltet ist über ServiceController
      $scope.beep = Beep.query();
      var b = $scope.beep;

      //Toggeln der Schaltflächen ein-/ausschalten: wenn beep_value auf on soll "ausschalten" aktiviert sein, bei off "einschalten"
      console.log(b);
      if ($scope.beep.beep_value == 'on')
        $scope.currentBeep = true
      else
        $scope.currentBeep = false;

      //einschalten des Alarmtons
      $scope.EnableBeepValue = function () {
        console.log('einschalten');
        $scope.currentBeep = true;
        $scope.beep.beep_value = 'on';
        SetBeep.update({beep_value:$scope.beep.beep_value}, $scope.beep);
      };

      //ausschalten des Alarmtons
      $scope.DisableBeepValue = function () {
        console.log('ausschalten');
        $scope.currentBeep = false;
        $scope.beep.beep_value = 'off';
        SetBeep.update({beep_value:$scope.beep.beep_value}, $scope.beep);
      };

  }]);

  //FileListCtrl ist der Controller für die Seite mit den Videoaufzeichnungen
  motionDemoControllers.controller('FileListCtrl', ['$scope', '$modal', '$log', 'Video', 'DeleteVideo', '$rootScope','$location', '$route',
    function($scope, $modal, $log, Video, DeleteVideo, $rootScope, $location, $route) {
        //holen der Videoaufzeichnungen
        $scope.videos = Video.query();

        //löschen einer Videoaufzeichnung
        $scope.deleteVideo= function(video) {
             DeleteVideo.delete_video({filename: video});
             $route.reload();
           };


        //Popup für das Anzeigen einer Aufzeichnung
        $scope.animationsEnabled = true;

        //öffnen des modalen Dialogs
        $scope.open = function (video,size) {
            $scope.items = video;
            var modalInstance = $modal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
              size: size,
              resolve: {
                items: function () {
                  return $scope.items;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
              }, function () {
                $log.info('Modal dismissed at: ' + new Date());
              });
            };

            $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
            };

      }]);


  //Popup für Anzeigen einer Aufzeichnung
  motionDemoControllers.controller('ModalInstanceCtrl', ['$scope','$rootScope', '$modalInstance', 'items', '$sce',
    function ($scope, $rootScope, $modalInstance,items,$sce) {
      //Konkatenation zum vollständigen Pfad der Aufzeichnung
      $scope.video = $rootScope.webservice_address + '/video/'+items;

      //als vertrauenswürdige URL deklarieren
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }


      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);

  //loginCtrl für das Einloggen in die Konfigurationsoberfläche bzw. für das Verbinden zu einem Webservice
  motionDemoControllers.controller('loginCtrl', ['$scope','$rootScope', '$location', '$http',
     function ($scope, $rootScope, $location, $http) {
       //Passwortüberprüfung mit dem eingegebenen Passwort
        $scope.checkPassword = function (user_password) {
          if ($rootScope.password.value == user_password){
                    $location.path('/config');
                    $rootScope.authenticated = true;
                  } else {
                    $rootScope.authenticated = false;
                  };
        };

        //Webservice-Adresse überprüfen
        $scope.checkWebserviceAddress = function (p_address) {
          //eine HTTP-Anfrage zum Webserivce versenden, bei Reponse connected auf true,
          //bei error conntected auf false und Fehlermeldung ausgeben
          $http.get(p_address).
          success(function(data, status, headers, config) {
              console.log("erfolgreich verbunden");
              $rootScope.connected = true;
              $rootScope.webservice_address = p_address;
              $location.path('/home');
              console.log($rootScope.webservice_address);
          }).
          error(function(data, status, headers, config) {
            $rootScope.connected = false;
            $rootScope.webservice_address = p_address;
            console.log("nicht erfolgreich verbunden");
            $rootScope.connection_error = true;
          });

        };
    }]);
