var app = angular.module('PinBoard', ['ui.router', 'restangular']);

app.factory('_', ['$window', function($window) {
  return $window._;
}]);

app.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
function($stateProvider, $urlRouterProvider, RestangularProvider){

  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

  $urlRouterProvider.otherwise('/pins');

  $stateProvider
    .state('pins', {
      url: '/pins',
      views: {
        'nav': {
          templateUrl: '/templates/nav.html',
          // Knows username. Has link to logout.
          controller: 'PinNavCtrl'
        },
        'index': {
          templateUrl: '/templates/index.html',
          controller: 'PinIndexCtrl'
        }
      }
    })
    .state('pins.show', {
      // Clicking on a pin will give ui-sref({id: pin.id})
      // Will replace index view.
      url: '/:id',
      views: {
        '': {
          templateUrl: '/templates/show.html',
          controller: 'PinShowCtrl'
        }
      }
    });
    // .state('Posts.show',  {
    //   url: '/:id',
    //   views: {
    //     '@': {
    //       templateUrl: '/templates/posts/show.html',
    //       controller: 'PostsShowCtrl'
    //     }
    //   },
    //   onEnter: function() {
    //     console.log('this is firing (SHOW)');
    //   }
    // });
}]);


app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
