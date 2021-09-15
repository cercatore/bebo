

_ = (message) => {console.log(message + "dficance")};
let getHash = ()=>{return new Date().getTime();}
let modulo = angular.module('myApp.costanti', []);
modulo
.constant('clSettings', {
    beUrl:      'https://api.mlab.com/api/1/databases/cbmanager/collections/',
    docName: 		 'test03',
    apikey:      '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf',
    storageBase:  '',
    otherSetting: 'XYZ',
    squadre_serie_a: ["SELEZIONA...", "ATALANTA", "BOLOGNA", "CAGLIARI", "CHIEVO", "EMPOLI", "FIORENTINA", "FROSINONE", "GENOA", "INTER", "JUVENTUS", "LAZIO", "MILAN", "NAPOLI", "PARMA", "ROMA", "SAMPDORIA", "SASSUOLO", "SPAL", "TORINO", "UDINESE"],
    history: [],
    routes,
    labels: {
        title: "HELLO !!",
        tutorial_text:
            ""
    },
    amazonBackend: "...message/blabla:",
    prefs,
    getHash,
    doggobackend: null,
    actionCodeSettings : {
        url: 'https://rairadio.app/#/?email=' + "cbagnato77@gmail.com",
        android: {
          packageName: 'com.rairadio.concisecoder',
          installApp: false, // ?????? TODO
          minimumVersion: '12'
        },
        handleCodeInApp: true,
        // When multiple custom dynamic link domains are defined, specify which
        // one to use.
        dynamicLinkDomain: "https://doggowut.page.link/XktS"
        }
    

});
app.controller("prefs", function(clSettings, $http, $log){

    log("iniziale valore di pref : " + this.preferenza);
    const prefs = clSettings.prefs(db,"bagnato_c",console.log);
    //log(prefs.save("ciaokey","clavalue"));
    //prefs.caricaAction("ciaokey", "fjkjf" );
    var user = firebase.auth().currentUser;

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
angular.module('myApp.playground', [])
    .controller('playCtrl', function ($rootScope, $scope, $timeout, $location ){
        function mock_ctrl() {
            this.auth.createUserWithEmailAndPassword(self.name, self.pass).catch(function (error) {
                // Handle Errors here.
              handleError(error);
                // ...
              })
              .then( (success ) =>{
                  console.log("user-created");
              })
        }

        function handleError(error) {
            // Handle Errors here.
            $timeout(()=>{
      				console.log("tutto previsto 32333. blabla ");
              $scope.message = error.message;
              $scope.andrina_splash = false;
      				// $location.path('dash')
      			},1300);


        }

        function sendEmailVerification()  {

            user.sendEmailPasswordReminder(user.email).then(function() {  //WRONG
            console.log("// Email sent. " + user.email);
            }).catch(function(error) {
                console.log(error);
            });
        }
        function gioco() {
            return this.auth.signInWithEmailAndPassword(self.name, self.pass);
            // console.log(obj , "    ");
        }
        function signInNormal ( ) {
            this.auth.signInWithEmailAndPassword(self.name, self.pass)
                .then(
                  console.loh("fkgjndkj")
                )

                .catch(
                    ( error) => $scope.message = error.message
                    //$location.path('/500');
                )
            }

                console.log("Controller loaded. bitch ready");
        let self = (this);
        // self.name = "homegreen18@gmail.com";
        // self.pass = "aaaaaa";

        let obj = {
            register_service: mock_ctrl,
            // verify_email: sendVerify,
            entra: gioco,
            auth: firebase.auth()
        }
        $scope.andrina_splash = false;
        $scope.out = "";//obj === obj.do_service();
let callback_signin =   function(user){
    $rootScope.rightPath = true;
    $rootScope.userLoggedIn = user.displayName || user.email || "anonymous";
    user.getIdToken().then( token => window.localStorage.setItem("token", token));
    $rootScope.user = user;
    return user;

};
function printString(ticker, delay){

    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
        //   $scope.out += firebase.auth().currentUser.email;
        //   $scope.out += string;
          $scope.andrina_splash = false;
        //   $location.path("/chat");
          resolve(ticker);
        },
        delay + 1
      )
    })
  }
        self.submit = async() => {
            console.log(self.name);
            console.log(self.pass + " confirma:" + self.pass_confirm);
            $scope.andrina_splash = "loading";
            const error = await  obj.register_service();

            let out1 = await obj.entra().then(callback_signin);

            $scope.andrina_splash = "Done. redirecting to console." + out1.uid;
            // await obj.verify_email($rootScope.user);
            $scope.andrina_splash = "verification mail sent.";
            let out2 = await printString("fiori", 1300).then(ticker=>{return ticker;})
            console.log("mi aspetto(fiori) " + out2);
             $location.path("/kikass");
             self.location = "kikass";
             var options = {
                direction: 'left',
                duration: 600,
                iosdelay: 100,
                androiddelay: 0,
                fixedPixelsTop: 45,
                href: self.location
              };


        };


        self.deleteUser = () => {
            var user = firebase.auth().currentUser;

            user.delete().then(function() {
            // User deleted.
            console.log("user deleted.");
            }).catch( error=>{console.log(error)}
            );
        }




    })

modulo.directive('clNavbar', function() {
    return {
            restrict: 'E',

            templateUrl: 'partials/navbar.html'
        }
    })
modulo.directive('myAweUseless', function() {
    return {
            restrict: 'E',
            template: '<div class="map"></div>',
            link: function ( scope, element, attrs) {
                console.log(element.offsetWidth);

                element.bind( 'click', function (event) {
                    console.log(event.offsetX);
                    scope.$apply(scope.moveMarker(event));
                    event.preventDefault();

                });
            }
    }
})

var resizer = window.pica({"all":true});

// console.log(result.width)
modulo.directive("clUpload", function ($parse) {
    return {
        restrict: "EA",

                                                                    // RAYMOND : accept="image/*;capture=camera" capture
        template: '<span class="text-secondary">{{zio}}<input id="customFile" class="custom-file-input" type="file" accept="image/*"><img src="" alt="output" id="example">  </span>',
        replace: true,
        link: function (scope, element, attrs) {

            var modelGet = $parse(attrs.fileInput);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);
            scope["zio"] = "TAKE A PIC";
            var updateModel = function () {
                scope.$apply(function () {
                    let fileinputel = element[0].querySelector('input#customFile');
                    let file = fileinputel.files[0];
                    modelSet(scope, file);
                    scope["zio"] = file.name.trim();
                    let Mb = 1024*1024;
                    if (file.size>5.1 * Mb) {scope["innocu_error"] = "ops, file too big. \/( max 2MB )";return;}
                    var reader = new FileReader();
                    reader.onloadend = function (result) {
                      console.log('chiamata done');
                      try {  // attenzione sto passando il rif e il nome del file , non piu dati
                        // let data = reader.result;
                        // let img = element[0].querySelector('img#example');
                        // img.onload = function(e){
                        //   console.log(img.naturalHeight);
                        // }
                        // let buffer = new Buffer(reader.result);
                        let data = reader.result;
                        console.log("original" + data.length);
                        let img = element[0].querySelector('img#example');
                        let offscreen = document.createElement("canvas");
                        var context = offscreen.getContext("2d");
                        offscreen.style.display = 'none';
                        document.body.appendChild(offscreen);
                        // img.insertBefore(offscreen, element[0]);
                        img.setAttribute('src', data );
                        img.onload  =function(e){
                        let w = img.naturalWidth;
                        let h = img.naturalHeight;
                        console.log("w,h ===> " + w + " , " + h  )
                        offscreen.width = 512;
                        offscreen.height = offscreen.width * h / w;
                        resizer.resize( img, offscreen, {
                        })
                        .then(con => {
                                // console.log(resizer.prototype.resizeBuffer)
                                var dataUrl = offscreen.toDataURL();
  console.log("w,h ===> " + offscreen.width + " , " + offscreen.height  + " typeof(dataURl)(string) : " + typeof dataUrl )
                                scope.fatto( dataUrl, file);
                        })
                        .catch(err => console.log(err))

                        }

                        console.log(data.slice(1,36) );

                      }catch(ex){console.log(ex);throw new DOMException("call to undefined method done in scope. implement it?")}
                    };
                    reader.readAsDataURL(file)





                    onChange(scope);
                });
            };

            element.bind( 'change', updateModel);
        }
    };
});
