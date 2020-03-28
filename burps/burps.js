

app.controller( "burpsCtrl" , function ($scope, $rootScope, ngProgressFactory, $log, Upload, $http, aracnoService, geoService, $location) {
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

  $rootScope.user = firebase.auth().currentUser;

  $scope.origin = { "x" : 0, "y" : 0};
  self.client.image = window.localStorage.getItem('image');
  console.log("client image is " + self.client.image);
  $scope.progressbar = ngProgressFactory.createInstance();
  $scope.progressbar.setParent($("#rootElement").parent()[0]);
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
    geoService.newUser(self.client, [parseFloat($scope.origin.y), parseFloat($scope.origin.x)]);
  }
  this.updateRange = (r)=>{
    console.log("range : " + r);
  };
  const feedDoggo = (data) => {

  }
  const feedGoogle = (data, outputDebug) => {
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
  self.testi = [ "Animals - Fauna" , "Mammals", "This cat", "laughing"];

  $scope.fatto = (data, file) => {
    console.log("[DEGUFF ]************** " + file.name)
    aracnoService.uploadToStorage($scope, clientId, file, data, 'out_url', $scope.progressbar);

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

  initFire();




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



  $scope.aggiornaUser = async (a, bucket)=>{self.client.image = a;$scope.upload_complete = true;self.client.gcsImage = bucket;
    $scope.recog_in_progress = "wait please, check in progress";
    let sent = buildRequest(self.client.gcsImage);
    $scope.thecat = a;

    $scope.recog_in_progress = "wait please, check in progress";
      // let sent = buildRequest(self.client.gcsImage);
      let url = clSettings.doggobackend + "" + a;
      let result = await $http.get(url);
      $scope.recog_in_progress = "";
      let data = result.labels;
      main.active = true;
      for (ii=0; ii< data.length; ii++){
      //self.testi =data[ii];
        console.log(data[ii] + " data" + data);
      //inserire preferenza
      }






  };


  $scope.moveMarker = (event) => {
    let y = event.offsetY;
    let x = event.offsetX;
    $scope.origin.x = (x - 350) / 2;
    $scope.origin.y = (y - 150) / 2;
      $('#maker').css('top', y);

      $('#maker').css('left', x);
  }
  self.wrap = function () {self.client.image };
});

// $scope.request = buildRequest($scope.request);
//     log($scope.request);
//     $scope.request.requests[0].image.content = btoa(data);
//     await feedGoogle($scope.request);
