// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('urApp', ['ionic','urApp.controllers','urApp.directives'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // dashboard -- send -- receive == screens
            .state('dashboard', {
                url: "/dash",
                templateUrl: "templates/dashboard.html",
                controller: 'mainCtrl'
            })
            .state('send', {
                url: "/send",
                templateUrl: "templates/send.html",
                controller: 'sendReceiveCtrl'
            })
            .state('receive', {
                url: "/receive",
                templateUrl: "templates/receive.html",
                controller: 'sendReceiveCtrl'
            })

            //  transaction screens
            .state('transaction', {
                url: "/transaction",
                abstract: true,
                templateUrl: "templates/transactions.html",
                controller: 'transactionCtrl'
            })
            .state('transaction.sent', {
                url: "/sent",
                views : {
                    'tab-sent': {
                        templateUrl: "templates/transaction-sent.html",
                        controller: 'transactionCtrl'
                    }
                }
            })
            .state('transaction.received', {
                url: "/received",
                views : {
                    'tab-received': {
                        templateUrl: "templates/transaction-received.html",
                        controller: 'transactionCtrl'
                    }
                }
            })
            .state('transaction.earned', {
                url: "/earned",
                views : {
                    'tab-earned': {
                        templateUrl: "templates/transaction-earned.html",
                        controller: 'transactionCtrl'
                    }
                }
            })

            // ---------  Refer Friend screen
            .state('invite', {
                url: "/invite",
                templateUrl: "templates/invite-friends.html",
                controller: 'inviteCtrl'
            })
        $urlRouterProvider.otherwise("/transaction/sent");

    });


