window.fbAsyncInit = function() {
    FB.init({
      appId: '276027512942214',
      status:true,
      xfbml:true,
      version : 'v3.0'
    });

  };

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