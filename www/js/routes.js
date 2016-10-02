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
                cache: false,
                views: {
                    'tab-busca': {
                        templateUrl: 'templates/tab-busca.html',
                        controller: 'BuscaCtrl'
                    }
                }
            })
            .state('tab.servico', {
                url: '/salao/:salaoId/servico',
                views: {
                    'tab-busca': {
                        templateUrl: 'templates/tab-servico.html',
                        controller: 'ServicoCtrl'
                    }
                }
            })
            .state('tab.profissional', {
                url: '/salao/:salaoId/servico/:servicoId/profissional',
                views: {
                    'tab-busca': {
                        templateUrl: 'templates/tab-profissional.html',
                        controller: 'ProfissionalCtrl'
                    }
                }
            })
            .state('tab.confirmacao', {
                url: '/salao/:salaoId/servico/:servicoId/profissional/:profissionalId/dia/:dia/hora/:hora/salao/:salao/servico/:servico/profissional/:profissional',
                views: {
                    'tab-busca': {
                        templateUrl: 'templates/tab-confirmacao.html',
                        controller: 'ConfirmacaoCtrl'
                    }
                }
            })
            .state('tab.agenda', {
                url: '/salao/:salaoId/servico/:servicoId/profissional/:profissionalId/apelido/:apelido',
                views: {
                    'tab-busca': {
                        templateUrl: 'templates/tab-agenda.html',
                        controller: 'AgendaCtrl'
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
