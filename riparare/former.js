angular.module("ciao.blabla", [])
  .controller("prefcontroller", function($scope, clSettings, $http, $log){
    let log = $log.info;
    log("iniziale valore di pref : " + this.preferenza);
    const prefs = clSettings.prefs(db,"3519243517@blabla.it",console.log);
    //log(prefs.save("ciaokey","clavalue"));
    //prefs.caricaAction("ciaokey", "fjkjf" );
    var user = firebase.auth().currentUser;
    let cached = {};
    cached.action = {};
    prefs.carica("ciaokey");
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
      $http.get(urlAds).
        then((result=>$scope.preferenceJSON = JSON.pruned(result.data)))
        .catch(_);
    }

    $scope.testAction = async () => {
      let result = await $http.get(url);
      $scope.preferenceJSON = result.data;
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
