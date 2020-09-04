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
    let regid = 0;
    if('serviceWorker' in navigator){
      if(window.location.pathname != '/'){
          //register with API
          regid = await navigator.serviceWorker.register('/my-sw.js', { scope: './' });
          //once registration is complete
           navigator.serviceWorker.ready.then(function(serviceWorkerRegistration){
              //get subscription
              serviceWorkerRegistration.pushManager.getSubscription().then(function(subscription){
                console.log("sub: " + subscription);
                  //enable the user to alter the subscription
                  //jquery selector for enabling whatever you use to subscribe.removeAttr("disabled");
                  //set it to allready subscribed if it is so
                  if(subscription){
                      //code for showing the user that they're allready subscribed
                      
                  }
              });
          });
      }   
    }else{  
      console.warn('Service workers aren\'t supported in this browser.');  
    }

    let options = {};
    options.vapidKey = vapid;
    options.serviceWorkerRegistration = regid;
    messaging.getToken( {options});
}
function myreg(name){
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