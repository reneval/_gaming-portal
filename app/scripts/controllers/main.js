'use strict';

/**
 * @ngdoc function
 * @name gamingPortalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gamingPortalApp
 */
angular.module('gamingPortalApp')
  .controller('MainCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {
    $scope.logins = '';

    $scope.users = [];

    $scope.loading = false;

    $scope.submitted = false;

    $scope.prepareLogins = function () {
    	var logins = [];

    	if ($scope.logins !== '') {
    		// Split string by new line, comma or space
	    	$scope.logins.split(/\r?\n|,|\s/).map(function (item) {
	    		// Delete empty elements
	    		if (item !== '') {
	    			logins.push(item);
	    		}
	    	});
    	}

    	return logins;
    };

    $scope.search = function () {
    	var users = [],
    		logins = $scope.prepareLogins(),
    		promises = [];

    	if (!logins.length) {
    		return false;
    	}

    	$scope.users = []; // Reset previous data

    	$scope.loading = true;

    	$scope.submitted = true;

    	logins.forEach(function (login) {
    		// Doc: https://developer.github.com/v3/users/#get-a-single-user
    		// List of users: https://gist.github.com/paulmillr/2657075/
			promises.push(
				$http.get('https://api.github.com/users/' + login) // TODO: use constant
			);
		});

    	// Prevent DOM re-rendering after adding each user
		$q.all(promises).then(function (results) {
			results.forEach(function (result) {
				users.push(result.data);
			});

			$scope.loading = false;

			// Show users
			$scope.users = users;
		},
        function (error) {
            $scope.loading = false;
        });
    };
  }]);
