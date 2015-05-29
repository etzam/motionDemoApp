'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

  phonecatServices.factory('Video', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/files.json');
  }]);

  phonecatServices.factory('DeleteVideo', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/files/delete/:filename', {}, {
      delete: {method:'DELETE'}
      });
  }]);

  phonecatServices.factory('Config', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config.json', {}, {
      query: {method:'GET', isArray:true}
      });
  }]);

  phonecatServices.factory('PurgeTime', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/purge.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

  phonecatServices.factory('SetPurgeTime', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/purge/:days_to_purge', {}, {
        'update': { method:'PUT', isArray:false}
      });
  }]);



phonecatServices.factory('ApiDocu', ['$resource',
    function($resource){
      return $resource('resources/api-docu.json', {}, {
        query: {method:'GET', isArray:true}
      });
    }]);
