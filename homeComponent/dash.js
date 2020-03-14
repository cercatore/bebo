

angular.module("dash", ['ngNativeTransitions'])
  .controller('appCtrl', ['$scope', "$rootScope", "clSettings", '$nativeTransitions' ,'$log', '$location', function ($scope,$rootScope, $settings,$nativeTransitions, $log, $location){



    self = (this);

    self.forward = () => { $location.path("burp")};
    $scope.$watch( "scelta", ( valore, oldval) => {$log.debug(valore)} )


    //  mondo nuovo
    
    let user = $rootScope.userLoggedIn ;
    $log.info(user);
    let prefs = $settings.prefs(db, "homegreen@gmail.com",console.log);
    function saveSettings(){
      //prefs.save("dummykey", user.email);
    }
    saveSettings();

    prefs.carica("dummykey");











      var options = {
        direction: 'left',
        duration: 300,
        iosdelay: 100,
        androiddelay: 1000,
        fixedPixelsTop: 45,
        href: '#home'
      };
     // $('.popovers-1').popover({show: true, html: true});
      $('.popovers-2').on('click', (evt) => {
        self.running();
      })
      var callback = function (successMsg){ console.log('success -> ' + successMsg) };
      var error = function (error){ console.log(error) };


















      $scope.koko = () => {
          $log("this was changed for maasturbate");
          $location.path("azione");
          // $nativeTransitions.slide(options, callback, error);

        };








    }])
