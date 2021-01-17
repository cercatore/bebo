function blavla(postData){
  fetch( "http://aaa.com" , {
    method: "post",
    body: JSON.stringify(postData)
  })
}
function fuckerup(json){
  let bru = []
  for ( i = 0; i < json.length; i++)
  {
    let item2 = {}
    for (p in json[i]){
      obj = json[i];
      item2[p] = encodeURIComponent(obj[p]);

    }
    if ( i==10) console.log(item2)
    bru.push(item2)
  }
  return bru;
}

app.controller("batch" , function($scope, $http, ngProgressFactory, clSettings){
  $scope.bla = () =>{

  }

  https://api.mlab.com/api/1/databases/cbmanager/collections/batch.0015/?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf
  var url = 'https://4doggle:9292/test/';
  let apikey = '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf';
  let status = {};
  status.ii = 0;
  // IVENDVER SEE THIS CODE BEFORE
  const buildEndpoint = (folder) => {
    function format4Padding() {
      let num = status.ii;
      let arr = num.toString().split(".")
      arr[0] = arr[0].padStart(4, "0")
      let str = arr.join(".")
      return str;
      }
    status.ii = status.ii + 1;
    let pushingurl =url + folder + "" + formate4Padding(status.ii) + "/";//+ apikey;
    console.log(pushingurl);
     return  pushingUrl;
  }

  const MAX = 1;
  var uploadTotal = -1;

  var cc = 0; // progress
  function initLoadCSV(){
    $http.get( location.protocol + "//" + location.host+ "/" + "data.json"
    // {"headers":{
    //   "content-type": "json; charset",
      // "accept" : "application/json; charset=utf-8"}
  // }
    ).then(response => { $scope.data = response.data;$scope.uploadTotal=$scope.data.length;console.log($scope.data[2]);$scope.main = $scope.data[2];})
    
  }
  initLoadCSV();

  complete = () => {
    console.log("complete.")

  }
  $scope.progressbar = ngProgressFactory.createInstance();
  $scope.progressbar.setHeight("20px");
  try{
    $scope.progressbar.setColor("#70ee00");
  }catch(err){}

  $scope.upload_chuncked =  (chunck) => {
    return $http.post( buildEndpoint(chunck), $scope.data  
      // {"headers":{"Content-Type" : "application/json; charset=utf-8"}}
      )
      // .then( (success) => { $scope.outputText = `upload complete.${status.ii}`; return "donce " + status.ii; })
      // .catch(error => console.log(error) );
      
  };

  self.uploadBatch =async () => {
    $scope.progressbar.start();
    for ( status.ii = 0; status.ii<MAX;){
      result = await $scope.upload_chuncked ("batch");
      $scope.progressbar.set(status.ii * 20);
      console.log(result);
    }
    $scope.progressbar.complete();
  }



 
function mockProgress(){
  for (cc= 0 ; cc < 18; cc ++){

  }
}
mockProgress()
let uploadStart  = 0;
let inc = 32;
const iamgood = (delay, value) => {
  return new Promise( response => setTimeout( response, delay, value))
}
async function another () {
  await iamgood(500, 12)
  .then(() => {return "done"})
}
$scope.dammilafiga = async () => {
  var result = await another();
  console.log(result);
}

function printString(string, delay){
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          console.log(string)
          resolve()
        },
        delay + 1
      )
    })
  }

  const printAll = async () =>{
    $scope.uploadProgress = uploadStart;
    $scope.progressbar.start();

    await printString("1111111", 600);
    $scope.uploadProgress += inc;
    $scope.progressbar.set($scope.uploadProgress)

    await printString("2222222", 600);
    $scope.uploadProgress += inc;
    $scope.progressbar.set($scope.uploadProgress)
    await printString("33333333",600);
    $scope.uploadProgress += inc;
    $scope.progressbar.set($scope.uploadProgress)
    $scope.outputText = "done."
  }

  printAll();
})
