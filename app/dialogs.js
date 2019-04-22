function confirmCallback( button){
    console.log("I AM WORKING");
    console.log("clicked " + button);
}

function dialogConfirm( ticker){
    if ( !ticker || ticker === "") ticker = "so bad day ciaociao";
    navigator
        .notification
        .confirm(
            ticker,
            confirmCallback,
            "EDDIE says",
            ["ok", "no"]


        );
}
