/***
** ROUTE
***/

mewPipeApp.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.

    when('/',{
      templateUrl: 'views/index.html',
      controller: 'MainCtrl',
      restrict: 0
    })

    .when('/auth/success/:param',{
      templateUrl: 'views/auth/success.html',
      controller: 'AuthCtrl',
      restrict: 0
    })

    .when('/video/upload',{
      templateUrl: 'views/video/upload.html',
      controller: 'VideoUploadCtrl',
      restrict: 1
    })

    .when('/video/download/:param', {
      templateUrl: 'views/video/download.html', 
      controller: 'VideoDownloadCtrl',
      restrict: 0
    })

    .when('/video/show/:param',{
      templateUrl: 'views/video/show.html',
      controller: 'VideoShowCtrl',
      restrict: 1
    })

    .when('/video/update/:param',{
      templateUrl: 'views/video/update.html',
      controller: 'VideoUpdateCtrl',
      restrict: 1
    })

    .when('/video/user',{
      templateUrl: 'views/video/user.html',
      controller: 'VideoUserCtrl',
      restrict: 1
    })
    
    .when('/video/users/:param',{
      templateUrl: 'views/video/users.html',
      controller: 'VideoUsersCtrl',
      restrict: 1
    })
    
    .when('/user/update',{
      templateUrl: 'views/user/update.html',
      controller: 'UserUpdateCtrl',
      restrict: 1
    })
    
    .when('/user/profile',{
      templateUrl: 'views/user/profile.html',
      controller: 'UserProfileCtrl',
      restrict: 1
    })



    .otherwise({
      redirectTo:'/'
    });

  }]);
