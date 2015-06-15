'use strict';

/* Services */

//Service-Controller, welche die json-Objekte anfragen und verarbeiten

var motionDemoServices = angular.module('motionDemoServices', ['ngResource']);

  //holt sich die Videoaufzeichnungen vom Webservice
  motionDemoServices.factory('Video', ['$resource', '$rootScope',
    function($resource, $rootScope) {
      return $resource($rootScope.webservice_address + '/files.json');
  }]);

  //löscht das über :filename angegebene Video
  motionDemoServices.factory('DeleteVideo', ['$resource','$rootScope',
    function($resource, $rootScope) {
      return $resource($rootScope.webservice_address + '/files/delete/:filename', {}, {
      'delete_video': {method:'DELETE'}
      });
  }]);

  //holt sich die Konfigurationswerte
  motionDemoServices.factory('Config', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config.json', {}, {
      query: {method:'GET', isArray:true}
      });
  }]);

  //holt sich die PurgeTime (Anzahl an Tagen, nach den das Video gelöscht werden soll)
  motionDemoServices.factory('PurgeTime', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/purge.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  //setzt eine neue PurgeTime über den Webservice
  motionDemoServices.factory('SetPurgeTime', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/purge/:days_to_purge', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

  //Beep (Alarmton): JSON-Objekt enthält, ob der Alarmton ein-/ausgeschaltet ist
  motionDemoServices.factory('Beep', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/beep.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  //setzt einen neuen Wert über :beep_value (Wert von :beep_value: on/off)
  motionDemoServices.factory('SetBeep', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + 'config/beep/:beep_value', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

  //holt sich die api-docu.json-Datei, welche im Resources-Ordner liegt
  motionDemoServices.factory('ApiDocu', ['$resource',
    function($resource) {
      return $resource('resources/api-docu.json', {}, {
        query: {method:'GET', isArray:true}
      });
  }]);
