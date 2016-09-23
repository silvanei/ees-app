// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular
    .module('agenda', [
        'ionic',
        'ngMessages',
        'ngStorage',
        'ngMask',
        'angular-jwt',
        'agenda.controllers',
        'agenda.services'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    // Rotas
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('cadastro', {
                url: '/cadastro',
                templateUrl: 'templates/cadastro.html',
                controller: 'CadastroCtrl'
            })
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.favoritos', {
                url: '/favoritos',
                views: {
                    'tab-favoritos': {
                        templateUrl: 'templates/tab-favorito.html',
                        controller: 'FavoritoCtrl'
                    }
                }
            })
            .state('tab.busca', {
                url: '/busca',
                views: {
                    'tab-favoritos': {
                        templateUrl: 'templates/tab-busca.html',
                        controller: 'BuscaCtrl'
                    }
                }
            })
            .state('tab.reservas', {
                url: '/reservas',
                views: {
                    'tab-favoritos': {
                        templateUrl: 'templates/tab-reservas.html',
                        controller: 'ReservasCtrl'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/login');
    })

    // ionic
    .config(['$ionicConfigProvider', function($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom'); // other values: top
    }])

    // JWT
    .config(['$httpProvider','jwtInterceptorProvider', 'jwtOptionsProvider',
        function($httpProvider, jwtInterceptorProvider, jwtOptionsProvider){

            jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http, authenticationService, $localStorage, config) {
                var jwt = authenticationService.getToken();
                console.log(jwt);
                if(jwt){
                    if(jwtHelper.isTokenExpired(jwt)){
                        return $http({
                            url : config.baseUrl + '/v1/token',
                            skipAuthorization : true,
                            method: 'GET',
                            headers : { Authorization : 'Bearer '+ jwt}
                        }).then(function(response){
                            $localStorage.currentUser.token = response.data.token;
                            return response.data.token;
                        },function(response){
                            authenticationService.logout();
                        });
                    }else{
                        return jwt;
                    }
                }
            };

            jwtOptionsProvider.config({
                whiteListedDomains: ['localhost', '192.168.0.13']
            });

            $httpProvider.interceptors.push('jwtInterceptor');
        }
    ])

    .value('config', {
        baseUrl: 'http://192.168.0.13:9090/agenda/rest'
    })
;
