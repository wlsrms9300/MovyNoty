importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA8WVy1SA6m_GjGR71zKRwYI9FiFVjJb-o',
  authDomain: 'movynoty.firebaseapp.com',
  databaseURL: 'https://movynoty.firebaseio.com',
  projectId: 'movynoty',
  storageBucket: 'movynoty.appspot.com',
  messagingSenderId: '197554854962',
  appId: '1:197554854962:web:a34751ecf32d629f4c302b',
  measurementId: 'G-N8C52JL8F6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  var payload = event.data.json();
  const { title, body, icon, click_action } = payload.notification;
  const options = {
    body,
    icon,
    click_action,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');
  console.log(event.notification);
  event.notification.close();

  event.waitUntil(clients.openWindow('https://forthezorba.com'));
});
