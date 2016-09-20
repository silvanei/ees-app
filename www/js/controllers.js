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
            }

        }
    ])
    .controller('FavoritoCtrl', ['$scope',
        function($scope) {
            $scope.$on('$ionicView.enter', function(ev) {
                console.log('FavoritoCtrl aqui');
            });

        }
    ])
;
