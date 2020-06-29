angular.module("ciao.blabla", [])
  .controller("prefcontroller", function($scope, clSettings, $http, $log){
    let log = $log.info;
    log("iniziale valore di pref : " + this.preferenza);
    const prefs = clSettings.prefs(db, "cbagnato77@gmail.com", console.log);
    //log(prefs.update("ciaokey","clavalue"));
    //prefs.caricaAction("ciaokey", "fjkjf" );
    var user = firebase.auth().currentUser;
    let cached = {};
    cached.action = {};
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
