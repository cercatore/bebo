angular.module('myApp.yac', [])
  .controller("yapCtrl" , function( $scope , ngProgressFactory, aracnoService, clSettings, $location){
    let self = (this);
    let clientId= "1234567890";
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setParent($("#rootElement").parent()[0]);
    $scope.progressbar.setColor('#aa40dd');
    $scope.progressbar.setHeight('12px');
    $scope.fatto2 = (data, file) => {
    console.log("[DEGUFFA ]************** " + file.name);
    console.log("client " + clientId);


    aracnoService.uploadToStorage( $scope, clientId, file, data, 'out_url', $scope.progressbar );

      // alert(reader.result);
        // var content = reader.result.split(',')[1];// or var base64result = reader.result.substr(reader.result.indexOf(',') + 1); reader.result.split(',')[1]; //or var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
        // console.log(content.slice(content, 0, 50))

    }

    $scope.aggiornaUser = async (a, bucket)=>{$scope.upload_complete = true;
            $scope.recog_in_progress = "wait please, check in progress";
      // let sent = buildRequest(self.client.gcsImage);
      let url = clSettings.amazonBackend + "" + a;
      let result = await $scope.detectFactory(url);
      let data = result.labels
      for (ii=0; ii< result.length; ii++)
      self.testi = log("error")





    };

    $scope.detectFactory =  ( url ) => {
      return $http.get(url);
    }

  })
