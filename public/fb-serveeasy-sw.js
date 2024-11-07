// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    apiKey: "AIzaSyCPL9iZ9l3E36mXqRbCLHSI1nrrNRi8rbY",
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    authDomain: "serveeasy-project.firebaseapp.com",
    // projectId: process.env.REACT_APP_PROJECT_ID,
    projectId: "serveeasy-project",
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    storageBucket: "serveeasy-project.appspot.com",
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    messagingSenderId: "957283610837",
    // appId: process.env.REACT_APP_APP_ID
    appId: "957283610837:web:72fb42f5851a747fe0f25c"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
