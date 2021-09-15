

angular.module("dash", ['ngNativeTransitions'])
  .controller('appCtrl', ['$scope', "$rootScope","dialogService", "clSettings", '$nativeTransitions' ,'$log', '$location', "$timeout", function ($scope,$rootScope, dialogService, $settings, $nativeTransitions, $log, $location, $timeout){
    const log = $log.info;
    self=this;
    this.labels = { title:"HELLO !!"};
    
//                                  ---- vvvv qui ce errore
    let prefs = $settings.prefs( db, $rootScope.user.email, console.log);
    let dismiss_tutorial_yes = prefs.caricaAction("dismiss_tutorial_yes", $scope, (dismiss) => { if ('yes' !== dismiss)$timeout(self.tutorial, 2600);});
    this.tutorial = () => {
      dialogService.tutorialDialog(this.labels.title, null)
        .then(function(message){
          alert("called the dog " + message);
        })
        .catch( err => prefs.update("dismiss_tutorial_yes", "yes"));
      };


      $scope.$watch("$this.dismiss", function(nv,no){
        console.log(dismiss_tutorial_yes);
      })
    
    
    function later(dismiss_tutorial_yes_alias){
      console.log(dismiss_tutorial_yes_alias + "qui mai");
      

    }
    
    self = (this);

    self.forward = () => { $location.path("burp")};
    $scope.$watch( "scelta", ( valore, oldval) => {$log.debug(valore)} )


    //  mondo nuovo
    
    let user = $rootScope.userLoggedIn;
    $log.info(user);
    function saveSettings(){
      //  prefs.save("dummykey", user.email);
    }
    saveSettings();

    prefs.carica("dummykey");

    let items = prefs.loadTutto( $scope);

    console.log($scope.debugPref);







    this.doStuff = () => {
      firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
      .then(function() {
        console.log("ok sent to " + firebase.auth().currentUser.email );
      })
      .catch(function(error) {
      // Error occurred. Inspect error.code.
      console.log(error);
      });
    }    

      var options = {
        direction: 'left',
        duration: 300,
        iosdelay: 100,
        androiddelay: 1000,
        fixedPixelsTop: 45,
        href: '#home'
      };
        
      $('.popovers-1').on('click', (evt) => {
        alert("£click")
      })
      var callback = function (successMsg){ console.log('success -> ' + successMsg) };
      var error = function (error){ console.log(error) };
      function sendEmailVerification()  {

        user.sendEmailPasswordReminder(user).then(function() {  //WRONG
        console.log("// Email sent. " + user);
        }).catch(function(error) {
            console.log(error);
        });
    }
    $scope.testEmail = sendEmailVerification;

    $timeout(
      () => $rootScope.createPref($rootScope.user )
      , 1300
    )
      
      


    












      $scope.koko = () => {
          $location.path("azione");
          // $nativeTransitions.slide(options, callback, error);

        };
        var actionCodeSettings = {
          url: 'https://127.0.0.1/?email=' + "FIREBBASE,AUTH",
          iOS: {
            bundleId: 'com.example.ios'
          },
          android: {
            packageName: 'io.melanzatm.whatisdoggo',
            installApp: false,
            minimumVersion: '19'
          },
          handleCodeInApp: true,
          // When multiple custom dynamic link domains are defined, specify which
          // one to use.
          dynamicLinkDomain: "example.page.link"
          };
       
          

    }])
