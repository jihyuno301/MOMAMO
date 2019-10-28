'use strict';

import * as firebase from "firebase";

const functions = require('firebase-functions');
const admin =  require('firebase-admin');
admin.initializeApp();

const tokens = ['cTPM4jo_aMQfhdTRjwKJBO:APA91bEYq5AK6_nnrTpfAQz12UsUGiBDQO62nU6prBi48iH4SzJxn3l7ThEKzrpioYTz3SEoHUKSWrbJrslilPxqCJeuWFH83m9_D5f00GFVK4tzOjdKThq7HWGF_4fOe7hj2AkGbmYQ',
    'cTPM4jo_aMQfhdTRjwKJBO:APA91bEYq5AK6_nnrTpfAQz12UsUGiBDQO62nU6prBi48iH4SzJxn3l7ThEKzrpioYTz3SEoHUKSWrbJrslilPxqCJeuWFH83m9_D5f00GFVK4tzOjdKThq7HWGF_4fOe7hj2AkGbmYQ'];

/* Get a reference to the database service */
const database = firebase.database();


/**
 * Triggers when a user gets a new follower and sends a notification.
 *
 * Followers add a flag to `/followers/{followedUid}/{followerUid}`.
 * Users save their device notification tokens to `/users/{followedUid}/notificationTokens/{notificationToken}`.
 */
exports.sendToDeviceNotification = functions.database.ref('/infonotification-ba4cc/general_info/{bar}')
    .onWrite(event => {
        // Notifications details
        const payload = {
            notification: {
                title : 'SendToDevice Test',
                body: 'This is send to device test'
            }
        };

        return admin.messaging().sendToDevice(tokens, payload);
    });

