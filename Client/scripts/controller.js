mewPipeApp.controller('MainCtrl', ['$rootScope', '$http', '$scope', '$route', '$location', '$callService', '$sce', '$cookies',
	function($rootScope, $http, $scope, $route, $location, $callService, $sce, $cookies) {

		$scope.videos = [];
		$scope.readAll = function() {
			$callService.requestGet('video_read', null, null, function (success, data) {	
				if(success){
					for(var i in data) {
						$scope.videos.push(data[i]);
						$scope.videos[i].image = getApiAddr() + api.route['video_image'] +"/"+ data[i]._id;
						$scope.videos[i].sources = [{
							src: $sce.trustAsResourceUrl("http://127.0.0.1:8080/api/videos/download/"+$scope.videos[i]._id), 
							type: "video/mp4"
						}];
						$scope.videos[i].theme = "lib/videogular-themes-default/videogular.css";
						$scope.user = data._user;
					}
					$scope.suggestVideos = angular.copy($scope.videos);
					setTimeout( function() {
						new grid3D( document.getElementById( 'relatedVideo' ) );
					}, 200 );
					setTimeout( function() {
						new grid3D( document.getElementById( 'suggestedVideo' ) );
					}, 200 );
				}else {
					$rootScope.showNotif(data, 'notice');
				}
			});
		};
		$scope.readAll();
	}]);

mewPipeApp.controller('AuthCtrl', ['$rootScope', '$http', '$scope', '$route', '$routeParams', '$location', '$callService', '$sce', '$cookies',
	function($rootScope, $http, $scope, $route, $routeParams, $location, $callService, $sce, $cookies) {

		localStorage.setItem('token', $routeParams.param)
		$location.path("/");


	}]);
