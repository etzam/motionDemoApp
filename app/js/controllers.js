'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['ui.bootstrap']);

  phonecatControllers.controller('HomeCtrl', ['$scope',
    function($scope) {
      $scope.orderProp = 'age';
    }]);

phonecatControllers.controller('ApiDocuCtrl', ['$scope', 'ApiDocu',
    function($scope, ApiDocu) {
      $scope.apidocus = ApiDocu.query();
    }]);

  phonecatControllers.controller('ConfigCtrl', ['$scope', '$rootScope','Config', 'PurgeTime', 'SetPurgeTime', 'Beep', 'SetBeep',
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

  phonecatControllers.controller('FileListCtrl', ['$scope', '$modal', '$log', 'Video', 'DeleteVideo',
    function($scope, $modal, $log, Video, DeleteVideo) {
        $scope.videos = Video.query();

        $scope.deleteVideo= function(video) { // Delete a movie. Issues a DELETE to /api/movies/:id
            console.log(video);
             DeleteVideo.delete_video({filename: video});
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

    phonecatControllers.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
          $scope.completeUrl = "http://raspberrydh.ddns.net/video/mp4/";
        };
      });

    phonecatControllers.controller('loginCtrl', ['$scope','$rootScope', '$location',
     function ($scope, $rootScope, $location) {
        $scope.checkPassword = function (user_password) {
          if ($rootScope.password.value == user_password){
                    $location.path('/home');
                    $rootScope.authenticated = true;
                  } else {
                    $rootScope.authenticated = false;
                  };
        }
      }]);
