/**
 * Created by silvanei on 19/09/16.
 */

angular

    .module('agenda.controllers', [])

    .controller('mainCtrl', ['$scope', '$state', 'favoritoService',
        function ($scope, $state, favoritoService) {
            $scope.goto = function (toState, params) {
                $state.go(toState, params); //remember to inject $state to your controller
            };

            $scope.favorito = function (item) {

                if (item.favorito) {
                    favoritoService.delete(item.id).success(function (data) {

                        item.favorito = false;

                    }).error(function (data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage,
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    });
                }

                if (!item.favorito) {

                    favoritoService.post(item.id).success(function (data) {

                        item.favorito = true;

                    }).error(function (data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage,
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    });
                }
            };
        }
    ])

    .controller('LoginCtrl', ['$scope', 'authenticationService', '$state', '$ionicPopup',
        function ($scope, authenticationService, $state, $ionicPopup) {

            $scope.$on('$ionicView.enter', function (ev) {
                authenticationService.logout();
            });

            $scope.login = function (user) {
                authenticationService.login(user.email, user.password, function (result) {
                    if (result === true) {
                        $state.go('tab.favoritos');
                    } else {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: 'E-mail ou senha incoreto',
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    }
                });
            };
        }
    ])

    .controller('CadastroCtrl', ['$scope', 'registroCliente', 'estadoService', '$state', '$ionicPopup', '$ionicLoading', '$timeout',
        function ($scope, registroCliente, estadoService, $state, $ionicPopup, $ionicLoading, $timeout) {
            $scope.user = {};

            estadoService.get().success(function (data) {
                $scope.estados = data;
            }).error(function (data) {
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: data.errorMessage,
                    buttons: [
                        {
                            type: 'button-royal',
                            text: '<b>OK</b>'
                        }
                    ]
                });
            });

            $scope.changeEstado = function (estadoId) {
                estadoService.get(estadoId).success(function (data) {
                    $scope.cidades = data.cidades;
                }).error(function (data) {
                    Notification.error(data.errorMessage);
                });
            };

            $scope.cadastrar = function (usuario) {

                $ionicLoading.show({
                    template: 'Loading...'
                });

                registroCliente.post(usuario).success(function (data) {
                    $ionicLoading.hide();

                    var showPopup = $ionicPopup.show({
                        title: 'Cadastro criado com sucesso'
                    });
                    $timeout(function () {
                        showPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);

                    $state.go('login');


                }).error(function (data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage,
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });
                });
            };

        }
    ])

    .controller('FavoritoCtrl', ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'favoritoService', 'authenticationService',
        function ($scope, $state, $ionicLoading, $ionicPopup, $ionicListDelegate, favoritoService, authenticationService) {
            $scope.$on('$ionicView.enter', function (ev) {

                if (!authenticationService.clienteId()) {
                    $state.go('login');
                } else {

                    $ionicLoading.show({
                        template: 'Loading...'
                    });

                    favoritoService.get().success(function (data) {
                        $scope.items = data;
                        $ionicLoading.hide();

                    }).error(function (data, status) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage,
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    });
                }
            });

            $scope.favorito = function (item) {
                if (item.favorito) {
                    favoritoService.delete(item.id).success(function (data) {

                        item.favorito = false;

                    }).error(function (data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage,
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    });
                }

                if (!item.favorito) {

                    favoritoService.post(item.id).success(function (data) {

                        item.favorito = true;

                    }).error(function (data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage,
                            buttons: [
                                {
                                    type: 'button-royal',
                                    text: '<b>OK</b>'
                                }
                            ]
                        });
                    });
                }
            };
        }
    ])

    .controller('BuscaCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', '$state', 'clienteService', 'favoritoService',
        function ($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, $state, clienteService) {
            $scope.items = [];
            $scope.$on('$ionicView.enter', function (ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                clienteService.getSalao().success(function (data) {
                    $scope.items.data = data;
                    $ionicLoading.hide();

                }).error(function (data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage,
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });
                });
            });

            $scope.getUsersByName = function (str) {

                clienteService.getSalao(str).success(function (data) {
                    $scope.items.data = data;
                    $ionicLoading.hide();

                }).error(function (data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage,
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });
                });
            };
        }
    ])

    .controller('ReservasCtrl', ['$scope', '$ionicLoading', '$ionicPopup', 'clienteService',
        function ($scope, $ionicLoading, $ionicPopup, clienteService) {

            var listReservas = function() {
                clienteService.reservas().success(function (data) {

                    data.items.forEach(function(item) {
                        item.data = moment(item.data).format('LLLL');
                    });

                    $scope.reservas = data;
                });
            };

            $scope.$on('$ionicView.enter', function (ev) {

                clienteService.reservas().success(function (data) {
                    listReservas();
                });

            });

            $scope.cancelar = function(reserva) {
                clienteService.cancelarReserva(reserva).success(function(data) {
                    listReservas();
                    $ionicPopup.alert({
                        title: 'Sucesso',
                        template: 'Horário cancelado com sucesso.',
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });
                });
            };
        }
    ])

    .controller('ServicoCtrl', ['$scope', '$ionicLoading', '$stateParams', 'salaoService',
        function ($scope, $ionicLoading, $stateParams, salaoService) {
            $scope.salao = {};
            $scope.servicos = [];

            $scope.$on('$ionicView.enter', function (ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                salaoService.getById($stateParams.salaoId).success(function (data) {
                    $scope.salao = data;
                    $ionicLoading.hide();

                });

                salaoService.servico($stateParams.salaoId).success(function (data) {
                    $scope.servicos = data.items;

                });
            });


        }
    ])

    .controller('ProfissionalCtrl', ['$scope', '$ionicLoading', '$stateParams', 'salaoService',
        function ($scope, $ionicLoading, $stateParams, salaoService) {
            $scope.item = {};
            $scope.profissionais = [];
            $scope.servico = {};


            $scope.$on('$ionicView.enter', function (ev) {

                $ionicLoading.show({
                    template: 'Loading...'
                });

                salaoService.getById($stateParams.salaoId).success(function (data) {
                    $scope.item = data;
                    $ionicLoading.hide();

                });

                salaoService.servicoById($stateParams.salaoId, $stateParams.servicoId).success(function (data) {
                    $scope.servico = data;
                });

                salaoService.funcionario($stateParams.salaoId, $stateParams.servicoId).success(function (data) {
                    $scope.profissionais = data;

                });
            });


        }
    ])

    .controller('AgendaCtrl', ['$scope', '$ionicLoading', '$stateParams', '$ionicSlideBoxDelegate', 'salaoService',
        function ($scope, $ionicLoading, $stateParams, $ionicSlideBoxDelegate, salaoService) {
            $scope.servico = {};
            $scope.profissional = {
                id: "",
                apelido: ""
            };

            $ionicLoading.show({
                template: 'Loading...'
            });

            $scope.next = function() {
                $ionicSlideBoxDelegate.next();
            };

            $scope.previous = function() {
                $ionicSlideBoxDelegate.previous();
            };

            $scope.$on('$ionicView.enter', function (ev) {

                $scope.profissional.id = $stateParams.profissionalId;
                $scope.profissional.apelido = $stateParams.apelido;

                salaoService.getById($stateParams.salaoId).success(function (data) {
                    $scope.item = data;
                    $ionicLoading.hide();

                });

                salaoService.servicoById($stateParams.salaoId, $stateParams.servicoId).success(function (data) {
                    $scope.servico = data;
                });

                salaoService.horarioDisponivel($stateParams.salaoId, $stateParams.servicoId, $stateParams.profissionalId).success(function (data) {
                    $scope.horarios = data;

                });

                salaoService.horarioDisponivel($stateParams.salaoId, $stateParams.servicoId, $stateParams.profissionalId).success(function (data) {
                    $scope.horarios = data;
                    $ionicSlideBoxDelegate.update();
                });

            });

        }
    ])

    .controller('ConfirmacaoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', 'authenticationService', 'salaoService',
        function ($scope, $stateParams, $ionicPopup, $state, authenticationService, salaoService) {

            $scope.dados = {
                clienteId: authenticationService.clienteId(),
                salaoId: $stateParams.salaoId,
                funcionarioId: $stateParams.profissionalId,
                servicoId: $stateParams.servicoId,
                data: moment(parseInt($stateParams.dia))
                    .hours(moment(parseInt($stateParams.hora)).format('HH'))
                    .minute(moment(parseInt($stateParams.hora)).format('mm'))
                    .seconds(0)
                    .format('x'),
                salao: $stateParams.salao,
                servico: $stateParams.servico,
                profissional: $stateParams.profissional,
                dataFormatada: moment(parseInt($stateParams.dia))
                    .hours(moment(parseInt($stateParams.hora)).format('HH'))
                    .minute(moment(parseInt($stateParams.hora)).format('mm'))
                    .seconds(0)
                    .format('LLLL')

            };

            $scope.confirmar = function(confirmar) {

                salaoService.agendar(confirmar.salaoId, confirmar).success(function(data) {

                    var alertPopup = $ionicPopup.alert({
                        title: 'Sucesso',
                        template: 'Horário agendado com sucesso.',
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });

                    alertPopup.then(function(res) {
                        $state.go('tab.favoritos');
                    });

                }).error(function(data, status) {
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage,
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });
                });

            };

        }
    ])

    .controller('MeusDadosCtrl', ['$scope', '$state', '$ionicPopup', 'clienteService', 'estadoService',
        function ($scope, $state, $ionicPopup, clienteService, estadoService) {

            $scope.$on('$ionicView.enter', function (ev) {
                $scope.user = {};

                estadoService.get().success(function (data) {
                    $scope.estados = data;
                });

                $scope.changeEstado = function (estadoId) {
                    estadoService.get(estadoId).success(function (data) {
                        $scope.cidades = data.cidades;
                    });
                };

                clienteService.get().success(function(data) {
                    $scope.user = data;

                    if(typeof data.endereco.estado !== 'undefined') {
                        estadoService.get(data.endereco.estado.id).success(function(data) {
                            $scope.cidades = data.cidades;
                        })
                    } else {
                        $scope.cidades = [];
                    }
                });
            });

            $scope.atualizar = function(data) {
                clienteService.update(data).success(function(data) {
                    $ionicPopup.alert({
                        title: 'Sucesso',
                        template: 'Dados atualizados com sucesso.',
                        buttons: [
                            {
                                type: 'button-royal',
                                text: '<b>OK</b>'
                            }
                        ]
                    });

                    $scope.user = data;

                    if(typeof data.endereco.estado !== 'undefined') {
                        estadoService.get(data.endereco.estado.id).success(function(data) {
                            $scope.cidades = data.cidades;
                        })
                    } else {
                        $scope.cidades = [];
                    }
                });
            };

            $scope.logout = function() {
                $state.go('login');
            }
        }
    ])
;
