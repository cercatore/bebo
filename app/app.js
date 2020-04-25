'use strict'
/*******************************************
*
*
*********************************************/

var app = angular.module('myApp',
	[
	'myApp.chat',
	'ngRoute',
	'ngMessages',
	'ngAnimate',
	'shared',
	'firebase',
	'ngProgress',
	'ngFileUpload',
	'myApp.costanti',
	'myApp.playground',
	'dash',
	'ciao.blabla'
	


	//'ngTable'

	])

var user;


// const setLocalStorageItem = Cl(prop, value) => {
// 	localStorage.setItem(prop, value);
// });

// const getLocalStorageItem = ClientFunction(prop => {
// 	return localStorage.getItem(prop);
// });

// Register the previously created AuthInterceptor.
function successLogin(result) {

}

let token;
app.controller('homeController' , function ($rootScope, $scope, $firebaseAuth , $location){
	this.user = {};
	var auth = $firebaseAuth();
	this.hasFinished = 'non voglio vivere cosi cerca qualcosa';
	$rootScope.user = firebase.auth().currentUser;
	let facebook_url = 
		// $location.path("/kikass");
	


	this.signInNormal = ( ) => {
	  this.working = true;
		auth.$signInWithEmailAndPassword(this.user.email, this.user.password)
			.then(
				function(firebaseUser){
					$rootScope.rightPath = "signedin";
					$rootScope.userLoggedIn = firebaseUser.email;
					//  5 dicembre: ce un errore. token non e quello che voglio(stringa)
					$rootScope.token = firebaseUser.getIdToken().then(token =>{
						window.localStorage.setItem('token' , token);

					})
					console.log("********* changed " );
					user = firebaseUser;  // ALL FIX
					$location.path('/dash')  // TODO : FIX
				  console.log("Signed in as:", firebaseUser.getIdToken());
				}
			)

			.catch(
				( error) => $scope.message= error.message
				//$location.path('/500');
			)
		}
	this.signInFacebook = () => {
		
		FB.login(function(response) {
			// handle the response
			if (response.authResponse) {
				// Logged into your webpage and Facebook.
				FB.api('/me', function(response) {
					console.log('Successful login for: ' + response.name);
					console.log(response);
					
				  });
				// let rresult = $https.get(facebook_url)
			  } else {
				// The person is not logged into your webpage or we are unable to tell. 
				console.log("balbaalla");
			  }
		  }, {scope: 'profile,email'});
	}

	this.signInFacebook_old = () => {
		let provider = new firebase.auth.FacebookAuthProvider();
		// provider.addScope("user_birthday");
		// provider.addScope("user_email");


		auth.$signInWithRedirect(provider).then(function(result) {
				//TODO $rootScope.user = firebaseUser.uid;
		console.log("login successful. access token:" + result.credentials.accessToken);
		window.localStorage.setItem("cl_once",result.credentials.accessToken);

		// console.log("FB Signed in as:", firebaseUser.uid);
		}).catch(function(error) {
			_show_error(error, $scope);
			console.log("FB Authentication failed:", error);
		});
	}

	this.signInGoogle = () => {
		// 	auth.$signInWithPopup("google").then((firebaseUser)=>{
		// 	console.log("G+ Signed in as:", firebaseUser.uid);
		// }).catch(function(error) {
		//  console.log("G Authentication failed:", error);
		// });
		this.working=1;
		let myauth = firebase.auth();
		let provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope("email");
		provider.addScope("profile");
		console.log("google redirecting")
		firebase.auth().signInWithRedirect(provider).then(function(result) {
			console.log("google redirecting ...");
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			if ( token || token == undefined || token ==='') alert("token is null");
			window.localStorage.setItem("cl_once" , token);
			// The signed-in user info.
			var user = result.user;
			$rootScope.rightPath = 1;
			$rootScope.userLoggedIn = result.user.displayName || result.user.email || "anonymous";// +++498534??? add data
			// user.getIdToken().then( token => {window.localStorage.setItem("token", token);confirm("hello ! " + token.substring(0,5) );});

			$rootScope.user = user;
			console.log(user);
			// ...
			}).catch( error => _show_error(error, $scope)
			);
	};
	this.signInGithub = () => {
		let provider = new firebase.auth.GithubAuthProvider();
		provider.addScope("repo");
		firebase.auth().signInWithPopup(provider).then(result=>{
			successLogin(result);
			$rootScope.rightPath = true;
			$rootScope.userLoggedIn = result.user.email || result.user.displayName || "pazienza";
		}).catch(error=>console.log(error))
	}

	this.sendEmailForgot = () => {

		firebase.auth().sendEmailForgotPassword(this.user.email).then(function() {
		console.log("// Email sent. to " + this.user.email);
		}).catch(function(error) {
			_show_error(error, $scope)
		});
	}


})
// GLOBAL FUNCTION MODDING
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
function _show_error(error, $scope)  {
	let found = error.message.match(/password/gi);
	if (found) $scope.message = error;
		else $scope.message = "Something went wrong. Please try again";


}
// firebase.auth().onAuthStateChanged(function(_user) {
// 	user = _user
//   if (user) {
//     //alert("user signed in")
// 		var check = angular.element(document).scope().rightPath;
// 		if ( check !== undefined && check !== '');
// 			// else window.location.href = "http://" + window.location.hostname + "/404"
// 		angular.element(document).scope().userLogged = "Ciao " + user.email;

// 		var newtoken = user.getIdToken().then(function (data) { window.localStorage.setItem('token', ("" + data).trim());
// 		console.log("****************** loggedIN changed ");})

//   } else {
// 		try{
// 			angular.element(document).scope().userLogged = "perfavore fai login";

// 		}catch(err){}
//     console.log("**************** out");
//   }
// });

function getNext(){
	return new Date().getTime()
}



app.value('categorieHC' , [ "FIRST COURSE" , "SECOND COURSE" , "SIDE DISHES" , "BEVERAGES"]);


app.factory("aracnoService" , function( $http, $location){
	let service = {};
	function mastica(data) {
		 let obj = [];
		 for(let i=0;i<data.length;i++){
				let tmp = {};
				tmp.value = data[i].name;
				obj.push(tmp);
			}
			return obj;
	}
	service.init = ( sacco ) =>{
		$http.get(window.location.protocol + '//' + window.location.host + "/" + "data.json" ).
		then(response => {
			sacco.arrayData = response.data;
			sacco.out = mastica(sacco.arrayData);
			sacco.status = "done.42";
		});

	}

	// service.uploadNext = ( firestore,  collName ):String => {
		// firestore.collection( collName).doc
	// }
	service.uploadToStorage = ( sacco, clientId, file, data, propName, prog)  => {
		// let {} = params;
		let ref = firebase.storage().ref().child(clientId + '-images').child( file.name);
		var metadata = {
			contentType: 'image/*',
			"claudio" : file.name
		  };
		sacco.uploading = 1;
		if (typeof data !== 'string') throw new DOMException('UPLOAD: well, type of data  should be dataUrl, not file');
		let task = ref.putString(data, "data_url") // TODO: lasc\iare in bianco
		prog.set(15);
		// was prog.start(): fixed time increase
		task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'

		function(snapshot) {
		  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress.toFixed(0) + '% done');
			sacco.profile_identify = 'images/paperino.png';

		  switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
			  console.log('Upload is paused');
			  break;
			case firebase.storage.TaskState.RUNNING: // or 'app.ning'
				console.log('Upload is running');
				prog.set( progress.toFixed(0) );
			  break;
		  }
		}, function(error) {

		// A full list of error codes is available at
		// https://firebase.google.com/docs/storage/web/handle-errors
		switch (error.code) {
		  case 'storage/unauthorized':
			// User doesn't have permission to access the object
			break;

		  case 'storage/canceled':
			// User canceled the upload
			break;
	  	case 'storage/unknown':
			// Unknown error occurred, inspect error.serverResponse
			break;
		default:console.log("error " + error.code);
		}
	  }, function() {
		// Upload completed successfully, now we can get the download URL
		task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
		  console.log('File available at', downloadURL);
			let ref = task.snapshot.ref;
			let bucket = "gs://" + ref.location.bucket + "/" + ref.location.u;
			sacco.aggiornaUser(downloadURL, bucket);
			console.log("bucket is " + bucket);
			window.localStorage.setItem('image', downloadURL);
			sacco[propName] = downloadURL;
			prog.set(100);

		});
	  });

	}
	return service;
})
app.factory("services", ['$http' , "clSettings", function($http , serviceBase ) {
  var docName = "portate"
    var obj = {};
	//if (!ss ) alert("goes wrong");
	obj.insertPortata = function (customer) {
		var notify = $("div[ajax-result]");

		return $http.post(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , customer)
			.success(function (data, status, headers, config) {
				$("[ajax-prog]").hide();
				notify.show();
				notify.html("<div class='center-block'><h3>CARICAMENTO CON SUCCESSO</h3></div>")
				window.setTimeout(function (){
					notify.hide();
				},2000)
				//alert(JSON.stringify(data))
			})
			.error(function (data, status){
				alert(status)
			})
			.complete(function (){
				$("[ajax-prog]").show();
			})
		};
	obj.getAllPortate = function(){

		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf')
			.error(function (data, status){
					alert(status)
			})
		}
	obj.getPortata = function(customerID){
        return $http.get(serviceBase + docName+ '/' + customerID + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf');
    }
	obj.getPortateCategoryFilter = function(category){
		var q={"category": category };
		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf&q=' + angular.toJson(q) )
		.error(function (data, status){
					alert(status + "\n " + JSON.stringify(data) )
			})
		}
	obj.catArray = [ "PRIMI" , "SECONDI" , "CONTORNI" , "BIBITE"];

	obj.insertComanda = function(itemComanda){
        return $http.post(serviceBase + 'comande' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , itemComanda)
			.error( function ( data, status) {
				alert(status)
            })
	}

	return obj;

}])


app.controller('loginCtrl',  function ($rootScope, $scope, $location, $routeParams)  {
	$scope.loginStatus = "Sign In";
	$scope.user = "you are claudio"
	$scope.authenticate = function(user){
		firebase.auth().signInWithEmailAndPassword(user.name, user.pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert (error.message + "\n" + error.code)
		  // ...
		})
		$location.path('/lista_portate')
	}




});

var routes = [ "/burp" , "/home" , "/signup" , "/chat" , "/batch", "/kikass"];

app.config(
  function($routeProvider, $httpProvider) {
		  //alert ("useXDomain prop is " + $httpProvider.defaults.useXDomain)
	// $httpProvider.interceptors.push('BearerAuthInterceptor');

    $routeProvider
      
	  .when('/login', {
			title: 'LOGIN',
			templateUrl: '/former.html',
			controller:"formerCtrl as main"					// controller: 'loginCtrl'
      })
	  .when( "/home" , {
			title : 'NUTELLA',
			templateUrl: 'homeComponent/home.html',
			controller : 'homeController as main'

		})
		.when(  "/signup", {
		 		title: 'YOLO PLAYGROUND',
				templateUrl: 'former/register.html',
				controller:"playCtrl as main"
		})
		.when( '/500' , {
				title: '500',
				templateUrl: 'homeComponent/500.html'
		})
		.when(  "/chat", {
			title:'chat',
			templateUrl: 'chat/room.html',
			controller: 'chatController as control'
		})
		.when( '/movie' , {
			title:'my obiettivo',
			templateUrl: 'movie/movieDetail.html',
			controller: 'movieController as ctrl'
		})
		.when( '/bah', {
			templateUrl:"movie/batch.html",
			controller:'batch as ba'
		})

		.when('/burp2', {
			templateUrl:'burps/animalmap.html',
			controller:'burpsCtrl as main'
		})
		.when('/kikass', {
			templateUrl:'kikass/kikass.html',
			controller:'kikass as main'
		})
		.when('/dash', {
			templateUrl:'homeComponent/dash.html',
			controller:'appCtrl as main'
		})
		.when('/azione', {
			templateUrl:"burps/burps.html",
			controller:'burpsCtrl as main'
		})
		.when('/maia' , {
			templateUrl:"chat/customerchat.html",
			controller:'burpsCtrl as main'
		})
		.when( '/cascata' , {
			templateUrl:"blanotte/cascata.html",
			controller:"cascata as main"
		})
		.when('/prefs' , {
			templateUrl:"former/blank.html",
			controller:"prefcontroller as main"
		})
		.otherwise({
			redirectTo:"/prefs"
		})




});

function printString(out, ticker, delay, resolve){
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
		  console.log(ticker)
		  out += ticker;
          resolve()
        },
        delay + 1
      )
    })
  }
const waitaminuteDone = async() =>{
	await printString("1111111", 300);
	$rootScope.app_loading = 'ok load';

}
function myawesomeroute (path) {

}

const  guardIron = (function ( serv, lista){
	//#pointer to prefs array
			var oddi = 'c' + '20190306';
			var check = 0;
			var list = lista;
			function save(prop, value){
				if ( typeof list.oddi === 'undefined' )  { list[oddi] ={};list.oddi.prop=value;}
						list.oddi.prop = value;
					serv.setItem('preference', list)
			}
			function init(){
				list = serv.getItem('preference');

			}
			function isArray (value) {
				return typeof value === 'array' || value instanceof Array;
			}
			init();
			return {
				sayHello: () => { return 'hello' ; },
				load : () => { ///if (!check) alert('error!');else {
				  list['c20190306'] = {};
					list['c20190306'].debug = true;
					serv.setItem('preference', list);
					return list;
				},
				save: (prop, value)=>{ save(prop, value)}

			}
		}
)(window.localStorage, "")


app.run(['$location', '$rootScope', 'clSettings', '$timeout', function($location, $rootScope, settings, $timeout) {

	$rootScope.loginActions  = [ 'LOGOUT', 'I MIEI AMICI', 'FEEDBACK'];
	$rootScope.splashLoad = true;
	$rootScope.route_1 = routes[0].replace('/','#');
	$rootScope.locale = window.localStorage.getItem("cl_locale");
	$rootScope.clientId = window.localStorage.getItem("deviceId") || '1234567890';
	settings.storageBase = (!window.locale ) ? $rootScope.clientId + "" : "";

  // let self = (this);
	// self.guard = window.localStorage;
		let $proj = {};
	$proj.locale = window.localStorage.getItem("cl_locale");
	$proj.deviceID = $rootScope.clientId;
	$proj.routes = window.routes;

	$rootScope.project = $proj;
	$rootScope.navbar = {} ;
	$rootScope.navbar.debug = () => {
		 dialogConfirm(JSON.stringify($rootScope.project));
			 window.localStorage.setItem('preference', [])

	}
	// $rootScope.guard = guardIron;
  // let prefs = guardIron.load();
	// console.log( prefs )

    // window.$watch (window.googleyolo, function (newvalue,oldvalue){
	// 	console.log("yolo " + newvalue);
	// });
	// window.location.protocol = 'https:';\
	$rootScope.move = () => {
		let last = settings.history.pop();
		var options = {
			direction: 'left',
			duration: 300,
			iosdelay: 100,
			androiddelay: 1000,
			fixedPixelsTop: 45,
			href: last
		  };
		console.log(last);
		$location.path("/home");
	}
	$rootScope.$watch("user", function(newvalue,oldvalue){
		console.log("redirecting to daskboard...");
		let token = window.localStorage.getItem("token");
		let user = newvalue;

	})
	// settings.$watch('storageUrl', function( val, old){
	// 	console.log('watchdog1' + val);
	// 	if ( ! ( val && val != '')) generalAracno = 1;
	// })

	// firebase.auth().getRedirectResult().then((log => console.log(log.credential.accessToken)))
		// .catch(error => console.log(error))

	firebase.auth().onAuthStateChanged(function(_user) {
		console.log("state changed.");
		if (_user){
			let token = window.localStorage.getItem("cl_once");
			if (token) console.log( token.slice(0,16));
			_user.getIdToken().then(uidtoken=>{
				// 	console.log(uidtoken);
				// window.localStorage TODO CONTINUE
			})
			$rootScope.userLoggedIn = ( _user.displayName || _user.email) + " -> " + _user.emailVerified;
			$timeout(()=>{
				console.log("tutto previsto 32333. ");
				$location.path('dash')
			},1300);
			console.log("blabla asseytt one(true): " + (_user.uuid == token) );
		}
		else { console.log("logout.")}
	})

	$rootScope.logout = function(){  // NOT THIS
		firebase.auth().signOut().then(_=> {
				// Sign-out successful.
				$timeout(()=>{
					console.log("tutto previsto 32333. " + _);
					$rootScope.rightPath = false;
					$rootScope.userLoggedIn = 'ciao';
					$location.path('500')
				},300);

			}, function(error) {
				// An error happened.
				console.log(error)
			});
		}


	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			try{
				$rootScope.title = current.$$route.title;
				console.log(current.$$route.originalPath);

				settings.history.push(current.$$route.originalPath.replace("/", "#"));
			}
			catch( err){console.log("cl", err)}
			});

	$rootScope.$on('$routeChangeError', function (event, current, previous) {
		$location.path('/5423');
	});
}]);
// two additional optional parameters :
//   - the maximal depth (default : 6)
//   - the maximal length of arrays (default : 50)
// GitHub : https://github.com/Canop/JSON.prune
// This is based on Douglas Crockford's code ( https://github.com/douglascrockford/JSON-js/blob/master/json2.js )
(function () {
var DEFAULT_MAX_DEPTH = 6;
var DEFAULT_ARRAY_MAX_LENGTH = 50;
var seen; // Same variable used for all stringifications

Date.prototype.toPrunedJSON = Date.prototype.toJSON;
String.prototype.toPrunedJSON = String.prototype.toJSON;

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	meta = {    // table of character substitutions
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"' : '\\"',
		'\\': '\\\\'
	};

function quote(string) {
	escapable.lastIndex = 0;
	return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
		var c = meta[a];
		return typeof c === 'string'
			? c
			: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	}) + '"' : '"' + string + '"';
}

function str(key, holder, depthDecr, arrayMaxLength) {
	var i,          // The loop counter.
		k,          // The member key.
		v,          // The member value.
		length,
		partial,
		value = holder[key];
	if (value && typeof value === 'object' && typeof value.toPrunedJSON === 'function') {
		value = value.toPrunedJSON(key);
	}

	switch (typeof value) {
	case 'string':
		return quote(value);
	case 'number':
		return isFinite(value) ? String(value) : 'null';
	case 'boolean':
	case 'null':
		return String(value);
	case 'object':
		if (!value) {
			return 'null';
		}
		if (depthDecr<=0 || seen.indexOf(value)!==-1) {
			return '"-pruned-"';
		}
		seen.push(value);
		partial = [];
		if (Object.prototype.toString.apply(value) === '[object Array]') {
			length = Math.min(value.length, arrayMaxLength);
			for (i = 0; i < length; i += 1) {
				partial[i] = str(i, value, depthDecr-1, arrayMaxLength) || 'null';
			}
			v = partial.length === 0
				? '[]'
				: '[' + partial.join(',') + ']';
			return v;
		}
		for (k in value) {
			if (Object.prototype.hasOwnProperty.call(value, k)) {
				try {
					v = str(k, value, depthDecr-1, arrayMaxLength);
					if (v) partial.push(quote(k) + ':' + v);
				} catch (e) { 
					// this try/catch due to some "Accessing selectionEnd on an input element that cannot have a selection." on Chrome
				}
			}
		}
		v = partial.length === 0
			? '{}'
			: '{\n' + partial.join(',\n') + '}';
		return v;
	}
}

JSON.pruned = function (value, depthDecr, arrayMaxLength) {
	seen = [];
	depthDecr = depthDecr || DEFAULT_MAX_DEPTH;
	arrayMaxLength = arrayMaxLength || DEFAULT_ARRAY_MAX_LENGTH;
	return str('', {'': value}, depthDecr, arrayMaxLength);
};

}());