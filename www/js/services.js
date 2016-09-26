/**
 * Created by silvanei on 19/09/16.
 */


angular
    .module('agenda.services', [])

    .factory('authenticationService', ['$http', '$localStorage', 'config', 'jwtHelperService', '$state', '$rootScope',
        function($http, $localStorage, config, jwtHelperService, $state, $rootScope) {

            function login(email, password, callback) {
                $http.post(config.baseUrl + '/v1/token', { email: email, password: password })
                    .success(function (response) {
                        // login successful if there's a token in the response
                        if (response.token) {
                            // store username and token in local storage to keep user logged in between page refreshes
                            $localStorage.currentUser = { email: email, token: response.token };
                            // execute callback with true to indicate successful login
                            callback(true);
                        } else {
                            // execute callback with false to indicate failed login
                            callback(false);
                        }
                    })
                    .error(function(data) {
                        callback(false);
                    });
            }

            function logout() {
                // remove user from local storage and clear http auth header
                delete $localStorage.currentUser;
            }

            function getToken() {
                if ($localStorage.currentUser) {
                    return $localStorage.currentUser.token;
                }
                return null;
            }

            function identity() {

                var token = getToken();
                if(token) {
                    var decodeToken = jwtHelperService.decodeToken(token);
                    return decodeToken.cli;
                }

                return null;

            }

            function checkAuthOnRefresh() {
                $rootScope.$on('$locationChangeStart', function (event, next, current) {

                    if (next.substr(next.length - 8) == 'cadastro') {
                        return;
                    }

                    var token = getToken();

                    if (!token || jwtHelperService.isTokenExpired(token)) {
                        $rootScope.$evalAsync(function () {
                            $state.go('login');
                        });

                    }
                });
            }

            return {
                login: login,
                logout: logout,
                getToken: getToken,
                clienteId: identity,
                checkAuthOnRefresh: checkAuthOnRefresh
            }

        }
    ])

    .factory('jwtHelperService', ['$window',
        function($window){
            var urlBase64Decode = function(str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: { break; }
                    case 2: { output += '=='; break; }
                    case 3: { output += '='; break; }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return $window.decodeURIComponent(escape($window.atob(output))); //polyfill https://github.com/davidchambers/Base64.js
            };

            var decodeToken = function(token) {

                if(!token) {
                    return null;
                }

                var parts = token.split('.');

                if (parts.length !== 3) {
                    throw new Error('JWT must have 3 parts');
                }

                var decoded = urlBase64Decode(parts[1]);
                if (!decoded) {
                    throw new Error('Cannot decode the token');
                }

                return angular.fromJson(decoded);
            };

            var getTokenExpirationDate = function(token) {
                var decoded = decodeToken(token);

                if(typeof decoded.exp === "undefined") {
                    return null;
                }

                var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
                d.setUTCSeconds(decoded.exp);

                return d;
            };

            var isTokenExpired = function(token, offsetSeconds) {
                var d = getTokenExpirationDate(token);
                offsetSeconds = offsetSeconds || 0;
                if (d === null) {
                    return false;
                }

                // Token expired?
                return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
            };


            return {
                decodeToken: decodeToken,
                getTokenExpirationDate: getTokenExpirationDate,
                isTokenExpired: isTokenExpired
            }
        }
    ])

    .factory('registroCliente', ['$http', 'config',
        function($http, config){

            function criar(usuario) {
                usuario = angular.copy(usuario);
                return $http.post(config.baseUrl + '/v1/registrar-cliente', usuario);
            }
            return {
                post: criar
            }

        }
    ])

    .factory('clienteService', ['$http', 'config', 'authenticationService',
        function($http, config, authenticationService){

            function baseUrl() {
                return config.baseUrl + '/v1/cliente/' + authenticationService.clienteId();
            }

            function get() {
                return $http.get(baseUrl());
            }
            return {
                get: get
            }

        }
    ])

    .factory('favoritoService', ['$http', 'config', 'authenticationService',
        function($http, config, authenticationService){

            function baseUrl() {
                return config.baseUrl + '/v1/cliente/' + authenticationService.clienteId() + '/favorito';
            }

            function get() {
                return $http.get(baseUrl());
            }

            function post(salaoId) {
                return $http.post(baseUrl() + "/salao/" + salaoId)
            }

            function remove(salaoId) {
                return $http.delete(baseUrl() + "/salao/" + salaoId)
            }

            return {
                get: get,
                post: post,
                delete: remove
            }

        }
    ])

    .factory('salaoService', ['$http', 'config', 'authenticationService',
        function($http, config, authenticationService){

            function baseUrl() {
                return config.baseUrl + '/v1/cliente/' + authenticationService.clienteId() + '/salao';
            }

            function get(str) {
              console.log(str);
                if(str) {
                  return $http.get(baseUrl(), {params: {salao: str}});
                }
                return $http.get(baseUrl());
            }
            return {
                get: get
            }

        }
    ])

;