'use strict';

/* Services */

var motionDemoServices = angular.module('motionDemoServices', ['ngResource']);

  motionDemoServices.factory('Video', ['$resource', '$rootScope',
    function($resource, $rootScope) {
      console.log($rootScope.webservice_address + '/files.json');
      return $resource($rootScope.webservice_address + '/files.json');
  }]);

  motionDemoServices.factory('DeleteVideo', ['$resource','$rootScope',
    function($resource, $rootScope) {
      return $resource($rootScope.webservice_address + '/files/delete/:filename', {}, {
      'delete_video': {method:'DELETE'}
      });
  }]);

  motionDemoServices.factory('Config', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config.json', {}, {
      query: {method:'GET', isArray:true}
      });
  }]);

  motionDemoServices.factory('PurgeTime', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/purge.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  motionDemoServices.factory('SetPurgeTime', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/purge/update/:days_to_purge', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

  motionDemoServices.factory('Beep', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource($rootScope.webservice_address + '/config/beep.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  motionDemoServices.factory('SetBeep', ['$resource','$rootScope',
    function($resource,$rootScope) {
      return $resource('http://raspberrydh.ddns.net/config/beep/:beep_value', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

motionDemoServices.factory('ApiDocu', ['$resource',
    function($resource) {
      return $resource('resources/api-docu.json', {}, {
        query: {method:'GET', isArray:true}
      });
    }]);
