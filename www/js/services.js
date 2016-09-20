/**
 * Created by silvanei on 19/09/16.
 */


angular
    .module('agenda.services', [])

    .factory('authenticationService', ['$http', '$localStorage', 'config',
        function($http, $localStorage, config) {

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

            return {
                login: login,
                logout: logout,
                getToken: getToken
            }

        }
    ])
;