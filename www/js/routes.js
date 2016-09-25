/**
 * Created by silvanei on 24/09/16.
 */

angular
    .module('agenda.routes', [])

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
                    'tab-busca': {
                        templateUrl: 'templates/tab-busca.html',
                        controller: 'BuscaCtrl'
                    }
                }
            })
            .state('tab.reservas', {
                url: '/reservas',
                views: {
                    'tab-reservas': {
                        templateUrl: 'templates/tab-reservas.html',
                        controller: 'ReservasCtrl'
                    }
                }
            })
        ;

        $urlRouterProvider.otherwise('/tab/favoritos');
    })
;
