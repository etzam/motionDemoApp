'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', ['ui.bootstrap']);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone,  $modal, $log) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

  phonecatControllers.controller('HomeCtrl', ['$scope', 'Phone',
    function($scope, Phone) {
      $scope.phones = Phone.query();
      $scope.orderProp = 'age';
    }]);

phonecatControllers.controller('ApiDocuCtrl', ['$scope', 'ApiDocu',
    function($scope, ApiDocu) {
      $scope.apidocus = ApiDocu.query();
      console.log($scope.apidocus);
    }]);

  phonecatControllers.controller('ConfigCtrl', ['$scope', 'Config',
      function($scope, Config) {
        $scope.orderProp = 'age';
        $scope.settings = [
          {
            'key' : 'framerate',
            'value':'2'
          },
          {
            'key': 'width',
            'value': '320'
          }
        ];
       $scope.configs = Config.query();
      }]);

  phonecatControllers.controller('FileListCtrl', ['$scope', '$modal', '$log', 'Video',
    function($scope, $modal, $log, Video) {
        $scope.orderProp = 'age';
        $scope.files = [
          {'name':'motionvid_1.mp4',
          'path':'img/big_buck_bunny.mp4'},
          {          'name':'motionvid_2.mp4',
                    'path':'img/big_buck_bunny.mp4'
          }
        ];
        $scope.videos = Video.query();
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

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
