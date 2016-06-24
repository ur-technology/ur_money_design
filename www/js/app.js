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

            // ---------  Scan Code screen
            .state('scanCode', {
                url: "/scanCode",
                templateUrl: "templates/scan-code.html",
                controller: 'scanCodeCtrl'
            })

            // ---------  My Address screen
            .state('myAddress', {
                url: "/myAddress",
                templateUrl: "templates/my-address.html",
                controller: 'scanCodeCtrl'
            })

            // ---------  UnLock screen
            .state('unlock', {
                url: "/unlock",
                templateUrl: "templates/unlock.html",
                controller: 'unlockCtrl'
            })

            // ---------  Registration screen
            .state('registration', {
                url: "/registration",
                templateUrl: "templates/registration.html",
                controller: 'registrationCtrl'
            })

            // ---------  Phone Number verification screen
            .state('verification', {
                url: "/verification",
                templateUrl: "templates/phone-number-verification.html",
                controller: 'verificationCtrl'
            })

            //  conversations screens
            .state('conversation', {
                url: "/conversation",
                abstract: true,
                templateUrl: "templates/conversations.html",
                controller: 'conversationCtrl'
            })
            .state('conversation.contacts', {
                url: "/contacts",
                views : {
                    'tab-contacts': {
                        templateUrl: "templates/conversation-contacts.html",
                        controller: 'conversationCtrl'
                    }
                }
            })
            .state('conversation.chats', {
                url: "/chats",
                views : {
                    'tab-chats': {
                        templateUrl: "templates/conversation-chats.html",
                        controller: 'conversationCtrl'
                    }
                }
            })
            .state('conversation.chat', {
                url: '/chats/:aId',
                views: {
                    'tab-chats' : {
                        templateUrl: 'templates/conversation-single-chat.html',
                        controller: 'conversationCtrl'
                    }
                }
            })

            // splash slide screen
            .state('splash', {
                url: '/splash',
                templateUrl: 'templates/splash-slide.html',
                controller: 'splashCtrl'
            })

        $urlRouterProvider.otherwise("/dash");

    });

