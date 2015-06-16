'use strict';

/* App Module */

//laden der abhängigen Units
var motionDemoApp = angular.module('motionDemoApp', [
  'ngRoute',
  'motionDemoControllers',
  'motionDemoServices'
])
//$rootScope initialsieren beim Programmstart
.run(function ($rootScope) {
  //Password für Konfigurationsoberfläche im rootScope hinterlegen
  $rootScope.password = {};
  $rootScope.password.value = 'welcome';
  //der Benutzer soll zunächst nicht authentifiziert sein
  $rootScope.authenticated = false;
  //der Benutzer soll bei Beginn nicht mit einem Webservice verbunden sein
  $rootScope.connected = false;
  $rootScope.webservice_address = "";
  $rootScope.connection_error = false;
});

//Definition der Routen
motionDemoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', { //Startseite mit Livevideo von der Webcam
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/files', { //enthält die Videoaufzeichnungen
        templateUrl: 'partials/file-list.html',
        controller: 'FileListCtrl'
      }).
      when('/config', { //enthält die Konfigurationen
        templateUrl: 'partials/config.html',
        controller: 'ConfigCtrl'
      }).
      when('/apidocu', { //enhält die Webservice-Beschreibung mit den Schnittstellenmethoden
        templateUrl: 'partials/api-docu.html',
        controller: 'ApiDocuCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
