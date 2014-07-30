var mythTVWebApp = angular.module('mythTVWebModule', []);

mythTVWebApp.config(function($httpProvider) {
	$httpProvider.interceptors.push(function($q, $rootScope) {
		return {
			'request' : function(config) {
				$rootScope.$broadcast('loading-started');
				return config || $q.when(config);
			},
			'response' : function(response) {
				$rootScope.$broadcast('loading-complete');
				return response || $q.when(response);
			}
		};
	});

});

mythTVWebApp.directive("loadingIndicator", function() {
	return {
		restrict : "A",
		template : "<div>Loading...</div>",
		link : function(scope, element, attrs) {
			scope.$on("loading-started", function(e) {
				element.css({
					"display" : ""
				});
			});

			scope.$on("loading-complete", function(e) {
				element.css({
					"display" : "none"
				});
			});

		}
	};
});



mythTVWebApp.controller('RecordingsController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.loadData = function() {
				$http.post("/Dvr/GetRecordedList").success(
						function(data) {
							$scope.recordings = data.ProgramList.Programs;
						});
			}

			$scope.recordingsPredicate = '-StartTime';
			$scope.loadData();
		}


 ]);
mythTVWebApp.controller('LiveTVController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.loadData = function() {
				$http.post("/Guide/GetProgramGuide?StartTime=2014-07-29T21:14:00&EndTime=2014-07-29T21:14:00").success(
						function(data) {
							$scope.channels = data.ProgramGuide.Channels;
							console.log($scope.channels.length);
						});
			}

			$scope.predicate = 'ChanNum';
			$scope.loadData();
		}


 ]);
