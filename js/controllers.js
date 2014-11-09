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
			$scope.loadRecordings = function() {
				$http.post("/Dvr/GetRecordedList").success(
						function(data) {
							$scope.recordings = data.ProgramList.Programs;
						});
			}
			$scope.loadStreams = function() {
				$http.post("/Content/GetLiveStreamList").success(
						function(data) {
							$scope.streams = data.LiveStreamInfoList.LiveStreamInfos;
							console.log($scope.streams.length+" streams loaded");
						});
			}
			$scope.getTitleFromLocalStorage = function(streamId) {
				var title = localStorage.getItem("titleForStreamId"+streamId);
				console.log("Retrieved title for titleForStreamId"+streamId+" TITLE: " + title);
				return title;
			}
			$scope.actionToTake='raw';
			$scope.recordingsPredicate = '-StartTime';
			$scope.streamsPredicate = 'StatusStr';
			$scope.loadRecordings();
			$scope.loadStreams();
			window.setInterval($scope.loadStreams,1000*15);
			console.log("Timer started for loading of streams");
			$scope.handleRecording = function(recording) {
				console.log("Handing recording: "+JSON.stringify(recording));
				if ($scope.actionToTake=='raw') {
					url = "/Content/GetRecording?StartTime="+recording.StartTime+"&ChanId="+recording.Channel.ChanId;
					window.location.href=url;
				}
				if ($scope.actionToTake=='transcode') {
                                        $http.post('/Content/AddRecordingLiveStream?ChanId='+recording.Channel.ChanId+'&StartTime='+recording.StartTime).
						success(function(data) {
							console.log("Storing to local storage: titleForStreamId"+data.LiveStreamInfo.Id+" "+recording.Title);
							localStorage.setItem("titleForStreamId"+data.LiveStreamInfo.Id,recording.Title);
							$scope.loadStreams();
						}
					);
				}
			}
			$scope.stopStream = function(stream) {
				console.log("Stopping stream: " + JSON.stringify(stream));
				$http.post('/Content/StopLiveStream?Id='+stream.Id).success(function(data) {$scope.loadStreams();});
				$scope.loadStreams();
			}
			$scope.deleteStream = function(stream) {
				console.log("Deleting stream: " + JSON.stringify(stream));
				$http.post('/Content/RemoveLiveStream?Id='+stream.Id).success(function(data) {$scope.loadStreams();});
				
			}
			$scope.hoverWork = function(recording) {
				console.log("Hover Work: " + recording);
				$scope.hoverTitle=recording.Title;
                        }

		}


 ]);
mythTVWebApp.controller('LiveTVController', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.loadData = function() {
				var dateString = moment().format('YYYY-MM-DDTHH:MM:ss')
				$http.post("/Guide/GetProgramGuide?StartTime="+dateString+"&EndTime="+dateString).success(
						function(data) {
							$scope.channels = data.ProgramGuide.Channels;
							console.log($scope.channels.length);
						});
			}

			$scope.predicate = 'ChanNum';
			$scope.loadData();
		}


 ]);
