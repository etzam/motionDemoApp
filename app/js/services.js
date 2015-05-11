'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);


  phonecatServices.factory('Video', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/files.json');
  }]);

  phonecatServices.factory('Config', ['$resource',
    function($resource) {
      return $resource('http://raspberrydh.ddns.net/config.json', {}, {
      query: {method:'GET', isArray:false}
      });
  }]);

phonecatServices.factory('ApiDocu', ['$resource',
    function($resource){
      return $resource('resources/api-docu.json', {}, {
        query: {method:'GET', isArray:true}
      });
    }]);
