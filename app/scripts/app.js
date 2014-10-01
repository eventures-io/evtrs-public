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
    $scope.contact="contact-bg-expanded";
    $scope.wrap="contact-wrapper";
    $scope.Adress = "Largo Rafael Bordalo Pinheiro 18 Portugal";

    $scope.toggleMap = function() {
        $scope.slant = $scope.slant==="slant-expanded" ? "slant-retracted": "slant-expanded";
        $scope.contact = $scope.contact==="contact-bg-expanded" ? "contact-bg-retracted": "contact-bg-expanded";
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

eventApp.directive('googleMap', function () {
    return {
        restrict: "E",
        template: "<div id='gmap'></div>",
        scope: {
            address: "=",
            zoom: "="
        },
        controller: function ($scope) {
            var geocoder;
            var latlng;
            var map;
            var marker;
            var initialize = function () {
                geocoder = new google.maps.Geocoder();
                latlng = new google.maps.LatLng(38.711526, -9.141712);
                var mapOptions = {
                    zoom: $scope.zoom,
                    center: latlng,
                //    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
                };
                map = new google.maps.Map
                    (document.getElementById('gmap'), mapOptions);
            };
            var markAdressToMap = function () {
                geocoder.geocode({ 'address': $scope.address },
                    function (results, status)
                    {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        }
                    });
            };
            $scope.$watch("address", function () {
                if ($scope.address != undefined) {
                    markAdressToMap();
                }
            });
            initialize();
        }
    };
});






