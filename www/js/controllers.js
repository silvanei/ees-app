/**
 * Created by silvanei on 19/09/16.
 */

angular

    .module('agenda.controllers', [])

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

            $scope.goto=function(toState, params){
                $state.go(toState, params); //remember to inject $state to your controller
            }

        }
    ])

    .controller('CadastroCtrl', ['$scope', 'registroCliente', '$state', '$ionicPopup', '$ionicLoading', '$timeout',
        function($scope, registroCliente, $state, $ionicPopup, $ionicLoading, $timeout) {
            $scope.user = {};

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

    .controller('FavoritoCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'clienteService',
        function($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, clienteService) {
            $scope.$on('$ionicView.enter', function(ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                clienteService.get().success(function(data) {
                    $scope.items = data.favoritos;
                    $ionicLoading.hide();

                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                    });
                });
            });

            $scope.teste = function (data) {
                console.log(data);
            };
        }
    ])

    .controller('BuscaCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'clienteService',
        function($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, clienteService) {
            $scope.$on('$ionicView.enter', function(ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                clienteService.get().success(function(data) {
                    $scope.items = data.favoritos;
                    $ionicLoading.hide();

                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                    });
                });
            });

            $scope.teste = function (data) {
                console.log(data);
            };
        }
    ])
    .controller('ReservasCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$ionicListDelegate', 'clienteService',
        function($scope, $ionicLoading, $ionicPopup, $ionicListDelegate, clienteService) {
            $scope.$on('$ionicView.enter', function(ev) {
                $ionicLoading.show({
                    template: 'Loading...'
                });

                clienteService.get().success(function(data) {
                    $scope.items = data.favoritos;
                    $ionicLoading.hide();

                }).error(function(data, status) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Alerta',
                        template: data.errorMessage
                    });
                });
            });

            $scope.teste = function (data) {
                console.log(data);
            };
        }
    ])
;
