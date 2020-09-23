importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');



firebase.initializeApp(
  {
    apiKey: "AIzaSyCnfDtTBNv_W66cxLfmitf0oGsJkH49OVg",
    authDomain: "myall-ada32.firebaseapp.com",
    databaseURL : "myall-ada32.firebaseio.com",
    storageBucket : "myall-ada32.appspot.com",
    messagingSenderId : "969428577500",
    appId: "1:969428577500:web:825a4956530ee068019819"
    
  }
);

const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'baba handler' + payload.title;
  const notificationOptions = {
    body: payload.body,
    click_action: "start_Activity_1",
    icon: (payload.icon ?  payload.icon :'/images/doggo.png'),
    tag: (payload.tag ?  payload.tag :'/images/dashboard_2.png'),
    requireInteraction: true
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
  try{
  const clickedNotification = event.notification; // <-- ptrendo url da qui: event.notifivation.data.url
  clickedNotification.close();
  console.log(clickedNotification)
  }
  catch (err){console.log(err)}
});