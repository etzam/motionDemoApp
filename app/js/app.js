'use strict';

/* App Module */

var motionDemoApp = angular.module('motionDemoApp', [
  'ngRoute',
  'motionDemoControllers',
  'motionDemoFilters',
  'motionDemoServices'
])
.run(function ($rootScope) {
  $rootScope.password = {};
  $rootScope.password.value = 'welcome';
  $rootScope.authenticated = false;
  $rootScope.connected = false;
  $rootScope.webservice_address = "";
});

motionDemoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/files', {
        templateUrl: 'partials/file-list.html',
        controller: 'FileListCtrl'
      }).
      when('/config', {
        templateUrl: 'partials/config.html',
        controller: 'ConfigCtrl'
      }).
      when('/apidocu', {
        templateUrl: 'partials/api-docu.html',
        controller: 'ApiDocuCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
