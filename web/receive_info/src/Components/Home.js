import React, {Component} from 'react';
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

const messaging = firebase.messaging();

// FCM에 permission요청하고 token발급하기
messaging
    .requestPermission()
    .then(() => {
        console.log("Have Permission");
        return messaging.getToken();
    })
    .then(token => {
        console.log("FCM Token:", token);
        //you probably want to send your new found FCM token to the
        //application server so that they can send any push
        //notification to you.
    })
    .catch(error => {
        if (error.code === "messaging/permission-blocked") {
            console.log("Please Unblock Notification Request Manually");
        } else {
            console.log("Error Occurred", error);
        }
    });
// messaging.onTokenRefresh(function() {
//     messaging.getToken()
//         .then(function(refreshedToken) {
//             console.log(refreshedToken);
//             console.log('Token refreshed.');
//         })
//         .catch(function(err) {
//             console.log('Unable to retrieve refreshed token ', err);
//         });
// });

// 앱이 포그라운드 상태일 때, 즉 사용자가 현재 웹페이지를 보고 있을 때는
// 데이터 및 알림 페이로드를 페이지에서 직접 수신할 수 있다.
messaging.onMessage((payload) => {
    console.log('Message received1. ', payload.notification.title);
    console.log('Message received2. ', payload.notification.body);
});

// POST형태의 request를 보낸다.
const option = {
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send', //FCM서버의 주소
    json: {
        'to': 'cTPM4jo_aMQfhdTRjwKJBO:APA91bEYq5AK6_nnrTpfAQz12UsUGiBDQO62nU6prBi48iH4SzJxn3l7ThEKzrpioYTz3SEoHUKSWrbJrslilPxqCJeuWFH83m9_D5f00GFVK4tzOjdKThq7HWGF_4fOe7hj2AkGbmYQ\n',
        'notification': {
            'title': 'hello',
            'body': 'world!',
        }
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAAC3eTuzA:APA91bF_pfnKZ0-4OHa1NEYSBX7SrIyb8TR1rApRoxGMtZgOPOVFpEKEz7jaRBj3UiQYFk8MhIC317-106lcSdJTDAThSChZGkz8SBxveax1lK21HBH3_OEjwT_qJfoy_-NVEQ6ktQ5L\n' +
            '\n'
    }
}
class Home extends Component {

    render() {

        return (
            <div >
                {option.json.notification.title}
                {option.json.notification.body}
            </div>
        );
    }
}

export default Home;