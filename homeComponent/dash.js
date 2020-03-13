angular.module("dash", ['ngNativeTransitions'])
  .controller('appCtrl', ['$scope', '$nativeTransitions' ,'$log', '$location', function ($scope, $nativeTransitions, $log, $location){



    self = (this);

    self.forward = () => { $location.path("burp")};
    $scope.$watch( "scelta", ( valore, oldval) => {$log.debug(valore)} )


    //  mondo nuovo
     














      var options = {
        direction: 'left',
        duration: 300,
        iosdelay: 100,
        androiddelay: 1000,
        fixedPixelsTop: 45,
        href: '#home'
      };
      $('.popovers-1').popover({show: true, html: true});
      $('.popovers-2').on('click', (evt) => {
        self.running();
      })
      var callback = function (successMsg){ console.log('success -> ' + successMsg) };
      var error = function (error){ console.log(error) };


















      $scope.koko = () => {
          $log.debug("this was changed for maasturbate");
          $location.path("azione");
          // $nativeTransitions.slide(options, callback, error);

        };








    }])
