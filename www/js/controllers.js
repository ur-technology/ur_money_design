

angular.module('urApp.controllers', [])

    .controller('mainCtrl',function($scope,$ionicSideMenuDelegate,$ionicHistory){

        // variables
        $scope.showContacts = false;

        // toggle left main manu
        $scope.toggleLeft = function(){
            $ionicSideMenuDelegate.toggleLeft()
        };

        $scope.goBack = function(){
            $ionicHistory.goBack();
        };

        // Sample options for first chart
        $scope.chartOptions = {
            chart: {
                type: 'area',
                backgroundColor: null,
                // Edit chart spacing
                spacingBottom: 0,
                spacingTop: 10,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                enabled:false,
                text: ''
            },
            subtitle: {
                enabled:false,
                text: ''
            },
            xAxis: {
                //categories: ['0', '1000', '2000', '3000', '4000', '5000', '6000'],
                //tickmarkPlacement: 'on',
                title: {
                    enabled: false
                },
                visible:false
            },
            yAxis: {
                max: 1000,
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                    //formatter: function () {
                    //  return this.value / 1000;
                    //}
                },
                gridLineWidth: 0,
                minorGridLineWidth: 0
            },
            tooltip: {
                shared: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#3aade2',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#3aade2'
                    }
                }
            },
            series: [{
                name: 'Asia',
                data: [500, 600,800, 820, 1000, 950, 800],
                color: '#a5d3e9'
                //}, {
                //  name: 'Africa',
                //  data: [106, 107, 111, 133, 221, 767, 1766]
                //}, {
                //  name: 'Europe',
                //  data: [163, 203, 276, 408, 547, 729, 628]
                //}, {
                //  name: 'America',
                //  data: [18, 31, 54, 156, 339, 818, 1201]
                //}, {
                //  name: 'Oceania',
                //  data: [2, 2, 2, 6, 13, 30, 46]
            }],
            exporting: { enabled: false },
            legend: {enabled: false},
            credits: {
                enabled: false
            }
        };

    })

    .controller('sendReceiveCtrl',function($scope,$ionicPopover,$http){
        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        //$scope.popover = $ionicPopover.fromTemplate(template, {
        //    scope: $scope
        //});

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/send-receive-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openContactPopover = function($event) {
            $scope.popover.show($event);

        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });
        // -------------------------------- add contact
        $scope.showContactInput = true;
        $scope.addContact = function(email){
            $scope.showContactInput = false;
            $scope.contactItem = '<span class="contact-item"><img src="../img/avatar.jpg" alt=""> ' + email + ' <a class="contact-close" ng-click="removeContact()"></a></span>';
        };

        $scope.removeContact = function(){
            $scope.showContactInput = true;
            $scope.contactItem = '';
        };

        //    ----------------------------- filtering contacts

        $http.get('js/contacts.json').success(function(data){
            $scope.contacts = data;
        });

    //    ---------------------------------------
        $scope.urInput = '120.0';
        $scope.sendReceiveText = 'Lorem ipsum dolor sit amet, vix tation consul cu, vim ut lorem omnium mandamus. Cum illud adipiscing liberavisse at, possim fastidii ex usu';

    })

    // controller for transaction screens
    .controller('transactionCtrl', function ($scope,$http) {

        $scope.txtLimit = 70;
        $scope.showSeeMore = false;
        // -------------------- transaction chat
        $http.get('js/transactions.json').success(function(data){
            $scope.transactions = data;
        });

        $scope.transFilter = '';
    })

    // controller for invite friends screens
    .controller('inviteCtrl',function($scope,$ionicHistory){
        $scope.goBack = function(){
            $ionicHistory.goBack();
        };
    })

    // controller for scan code screens
    .controller('scanCodeCtrl',function($scope,$ionicHistory){
        $scope.goBack = function(){
            $ionicHistory.goBack();
        };
    })

    // controller for unlock screen
    .controller('unlockCtrl',function($scope, $location, $timeout){

        $scope.passcode = "";

        $scope.add = function(value) {
            if($scope.passcode.length < 4) {
                $scope.passcode = $scope.passcode + value;
                if($scope.passcode.length == 4) {
                    $timeout(function() {
                        console.log("The four digit code was entered");
                    }, 500);
                }
            }
        };

        $scope.delete = function() {
            if($scope.passcode.length > 0) {
                $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
            }
        }
    })

    // controller for registration screen
    .controller('registrationCtrl',function($scope,$ionicPopover,$http){

        // credentials for registration
        $scope.credentials = {
            'phoneCountryName':'United States',
            'phoneCountryCode':'+1',
            'phoneNumber':'(615)856-6616'
        };

        // selection of country
        $scope.countrySelect = function(item){
            $scope.credentials.phoneCountryName = item.name;
            $scope.credentials.phoneCountryCode = item.code;
            $scope.popover.hide();
        };


        // phone number entry
        $scope.add = function(value) {
            $scope.credentials.phoneNumber += value;
        };

        $scope.delete = function() {
            if($scope.credentials.phoneNumber.length > 0) {
                $scope.credentials.phoneNumber = $scope.credentials.phoneNumber.substring(0, $scope.credentials.phoneNumber.length - 1);
            }
        }

        $http.get('js/countries.json').success(function(data){
            $scope.countries = data;
        });


        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        //$scope.popover = $ionicPopover.fromTemplate(template, {
        //    scope: $scope
        //});

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/country-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openCountryPopover = function($event) {
            $scope.popover.show($event);

        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

    //    choose country top
        $scope.chooseCountryTop = false;

    })

    // controller for phone number verification screen
    .controller('verificationCtrl',function($scope,$location,$timeout){
        $scope.verifycode = "";

        $scope.add = function(value) {
            if($scope.verifycode.length < 6) {
                $scope.verifycode = $scope.verifycode + value;
                if($scope.verifycode.length == 6) {
                    $timeout(function() {
                        console.log("The six digit code was entered");
                    }, 500);
                }
            }
        };

        $scope.delete = function() {
            if($scope.verifycode.length > 0) {
                $scope.verifycode = $scope.verifycode.substring(0, $scope.verifycode.length - 1);
            }
        }
    })

    // controller for conversation screens
    .controller('conversationCtrl', function ($scope,$http,$state,$timeout,$ionicScrollDelegate,$ionicSideMenuDelegate) {

        // toggle left main manu
        $scope.toggleLeft = function(){
            $ionicSideMenuDelegate.toggleLeft()
        };

        // -------------------- conversation contacts
        $http.get('js/contacts.json').success(function(data){
            $scope.contacts = data;
        });

        // -------------------- conversation chats
        $http.get('js/chats.json').success(function(data){
            $scope.chats = data;

            $scope.chatID = $state.params.aId;
        });

        // -------------------- conversation chat messages
        $scope.hideTime = true;

        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        $scope.sendMessage = function() {
            alternate = !alternate;

            var d = new Date();
            d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

            $scope.messages.push({
                userID: alternate ? '1' : '2',
                text: $scope.data.message,
                time: d
            });

            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        };


        $scope.inputUp = function() {
            if (isIOS) $scope.data.keyboardHeight = 216;
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        };

        $scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        };

        $scope.closeKeyboard = function() {
            // cordova.plugins.Keyboard.close();
        };


        $scope.data = {};
        $scope.myID = '1';
        $scope.messages = [
            {"userID":"1","text":"Hi,I just sent 3000 UR in your account. Let me know if you need more.","time":"21-june-2016"},
            {"userID":"2","text":"Hey, Thanks for the 3000 UR you sent my way. I really appreciate that. Let's catch up on the weekend.","time":"22-june-2016"}
        ];

    })


    .controller('splashCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    })