'use strict'
var eventApp = angular.module('eventApp', ['ui.router', 'ngAnimate']);

eventApp.run(['$rootScope', '$state', '$stateParams', '$window', function ($rootScope, $state, $stateParams, $window) {

    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, error) {
            //  console.log('tostate: ' + toState.url);
            $('li').removeClass('selected');
        });

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // console.log('changed from ' + fromState.url + ' to ' +  toState.url  );
            if (typeof toState.url != 'undefined') {

                var url = toState.url.charAt(0).toUpperCase() + toState.url.slice(1);
                $('li:contains(' + url + ')').addClass('selected');
            }

        });

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
            url: '/',
            templateUrl: '/base.part.html'
        })
        .state('base.about', {
            url: 'about',
            views: {
                'content-view@base': { templateUrl: '/about.part.html',
                    controller: 'AboutController'
                }
            }
        })
        .state('base.contact', {
            url: 'contact',
            views: {
                'content-view@base': { templateUrl: '/contact.part.html',
                    controller: 'ContactController'
                }
            }
        })
});

eventApp.controller('BaseController', function ($scope) {
    $scope.$on('$viewContentLoaded',
        function (event) {
            $scope.overflow = 'of-visible';
        });
});

eventApp.controller('AboutController', function ($scope) {
    $scope.$on('$viewContentLoaded',
        function (event) {
            $('li:contains(About)').addClass('selected');
        });
});

eventApp.controller('ContactController', function ($scope) {
    $scope.slant = 'slant-expanded';
    $scope.contact = 'contact-bg-expanded';
    $scope.overflow= 'of-hidden';
    $scope.visible = '';
    $scope.address = 'Largo Rafael Bordalo Pinheiro 18 Portugal';

    $scope.toggleMap = function () {
        $scope.slant = $scope.slant === 'slant-expanded' ? 'slant-retracted' : 'slant-expanded';
        $scope.contact = $scope.contact === 'contact-bg-expanded' ? 'contact-bg-retracted' : 'contact-bg-expanded';
        $scope.visible = $scope.slant === 'slant-expanded' ? '' : 'close-btn-visible';
    }
});


eventApp.controller('IntroController', function ($scope, $timeout) {
    $scope.hidden = true;
    $scope.$on('$viewContentLoaded',
        function (event) {
            //delay slide in animation
            $timeout(function () {
                unsetHidden($scope)
            }, 500);
        });

    var unsetHidden = function ($scope) {
        $scope.hidden = false;
    }

    $scope.playAudio = function () {
        var audio = document.getElementById('pron');
        audio.play();
    }
});

eventApp.directive('googleMap', function () {
    return {
        restrict: 'E',
        template: "<div id='gmap'></div>",
        scope: {
            address: '=',
            zoom: '='
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
                    styles: [
                        {featureType: 'all', stylers: [
                            {saturation: -100},
                            {gamma: 0.50}
                        ]}
                    ]
                };
                map = new google.maps.Map
                    (document.getElementById('gmap'), mapOptions);

                markAdressToMap();
            };
            var markAdressToMap = function () {
                geocoder.geocode({ 'address': $scope.address },
                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        }
                    });
            };
            initialize();
        }
    };
});






