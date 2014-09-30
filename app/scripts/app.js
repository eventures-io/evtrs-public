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
            templateUrl: '/intro.part.html',
            controller: 'IntroController'
        })
        .state('base', {
            abstract: true,
            url: "/",
            templateUrl: '/base.part.html'
        })
        .state('base.about', {
            url: "about",
            views: {
                'content-view@base': { templateUrl: '/about.part.html'
                }
            }
        })
        .state('base.contact', {
            url: "contact",
            views: {
                'content-view@base': { templateUrl: '/contact.part.html',
                    controller: 'ContactController'
                }
            }
        })
        .state('base.playground', {
            url: "playground",
            views: {
                'content-view@base': { templateUrl: '/playground.part.html'
                }
            }
        })
});

eventApp.controller ("ContactController", function ($scope) {
    $scope.slant="slant-expanded";

    $scope.toggleMap = function() {
        $scope.slant = $scope.slant==="slant-expanded" ? "slant-retracted": "slant-expanded";
    }
});


eventApp.controller ("IntroController", function ($scope, $timeout) {
    $scope.hidden = true;
    $scope.$on('$viewContentLoaded',
        function (event) {
            $timeout( function() { unsetHidden($scope) }, 500 );
        });

    var unsetHidden = function($scope) {
        $scope.hidden = false;
    }

    $scope.playAudio = function() {
        var audio =  document.getElementById("pron");
        audio.play();
    }
});


window.onscroll = scroll;

function scroll () {
   // alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
    // note: you can use window.innerWidth and window.innerHeight to access the width and height of the viewing area
}


google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('g-map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
}






