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
    
    // let ugly = {
    //   "title" : "motivational JSON",
    //   "data" : {
    //       "emoti" : "v😆 o.O"
    //       }
    
    
    // }

    







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
