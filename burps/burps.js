

app.controller( "burpsCtrl" , function ($scope, $rootScope, ngProgressFactory, $log, Upload, $http, aracnoService, geoService, $location, clSettings) {
  const cloud = "https://vision.googleapis.com/v1/images:annotate?key="; // WARING NO KEY
  // const key = 'AIzaSyAN8SUGdR7A17SCZta40uHajTYhsdOX-po';
  const key = 'AIzaSyCnfDtTBNv_W66cxLfmitf0oGsJkH49OVg';
  let clientId = "1234567890"; // todo watchout, replace
  let self = (this);
  self.afs = firebase.firestore();
  $scope.image = {};
  $scope.file = {};
  self.client =  { clientId, name: "alberto alberto"};
  self.data = {};
  self.amici = {};
  let user = firebase.auth().currentUser;
  self.user = $rootScope.user.email || user.email;  // FACBOOK OK
  
  let prefs = clSettings.prefs(db, self.user, console.log);

  
  $scope.origin = { "x" : 0, "y" : 0};
  self.client.image = window.localStorage.getItem('image');
  console.log("client image is " + self.client.image); //TODO:GONE
  $scope.progressbar = ngProgressFactory.createInstance();
  $scope.progressbar.setParent($("body").parent()[0]);
  
  $scope.progressbar.setHeight('12px');
  let ACCESS_TOKEN = "ya29.GqMBWQZfe7Hegewj0Xo5pjQEV-_aS3bhhRWUJ1nJtoiPIioJUvJxHGbx8QmvBSkIWfCFQyboS9_RKmy7zDWVFK3XcAYMp-ID7ZdWIeshm5CWBMA-eQbQQT7l82eH_FUjDhJFTwzRBDm6XOkWh65V9rPMJf-LqGfpqjMIXHQz8zTq1gAV6W2KXiJ8QGJYLj5_jZoIiPpWB8YDrkVy6zU1ZjJC6VAKVQ";
  this.save = () => {
    if (self.client.image === '' ) {
    $scope.user_error = 'error no image';

    // return;
      }
    if (window.localStorage.getItem('chrome')){
    }
    checkUser();
    
    console.log(self.client.clientId + " " + self.client.name);
    // geoService.newUser(self.client, [parseFloat($scope.origin.y), parseFloat($scope.origin.x)]);
  }
  this.updateRange = (r)=>{
    console.log("range : " + r);
  };
  const feedDoggo =  (data, outputDebug) => {
      log( "User login status ", $rootScope.userLogged);
      log({"headers":{
        "Authorization": "bearer " + ACCESS_TOKEN
      }
    })
      $http.post(cloud + key, data
      )
          .then( (result) => { log(result); alert("SUCCESS!")})
          .catch( (result) => log( result));
  };
  
  $scope.thecat = "images/unload.png";
  $scope.testi = [ "loading" ]; 
  $scope.fatto = (data, file) => {
    console.log("[DEGUFF ]************** " + file.name)  // ERRORE DI CUI SOPRA
    aracnoService.uploadToStorage($scope, self.user , file, data, 'out_url', $scope.progressbar);

    // alert(reader.result);
      // var content = reader.result.split(',')[1];// or var base64result = reader.result.substr(reader.result.indexOf(',') + 1); reader.result.split(',')[1]; //or var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      // console.log(content.slice(content, 0, 50))

  }
  this.knock = (user) => {
      self.afs.collection('amici').doc(user).update({'knock': self.client.clientId});
  }
  // Specify the locations for each fish
  let fishLocations = [
    [-16.130262, 153.605347],   // Coral Sea
    [-66.722541, -167.019653],  // Southern Ocean
    [-41.112469, 159.054565],   // Tasman Sea
    [30.902225, -166.66809]     // North Pacific Ocean
  ];

  const mapPromises = ()=> {
      let promises = [];
      fishLocations.forEach( (location, index)=> {
        promises.push( self.geoFire.set("fish" + index, location).then(function () {
            log("fish" + index + " initially set to [" + location + "]");
        }));
      });
  return promises;
  };

  $scope.setId = (clientId) =>{
      self.clientId = clientId;
      self.client =  { clientId, name: "johnny"};   // TODO ERROR
    }

  function initFire () {

      geoService.registerQuery(clientId, [0, 0]);

  }

  // initFire();




  function buildRequest (imageUri) {
      let obj = {};
      obj.requests = [];
      obj.requests.push({});
      obj.requests[0].image = { "source": { "gcsImageUri" : imageUri }};
      let obj_feat = [];
      obj_feat.push({});
      obj_feat[0].type = 'LABEL_DETECTION';
      obj_feat[0].maxResults = 1;
      obj.requests[0].features = obj_feat;
      return obj;
  }
  const populate = (data)=>{
    let persons = [];
    let item = {};
    item.identity = 'maurilio';
    item.image = 'image1.jpg';

    persons.push(item);
    data.persons = persons;

  }
  populate(self.data);
  function log (what) {$log.log(what);}

  function checkUser () {
    return true;
  }
  this.procedi = () => {
    $location.path('/burp2');
  }

  self.updateUserState = (prefs, target, type) => {
    let id = clSettings.getHash();
    let key = "";
    if (type==0) 
      key ="burps" + "_" + "upload_" + id;
      else 
      key ="burps" + "_" + "decode_" + id;
      
    let prefInstance = prefs(db, self.user, console.log);
    prefInstance.update(key, target);
  }

  
  var config = {headers:  {
    "Access-Control-Allow-Origin": "*",
    "X-Requested-For" : "github.com"
    
    
  } 
};
  $scope.aggiornaUser = async (doggoImage, bucket)=>{self.client.image = doggoImage;$scope.upload_complete = true;self.client.gcsImage = bucket;
    $scope.recog_in_progress = "wait please, check in progress";
    self.azione_welcome_text = $scope.recog_in_progress;
    let sent = buildRequest(self.client.gcsImage);
    let $srv = $("#confirmButton");
    console.log($srv);
    function ceBounding2 ( data) {
      for (let nn = 0; nn < data.length; nn++){
        if (data[nn].Instances[0] && data[nn].Instances[0].BoundingBox != 'undefined')
          return data[nn].Instances[0].BoundingBox;
      }
    }
    function getBounding  (rect) {
      if ( rect.length == 0 ) return 1;
      let item = rect[0].BoundingBox
      if (item)   return item;
        else return 1;
    }
      // let sent = buildRequest(self.client.gcsImage);
      let url = clSettings.doggobackend + "" +doggoImage;
      self.updateUserState(clSettings.prefs, doggoImage, 0 )
      try{
      let result = await $http.get(url, config); /// TODO: FIX erro
      let data = result.data.Labels;
      self.updateUserTea(doggoImage);
      
      for (ii=0; ii< data.length; ii++){
      //self.testi =data[ii];
        let certezza = undefined; 
        try {
          let numb = data[ii].Confidence.toString();
          let i = numb.indexOf('.');
          if (~i) certezza = numb.substring(0,i);
            else certezza = numb;
        }catch (err) {$log.info(err)}
        
        $scope.testi[ii] = data[ii].Name + "::" + certezza;
        let ttt = ceBounding2(data);
          
          if ( ttt ) {
            $scope.style= { top:ttt.Top * 100  + "%", left:100 * ttt.Left + "%", width:100 * ttt.Width + "%",height:100* ttt.Height+"%"};
          }
          
        }
        $('#button').click();
        var $input = $('<button class="btn btn-primary" type="button" value="new button" >AAA button</button');
        $input.appendTo($("#donut"));
        
        $scope.recog_in_progress = false;
        $scope.thecat = doggoImage;
        $scope.active2 = true;
        self.azione_welcome_text = "";
        

        
        
      // self.updateUserState(clSetting.prefs, result.labels, 2);
      // TODO : recover vita
      //inserire preferenza
      
    }catch(error){console.log(error)}
      




  };
  $scope.saveName= ()=>{
    let key = "burps_" + "friend_" + clSettings.getHash();
    prefs.update(key, self.name);
  }


  $scope.moveMarker = (event) => {
    let y = event.offsetY;
    let x = event.offsetX;
    $scope.origin.x = (x - 350) / 2;
    $scope.origin.y = (y - 150) / 2;
      $('#maker').css('top', y);

      $('#maker').css('left', x);
  }
  self.wrap = function () {self.client.image };
  self.updateUserTea = (img ) => {
    let headers = { "content-type": "application/json"}
    let ping = 'http://3.123.236.229:9292/test?collection=frutta';
    let data = { "$date":`${new Date()}`,"image":img,"app":"Whatsdoggo"};
    $http.post(ping, data)
      .then( success=>console.log("send result: " + success))
      .catch( error=>console.log(error));


  } 
});

// $scope.request = buildRequest($scope.request);
//     log($scope.request);
//     $scope.request.requests[0].image.content = btoa(data);
//     await feedGoogle($scope.request);
