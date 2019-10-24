importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCYBhCWVsxjFR75SfWnNNEHRBVzhVaPKbE",
    authDomain: "infonotification-ba4cc.firebaseapp.com",
    databaseURL: "https://infonotification-ba4cc.firebaseio.com",
    projectId: "infonotification-ba4cc",
    storageBucket: "infonotification-ba4cc.appspot.com",
    messagingSenderId: "49250810672",
    appId: "1:49250810672:web:e3adf5719359453d1466f5",
    measurementId: "G-RFF4GNLKSS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// 메시지가 service worker안에 있으므로 거기서 읽은 후 SDK를 사용
// 푸시메시지를 받을 때는 이미 작동중
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
    const title  =  payload.notification.title;
    const options  = {
        body: payload.notification.body,
    };
    return self.registration.showNotification(title, options);
})
// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };
//
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });