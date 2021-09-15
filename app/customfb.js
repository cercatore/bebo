window.fbAsyncInit = function() {
    FB.init({
      appId: '276027512942214',
      cookie:true,
      status:true,
      version : 'v6.0'
    });

  };

  const messaging = null // firebase.messaging();
  // TO Enable messaginh 
  // <script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js"></script>
  
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
      // if(window.location.pathname != '/'){
          //register with API
          regid = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          //once registration is complete
           navigator.serviceWorker.ready.then(function(serviceWorkerRegistration){

          });
      // }
    }else{
      console.warn('Service workers aren\'t supported in this browser.');

    }

    let options = {};
    // options.vapidKey = vapid;
    options.serviceWorkerRegistration = regid;
    messaging.getToken( {options}).then( token =>{
        window.localStorage.setItem("messagingToken", token);

      })
      .catch( error => console.log("show error " + error))

}


  //  FB.getLoginStatus(function(response) {
    // statusChangeCallback(response);
  //  });
   function statusChangeCallback(res){

     if (res.status === "connected"){
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
