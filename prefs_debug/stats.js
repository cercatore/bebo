angular.module("prefsModule", [])
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

    let raw  ='{"Labels":[{"Name":"Boxer","Confidence":94.74224090576172,"Instances":[],"Parents":[{"Name":"Bulldog"},{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Dog","Confidence":94.74224090576172,"Instances":[{"BoundingBox":{"Width":0.9854685068130493,"Height":0.9443489909172058,"Left":0.009451210498809814,"Top":0.03028137981891632},"Confidence":94.2599105834961}],"Parents":[{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Bulldog","Confidence":94.74224090576172,"Instances":[],"Parents":[{"Name":"Dog"},{"Name":"Pet"},{"Name":"Canine"},{"Name":"Animal"},{"Name":"Mammal"}]},{"Name":"Canine","Confidence":94.74224090576172,"Instances":[],"Parents":[{"Name":"Mammal"},{"Name":"Animal"}]},{"Name":"Pet","Confidence":94.74224090576172,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Mammal","Confidence":94.74224090576172,"Instances":[],"Parents":[{"Name":"Animal"}]},{"Name":"Animal","Confidence":94.74224090576172,"Instances":[],"Parents":[]}],"LabelModelVersion":"2.0"}';
    // let arr = {
    //     [ {
    //       Name:"kddskf",
    //       Confidence:94,
    //       Instances:[]
    //       },
    //       {
    //         Name:"baba",
    //         Confidence:94,
    //         Instances:[{"BoundingBox":{"Width":0.9854685068130493,"Height":0.9443489909172058,"Left":0.009451210498809814,"Top":0.03028137981891632}}]
    //       }

    //     ]
    // };
    function ceBounding2 ( data) {
      for (let nn = 0; nn < data.length; nn++){
        if (data[nn].Instances[0] && data[nn].Instances[0].BoundingBox != 'undefined')
          return 0;
      }
      
    }
    
    console.log("blabl2")
    function dobite(){
      let arr = JSON.parse(raw);
      console.log(arr.Labels)
      let item = arr.Labels
      let result = ceBounding2( item);
      let ttt;
      if ( ttt = item[1].Instances[0].BoundingBox){
        let rect = {};
        rect.style= {};
        rect.style.top = ttt.Top;
        rect.style.left= ttt.Left;
        rect.style.width = ttt.Width;
        rect.style.height = ttt.Height;
        console.log(rect.style)
      }
    }

    dobite();
    











    try {
      prefs.carica("ciaokey")
    }catch(er){log("cl error:" + er);}

    async function readDataFromPrefs(){
      let data = await prefs.loadTutto( $scope);
      $scope.parseItems(data);
    }
    readDataFromPrefs();

    function parseText(tick){
      let ii = (tick.indexOf("images%2F") + 9);
      let kk = (tick.indexOf("?"));
      tick = tick.substring(ii,kk)
      tick = tick.replaceAll( "%20", "");
      return tick;
    }
    $scope.parseItems = (inlut) => {
      let lista = inlut;
      let arr = []
      for (item in lista){
        let item2 = {}
        let image = lista[item];
        item2.image = image;
        
        item2.text = parseText(lista[item])
        arr.push(item2);      
      }
      $scope.scoped_items = arr;
      $scope.$apply();
      
    }
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


    



    this.uselresPassword = () => {
        user.updateEmail("cbagnato77@gmail.com").then(function() {
            // Update successful.
            $log.info("success")
          }).catch(function(error) {
            // An error happened.
            $log.info("err: " + error)
          });
          
    }

    
});
