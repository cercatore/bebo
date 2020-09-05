importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');



firebase.initializeApp(
  {
    apiKey: "AIzaSyCnfDtTBNv_W66cxLfmitf0oGsJkH49OVg",
    // authDomain: "myall-ada32.firebaseapp.com",
    // databaseURL : "myall-ada32.firebaseio.com",
    // storageBucket : "myall-ada32.appspot.com",
    messagingSenderId : "969428577500",
    projectId:'myall-ada32'
  }
);

const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
worker = worker + 1;
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(worker + '[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.body,
    click_action: "start_Activity_1",
    icon: '/bebo/images/doggo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

messaging.onMessage(function(payload){
  console.log(worker + '##########fore####### received message foreeground');
  const title = "madonna volante";
  return self.registration.showNotification(title, payload.body);
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();
  const promiseChain = clients
      .matchAll({
          type: 'window',
          includeUncontrolled: true
       })
      .then(windowClients => {
          let matchingClient = null;
          for (let i = 0; i < windowClients.length; i++) {
              const windowClient = windowClients[i];
              if (windowClient.url === feClickAction) {
                  matchingClient = windowClient;
                  break;
              }
          }
          if (matchingClient) {
              return matchingClient.focus();
          } else {
              return clients.openWindow(feClickAction);
          }
      });
      event.waitUntil(promiseChain);
});