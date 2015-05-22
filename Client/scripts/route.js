/***
** ROUTE
***/

mewPipeApp.config(['$routeProvider',
  function ($routeProvider) {
        
    /**
     * Resolve authentication before route load
     */
    var authenticated = ['$q', '$rootScope', '$authService', function ($q, $rootScope, $authService) {
      
      /**
       * Debug mode
       */
      if ($rootScope.app.getToken()) {
        $rootScope.isConnect = true;
        return true;
      } else {
        $rootScope.isConnect = false;
        return false;
      }

      var deferred = $q.defer();
      $authService.isLoggedIn(false)
        .then(function (isLoggedIn) {
        if (isLoggedIn) {
          console.log('authenticated resolve');
          $rootScope.isConnect = true;
          deferred.resolve();
        } else {
          console.log('authenticated reject');
          deferred.reject('Not logged in');
        }
      });
      return deferred.promise;
        }];


    $routeProvider

    /**
     * Public routes
     */
      .when('/', {
      templateUrl: 'views/index.html',
      controller: 'MainCtrl'
    })

      .when('/404', {
      templateUrl: '404.html'
    })

      .when('/auth/success/:param', {
      templateUrl: 'views/auth/success.html',
      controller: 'AuthCtrl'
    })

      .when('/video/show/:param', {
      templateUrl: 'views/video/show.html',
      controller: 'VideoShowCtrl'
    })
    
    /**
     * Authentificated routes
     */
      .when('/video/upload', {
      templateUrl: 'views/video/upload.html',
      controller: 'VideoUploadCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .when('/video/update/:param', {
      templateUrl: 'views/video/update.html',
      controller: 'VideoUpdateCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .when('/video/user', {
      templateUrl: 'views/video/user.html',
      controller: 'VideoUserCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .when('/video/users/:param', {
      templateUrl: 'views/video/users.html',
      controller: 'VideoUsersCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .when('/user/update', {
      templateUrl: 'views/user/update.html',
      controller: 'UserUpdateCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .when('/user/profile', {
      templateUrl: 'views/user/profile.html',
      controller: 'UserProfileCtrl',
      resolve: {
        authenticated: authenticated
      }
    })

      .otherwise({
      redirectTo: '/'
    });

  }]);
