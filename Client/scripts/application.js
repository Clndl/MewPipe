var mewPipeApp = angular.module('mewPipeApp', [
	'ngAnimate',
	'ngResource',
	'ngCookies',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ngFileUpload',
	'ServiceModule',
	"com.2fdevs.videogular",
	"com.2fdevs.videogular.plugins.controls",
	"com.2fdevs.videogular.plugins.overlayplay",
	"com.2fdevs.videogular.plugins.poster"
]);

mewPipeApp.run([
	'$rootScope',
	'$http',
	'$location',
	'$route',
	'$cookies',
	'$authService',
	'$callService',
	function ($rootScope, $http, $location, $route, $cookies, $authService, $callService) {

		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if ($rootScope.app.getToken()) {
				$rootScope.isConnect = true;
			} else {
				$rootScope.isConnect = false;
			}
		});

		$rootScope.$on('$routeChangeError', function (event, current, previous) {
			$location.path("/");
			$rootScope.app.showNotif('You don\'t allow.', 'error');
		});
				
		/**
		 * Scope Logout 
		 */
		$rootScope.logOut = function () {
			return $authService.logout();
		};
		
		/**
		 * Scope Login
		 */
		$rootScope.user = {};
		$rootScope.submitLogin = function () {
			var somedialog = document.getElementById('signIn');
			var dlg = new DialogFx(somedialog);
			dlg.toggle();
			dlg.toggle(dlg);
			$authService.login($rootScope.user);
			$rootScope.user = {};
		};
			 
		 /**
		  * Scope register
		  */
		  $rootScope.submitRegister = function() {	
			  $callService.request('POST', 'user_create', null, $rootScope.user, null, function (res) {
				  var somedialog = document.getElementById('signUp');
				  var dlg = new DialogFx(somedialog);
				  dlg.toggle();
				  dlg.toggle(dlg);
				  $route.reload();
			  });
			  $rootScope.user = {};
		};
	
		var flag = false;
		$rootScope.app = {
			
			/** 
			 * Return Api address
			 */
			getApi: function () {
				return config.getApiAddr();
			},
			
			/**
			 * Return Token from localstorage or cookie
			 */
			getToken: function () {
				if (localStorage.getItem("token")) {
					return localStorage.getItem("token");
				} else if ($cookies.token != null || $cookies.token != "undefined") {
					return $cookies.token;
				} else {
					return null;
				}
			},
			
			/**
			 * Show notification multi type
			 * @msg String message to show
			 * @Type String 'notice', 'warning', 'error' or 'success'
			 */
			showNotif: function (msg, type) {
				setTimeout(function () {
					if (flag) return;
					flag = true;
					// create the notification
					var notification = new NotificationFx({
						message: '<span class="icon icon-' + type + '"></span><p>' + msg + '.</p>',
						layout: 'attached',
						effect: 'bouncyflip',
						type: type, // notice, warning or error
						onClose: function () {
							flag = false;
						}
					});
					// show the notification
					notification.show();
				}, 800);
			}
		};

	}]);