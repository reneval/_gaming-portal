'use strict';

/**
 * @ngdoc overview
 * @name gamingPortalApp
 * @description
 * # gamingPortalApp
 *
 * Main module of the application.
 */
angular
  .module('gamingPortalApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
