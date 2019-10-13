/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "926556883368"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const data = payload.data;

  return self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    requireInteraction: true,
    tag: data.tag
  });
});

self.addEventListener("notificationclick", function(event) {
  console.log("On notification click: ", event);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window"
      })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          console.log("client.url", client.url);
          if (client.url == event.notification.tag && "focus" in client)
            return client.focus();
        }
        if (clients.openWindow) {
          return clients.openWindow(event.notification.tag);
        }
      })
  );
});
