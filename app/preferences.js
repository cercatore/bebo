const prefs  = (function( afs, user, $log){
    
    function update (key, value){
		let item = {};
		item[key] = value;
        let ret = afs.collection("users").doc(user).update(item)
            .then(success => "succss")
            .catch(error => "error");
        $log(ret);
    } 

    function save (key, value){
		let item = {};
		item[key] = value;
        let ret = afs.collection("users").doc(user).set(item)
            .then(success => "")
            .catch(error => "error");
        $log(ret);


    } 
    async function  carica(key, sacco){
        let value =undefined;
        let ciao = await afs.collection("users").doc(user)
            .get()
            .then(doc =>{return  doc.data()  } )
            .catch(error => $log("error;.."));
        $log(`key : ${key} ho recuperato la prop :${ciao[key]}`);
        let item = `{"${user}":"${ciao}"}`;
        return ciao[key];
        
    }
    function base(){
        if(user ==="" || user ===undefined || afs === undefined) throw new DOMException("kgjds");}
    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    async function action(key,sacco, callback){
        if (!isFunction(callback)) $log("error! no callback taken")
        let prefValue =  await carica(key, sacco);
        console.log(prefValue)
        callback(prefValue)

    }
    async function loadTutto( scope){
        let value =undefined;
        let item = await afs.collection("users").doc(user)
            .get()
            .then(doc =>{return  doc.data()  } )
            .catch(error => $log("error;.."));
        // $log(`key : ${key} ho recuperato la prop :${ciao[key]}`);
        // let item = `{"${user}":"${ciao}"}`;
            return item;
            scope.$apply()
                }
    base();
    
    return {
        save: save,
        update:update,
        carica:carica,
        caricaAction:action,
        loadTutto:loadTutto
    }
})


