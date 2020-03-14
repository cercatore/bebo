const prefs  = (function( afs, user, $log){
    
    function save (key, value){
		let item = {};
		item[key] = value;
        let ret = afs.collection("users").doc(user).set(item)
            .then(success => "")
            .catch(error => "error");
        $log(ret);


    } 
    async function  carica(key){
        let value =undefined;
        let ciao = await afs.collection("users").doc(user)
            .get()
            .then(doc =>{return  doc.data()  } )
            .catch(error => $log("error;.."));
        $log(`key : ${key} ho recuperato la prop :${ciao[key]}`);
        
    }
    function base(){
        if(user ==="" || user ===undefined || afs === undefined) throw new DOMException("kgjds");}
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    async function action(key, callback){
        if (!isFunction(callback)) $log("error! no callback taken")
        let prefValue =  await carica(key);
        console.log(prefValue)

    }
    base();

    return {
        save: save,
        carica:carica,
        caricaAction:action
    }
})


