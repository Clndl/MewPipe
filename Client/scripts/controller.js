mewPipeApp.controller('MainCtrl', ['$rootScope', '$http', '$scope', '$route', '$location', '$callService', '$sce', '$cookies',
	function($rootScope, $http, $scope, $route, $location, $callService, $sce, $cookies) {


		$scope.config = {
			sources: [
			{src: $sce.trustAsResourceUrl("http://127.0.0.1:8080/api/video/download/54931e0dd46f920000f2e3ae"), type: "video/mp4"}
			],
			theme: "bower_components/videogular-themes-default/videogular.css",
			plugins: {
				poster: ""
			}
		};

		$scope.videos = [];
		$scope.readAll = function() {
			$callService.requestGet('video_read', null, null, function (success, data) {	
				if(success){
					for(var i in data) {
						$scope.videos.push(data[i]);
						$scope.videos[i].image = getApiAddr() + apiUrl.route['video_image'] +"/"+ data[i]._id;
						$scope.videos[i].sources = [{
							src: $sce.trustAsResourceUrl("http://127.0.0.1:8080/api/videos/download/"+$scope.videos[i]._id), 
							type: "video/mp4"
						}];
						$scope.videos[i].theme = "bower_components/videogular-themes-default/videogular.css";
						$scope.user = data._user;
					}
					setTimeout( function() {
						new grid3D( document.getElementById( 'grid3d' ) );
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

		console.log('PARAM', $routeParams.param);
		localStorage.setItem('token', $routeParams.param)


	}]);
 