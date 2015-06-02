'use strict';

/* Services */

var motionDemoServices = angular.module('motionDemoServices', ['ngResource']);

  motionDemoServices.factory('Video', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/files.json');
  }]);

  motionDemoServices.factory('DeleteVideo', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/files/delete/:filename', {}, {
      'delete_video': {method:'DELETE'}
      });
  }]);

  motionDemoServices.factory('Config', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config.json', {}, {
      query: {method:'GET', isArray:true}
      });
  }]);

  motionDemoServices.factory('PurgeTime', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config/purge.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  motionDemoServices.factory('SetPurgeTime', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config/purge/update/:days_to_purge', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

  motionDemoServices.factory('Beep', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config/beep.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  motionDemoServices.factory('SetBeep', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config/beep/:beep_value', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);

motionDemoServices.factory('ApiDocu', ['$resource',
    function($resource){
      return $resource('resources/api-docu.json', {}, {
        query: {method:'GET', isArray:true}
      });
    }]);
