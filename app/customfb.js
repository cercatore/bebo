window.fbAsyncInit = function() {
    FB.init({
      appId: '276027512942214',
      status:true,
      version : 'v6.0'
    });

  };

  const messaging = firebase.messaging();
  let vapid = "AAAA4bZyLNw:APA91bGU0tzUF1atO-V13i0KIN4EfuLYXEYa233xtmfg_n-JjZXy100XLheaUsQOVs_D2lga8Ta_A1QI0znipzwtf94tJtJJ_Ar1mkbYQGArmrFUUwtDdaqREICilU0AtAvKeMGBgAe6";
  messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
      console.log('Token refreshed.');
    });
  });
  // .onMessage ( message => console.log(message))
  
  async function doAllThe() {
    await messaging.requestPermission();
    let regid = await navigator.serviceWorker
      .register('my-sw.js')
    let options = {};
    options.vapidKey = vapid;
    options.serviceWorkerRegistration = regid;
    messaging.getToken( {options});
}
try {
  setTimeout(doAllThe, 1330);

}catch(allerror) {console.log("logga",allerror.stacktrace)}

  //  FB.getLoginStatus(function(response) {
    // statusChangeCallback(response);
  //  });
   function statusChangeCallback(res){
     
     if (res.authResponse){
       console.log(res.authResponse);
       FB.api(`me?fields=name,email,picture`, function(response) {
         let scope = $rootScope;
         let user = response;
         user.displayName = user.name;
           user.profilePic = user.picture.data.url;
     
         scope.user = angular.copy(user);
         scope.userLoggedIn = user.email || user.displayName || 'anonym';
        $location.path('/dash')
       // console.log('Successful login for: ' + response.name);
         // $rootScope.user.photoUrl = 
       
         });
     }
  }