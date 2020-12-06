angular.module("ciao.blabla", [])
  .controller("prefcontroller", function($scope, $rootScope, clSettings, $http, $log){
    let log = $log.info;
    
    //log(prefs.update("ciaokey","clavalue"));
    //prefs.caricaAction("ciaokey", "fjkjf" );
    var user = firebase.auth().currentUser;
    const prefs = clSettings.prefs(db, user.email, $log.info);
    
    let cached = {};
    cached.action = {};
    let fcm_token = window.localStorage.getItem("messagingToken");
    const myawesomeTopic = "myawesome";
                                              // ce differenza tra /info e /v1
    let iidsUrl = `https://iid.googleapis.com/iid/v1/${fcm_token}/rel/topics/${myawesomeTopic}`;

    let config = { headers:  {
      "Authorization": "key=AAAA4bZyLNw:APA91bGU0tzUF1atO-V13i0KIN4EfuLYXEYa233xtmfg_n-JjZXy100XLheaUsQOVs_D2lga8Ta_A1QI0znipzwtf94tJtJJ_Ar1mkbYQGArmrFUUwtDdaqREICilU0AtAvKeMGBgAe6",
      "Content-type" : "appkication/json"
    }
    };
    $scope.testCall = () => {
      if (!fcm_token) throw new Error("no token");
      $http.post( iidsUrl, {} , config)
        .then( result => console.log(result.data) )
        .catch( error => console.log( error))
    };

   
    $scope.leggiTutti = () => {

    }



    messaging.onMessage(function(payload){
      console.log( '##########fore####### received message foreeground ');
      const title = "madonna volante";
      // return self.registration.showNotification(title, payload.notification.body);
    });

    


    











    try {
      prefs.carica("ciaokey")
    }catch(er){log("cl error:" + er);}
    prefs.loadTutto( $scope);
    let key ="pGUJ4tHro132JVATpwV7UYRdkkgAKaTfADYAa9nOGI1kxO0CQJD4FAvYogC9WSNh";
    let url = "https://hilltopads.com/api/publisher/listStats?key=" + key;
    let urlAds = "https://hilltopads.com/api/publisher/inventory?key=" + key;
    let ugly = {
      "title" : "motivational JSON",
      "data" : {
          "emoti" : "v😆 o.O"
          }
       
    }
    $scope.testAds = async () => {
      $http.get(urlAds)
        .then((result=>$scope.preferenceJSON = JSON.pruned(result.data)))
        .success( (out, status, headers ) =>{
          $scope.debug = JSON.pruned(headers)
          $scope.preferenceJSON = out.data;

        })

        .catch(_);
    }

    $scope.testAction = async () => {
      // let result = await $http.get(url);
      // $scope.preferenceJSON = result.data;
      prefs.update("dismiss_dialog_yes" , "false");
    };








    this.resetPassword = () => {
        user.updateEmail("cbagnato77@gmail.com").then(function() {
            // Update successful.
            $log.info("success")
          }).catch(function(error) {
            // An error happened.
            $log.info("err: " + error)
          });
          
    }

    
});
