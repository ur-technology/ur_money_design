

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
            console.log('asdf');
            $scope.showContactInput = true;
            a$scope.contactItem = '';
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