import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { firebaseConfig } from "./Firebase.config";

export const initializeFirebaseAppFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const createUserWithEmailAndPassword = (newUser) => {
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            // Signed in 

            // const user = userCredential.user;
            // user.sendEmailVerification()
            //     .then(() => {
            //         // Email verification sent!
            //         alert("Email verification is sent successfully");
            //     });

            // console.log(user);
            userCredential.user.updateProfile({
                displayName: newUser.fullname
            }).then(() => {
                // console.log(user);
            }).catch((error) => {
                // An error occurred
                // ...
            });

            return userCredential.user;
            // return signInWithEmailAndPassword(newUser);
        })
        .catch((error) => {
            return error;
        });
}


export const signInWithEmailAndPassword = user => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // if (user.emailVerified) {
            //     return user;
            // }
            // else {
            //     user.sendEmailVerification()
            //         .then(() => {
            //             // Email verification sent!
            //             const isVerified = false;
            //             return isVerified;
            //         });
            // }
            console.log(user);
            return user;
        })
        .catch((error) => {
            return error;
        });
}

export const setIdToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        // Send token to your backend via HTTPS
        // ...
        sessionStorage.setItem('idToken', idToken);
    }).catch(function (error) {
        console.log('idToken error' + error);
        // Handle error
    });
}