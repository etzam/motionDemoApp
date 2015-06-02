'use strict';

/* Filters */

angular.module('motionDemoFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
