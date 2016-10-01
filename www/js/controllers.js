/**
 * Created by silvanei on 19/09/16.
 */

angular

    .module('agenda.controllers', [])

    .controller('mainCtrl', ['$scope', '$state', 'favoritoService',
        function($scope, $state, favoritoService) {
            $scope.goto=function(toState, params){
              $state.go(toState, params); //remember to inject $state to your controller
            };

            $scope.favorito = function (item) {

                if(item.favorito) {
                    favoritoService.delete(item.id).success(function(data) {

                        item.favorito = false;

                    }).error(function(data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage
                        });
                    });
                }

                if(!item.favorito) {

                  favoritoService.post(item.id).success(function(data) {

                      item.favorito = true;

                  }).error(function(data) {
                      $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                      });
                  });
                }
            };
        }
    ])

    .controller('LoginCtrl', ['$scope', 'authenticationService', '$state', '$ionicPopup',
        function($scope, authenticationService, $state, $ionicPopup) {

            $scope.$on('$ionicView.enter', function(ev) {
                authenticationService.logout();
            });

            $scope.login = function(user) {
                authenticationService.login(user.email, user.password, function (result) {
                    if (result === true) {
                        $state.go('tab.favoritos');
                    } else {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: 'E-mail ou senha incoreto'
                        });
                    }
                });
            };
        }
    ])

    .controller('CadastroCtrl', ['$scope', 'registroCliente', 'estadoService', '$state', '$ionicPopup', '$ionicLoading', '$timeout',
        function($scope, registroCliente, estadoService, $state, $ionicPopup, $ionicLoading, $timeout) {
            $scope.user = {};

            estadoService.get().success(function(data) {
                $scope.estados = data;
            }).error(function(data) {
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: data.errorMessage
                });
            });

            $scope.changeEstado = function(estadoId) {
                estadoService.get(estadoId).success(function(data) {
                    $scope.cidades = data.cidades;
                }).error(function(data) {
                    Notification.error(data.errorMessage);
                });
            };

            $scope.cadastrar = function(usuario) {

                $ionicLoading.show({
                    template: 'Loading...'
                });

                registroCliente.post(usuario).success(function(data) {
                    $ionicLoading.hide();

                    var showPopup = $ionicPopup.show({
                        title: 'Cadastro criado com sucesso'
                    });
                    $timeout(function() {
                        showPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);

                    $state.go('login');


                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                    });
                });
            };

        }
    ])

    .controller('FavoritoCtrl', ['$scope', '$state', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'favoritoService', 'authenticationService',
        function($scope, $state, $ionicLoading, $ionicPopup, $ionicListDelegate, favoritoService, authenticationService) {
            $scope.$on('$ionicView.enter', function(ev) {

                if(! authenticationService.clienteId()) {
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
                        template: data.errorMessage
                      });
                    });
                }
            });

            $scope.favorito = function (item) {
                if(item.favorito) {
                    favoritoService.delete(item.id).success(function(data) {

                        item.favorito = false;

                    }).error(function(data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage
                        });
                    });
                }

                if(!item.favorito) {

                    favoritoService.post(item.id).success(function(data) {

                        item.favorito = true;

                    }).error(function(data) {
                        $ionicPopup.alert({
                            title: 'Alerta',
                            template: data.errorMessage
                        });
                    });
                }
            };
        }
    ])

    .controller('BuscaCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', '$state', 'salaoService', 'favoritoService',
        function($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, $state, salaoService, favoritoService) {
            $scope.items = [];
            $scope.$on('$ionicView.enter', function(ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                salaoService.get().success(function(data) {
                    $scope.items.data = data;
                    $ionicLoading.hide();

                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                    });
                });
            });

            $scope.getUsersByName = function(str) {

              salaoService.get(str).success(function(data) {
                $scope.items.data = data;
                $ionicLoading.hide();

              }).error(function(data, status) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                  title: 'Alerta',
                  template: data.errorMessage
                });
              });
            };
        }
    ])

    .controller('ReservasCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'clienteService',
        function($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, clienteService) {
            //$scope.$on('$ionicView.enter', function(ev) {
            //    $ionicLoading.show({
            //        template: 'Loading...'
            //    });
            //
            //    clienteService.get().success(function(data) {
            //        $scope.items = data.favoritos;
            //        $ionicLoading.hide();
            //
            //    }).error(function(data, status) {
            //        $ionicLoading.hide();
            //        $ionicPopup.alert({
            //            title: 'Alerta',
            //            template: data.errorMessage
            //        });
            //    });
            //});

            $scope.teste = function (data) {
                console.log(data);
            };
        }
    ])

    .controller('ServicoCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$stateParams', 'salaoService',
        function($scope, $ionicLoading, $ionicPopup, $stateParams, salaoService) {
            $scope.item = {};

            $scope.$on('$ionicView.enter', function(ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                salaoService.getById($stateParams.salaoId).success(function(data) {
                    $scope.item = data;
                    $ionicLoading.hide();

                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                      title: 'Alerta',
                      template: data.errorMessage
                    });
                });
            });


        }
    ])
;
