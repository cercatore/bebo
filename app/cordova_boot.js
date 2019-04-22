function checkLocale(name) {
  window.locale = "debug";
  navigator.globalization.getLocaleName(
    function (locale) {
      // alert('locale: ' + locale.value + '\n');
      // device id non e propagato
      window.localStorage.setItem("cl_locale", locale.value);
      window.localStorage.setItem("deviceId", name);
    },
    err => {}
  );
}

    angular.element(document).ready(function () {
        if (window.cordova) {
          console.log("Running in Cordova, will bootstrap AngularJS once 'deviceready' event fires.");
          document.addEventListener('deviceready', function () {
            console.log("Deviceready event has fired, bootstrapping AngularJS.");
            angular.bootstrap(document.body, ['myApp']);
            let device = window.device;
            let name = device.model + ":" + device.uuid;
            checkLocale(name);

          }, false);
        } else {
          console.log("Running in browser, bootstrapping AngularJS now.");
          window.locale = {};
          window.locale.debug = 1;angular.bootstrap(document.body, ['myApp']);

        }
      });
