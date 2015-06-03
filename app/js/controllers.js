'use strict';

/* Controllers */

var motionDemoControllers = angular.module('motionDemoControllers', ['ui.bootstrap']);

  motionDemoControllers.controller('HomeCtrl', ['$scope',
    function($scope) {
      $scope.orderProp = 'age';
    }]);

motionDemoControllers.controller('ApiDocuCtrl', ['$scope', 'ApiDocu',
    function($scope, ApiDocu) {
      $scope.apidocus = ApiDocu.query();
    }]);

  motionDemoControllers.controller('ConfigCtrl', ['$scope', '$rootScope','Config', 'PurgeTime', 'SetPurgeTime', 'Beep', 'SetBeep',
      function($scope, $rootScope, Config, PurgeTime, SetPurgeTime, Beep, SetBeep) {
          //motion-config
          $scope.configs = Config.query();

          //Purge-time
          $scope.purgeTime = PurgeTime.query();
          var pt = $scope.purgeTime;

          //Passwort
          $scope.updatePassword = function(new_password) {
            $rootScope.password.value = new_password;
          }

          $scope.inputType = 'password';
          $scope.hideShowPassword = function() {
            if ($scope.inputType == 'password')
              $scope.inputType = 'text';
            else
              $scope.inputType = 'password';
          };

          $scope.setPurgeValue = function (new_purge_value) {
            pt.days_to_purge = new_purge_value;
            SetPurgeTime.update({days_to_purge:pt.days_to_purge}, pt);
          };

          //beep_vaule
          $scope.beep = Beep.query();

          console.log($scope.beep);
          if ($scope.beep.beep_value == 'on')
            $scope.currentBeep = true
          else
            $scope.currentBeep = false;

          $scope.EnableBeepValue = function () {
            console.log('einschalten');
            $scope.currentBeep = true;
            $scope.beep.beep_value = 'on';
            SetBeep.update({beep_value:$scope.beep.beep_value}, $scope.beep);
          };

          $scope.DisableBeepValue = function () {
            console.log('ausschalten');
            $scope.currentBeep = false;
            $scope.beep.beep_value = 'off';
            SetBeep.update({beep_value:$scope.beep.beep_value}, $scope.beep);
          };

      }]);

  motionDemoControllers.controller('FileListCtrl', ['$scope', '$modal', '$log', 'Video', 'DeleteVideo', '$rootScope','$location', '$route',
    function($scope, $modal, $log, Video, DeleteVideo, $rootScope, $location, $route) {
        $scope.videos = Video.query();

        $scope.deleteVideo= function(video) {
             DeleteVideo.delete_video({filename: video});
             $route.reload();
           };



        $scope.open = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
        };
      }]);

      // Please note that $modalInstance represents a modal window (instance) dependency.
      // It is not the same as the $modal service used above.

    motionDemoControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
          $scope.completeUrl = "{{$rootScope.webservice_address}}/video/mp4/";
        };
      });

    motionDemoControllers.controller('loginCtrl', ['$scope','$rootScope', '$location', '$http',
     function ($scope, $rootScope, $location, $http) {
        $scope.checkPassword = function (user_password) {
          if ($rootScope.password.value == user_password){
                    $location.path('/config');
                    $rootScope.authenticated = true;
                  } else {
                    $rootScope.authenticated = false;
                  };
        };

        $scope.checkWebserviceAddress = function () {
          $http.get($rootScope.webservice_address).
          success(function(data, status, headers, config) {
              console.log("erfolgreich verbunden");
              $rootScope.connected = true;
              $location.path('/home');
              console.log($rootScope.webservice_address);
          }).
          error(function(data, status, headers, config) {
            $rootScope.connected = false;
            console.log("nicht erfolgreich verbunden");
          });

        };
      }]);
