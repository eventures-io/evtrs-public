'use strict'
var eventApp = angular.module('eventApp', ['ui.router','ngAnimate']);

// set the configuration
eventApp.run(['$rootScope', '$state', '$stateParams', '$window', function ($rootScope, $state, $stateParams, $window) {

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
            console.log('tostate error: ' + toState.url);
        });

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
//            event.preventDefault();
            console.log('changing from ' + fromState.url + ' to ' +  toState.url  );
        });

//    $rootScope.$on('$stateChangeSuccess',
//        function (event, toState, toParams, fromState, fromParams) {
//            console.log('changed from ' + fromState.url + ' to ' +  toState.url  );
//
//        });
//
//    $rootScope.$on('$stateNotFound',
//        function(event, unfoundState, fromState, fromParams){
//            console.log('state not found');
//            console.log(unfoundState.to); // "lazy.state"
//            console.log(unfoundState.toParams); // {a:1, b:2}
//            console.log(unfoundState.options); // {inherit:false} + default options
//        })
}]);


eventApp.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('intro', {
            url: '/',
            templateUrl: 'views/partials/intro.part.html'
        })
        .state('base', {
            abstract: true,
            url: "/",
            templateUrl: '/base.part.html'
        })
        .state('base.services', {
            url: "services",
            views: {
                'content-view@base': { templateUrl: 'views/partials/services.part.html',
                    controller: 'ServicesController'
                }
            }
        })
        .state('base.about', {
            url: "about",
            views: {
                'content-view@base': { templateUrl: 'views/partials/about.part.html'
                }
            }
        })

})
;


eventApp.controller ("ServicesController", function ($scope) {
    $scope.$on('$viewContentLoaded',
        function (event) {
            //alert (" in controller ");

        });
})



