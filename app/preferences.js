const prefs  = (function( afs, user, $log){
    
    function save (key, value){
		let item = {};
		item[key] = value;
        let ret = afs.collection("users").doc(user).set(item)
            .then(success => "")
            .catch(error => "error");
        $log(ret);


    } 
    function carica(key){
        afs.collection("users").doc(user)
            .get()
            .then(doc => console.log(doc.data()))
    }
    function base(){return afs;}
    return {
        save: save,
        carica:carica,
        getBase: base
    }
})(db,"uomo", console.log);

app.controller("prefs", function($http,$log){
    let log = $log.info;
    log("iniziale valore di pref : " + this.preferenza);

    //log(prefs.save("ciaokey","clavalue"));
   prefs.carica("ciaokey");
});
