import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { firebaseConfig } from "./Firebase.config";

firebase.initializeApp(firebaseConfig);

export const createUserWithEmailAndPassword = (newUser) => {
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            user.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    alert("Email verification is sent successfully");
                });

            user.updateProfile({
                displayName: newUser.fullname
            }).then(() => {
                return user;
            }).catch((error) => {
                // An error occurred
                // ...
            });

            return user;
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
            return user;
        })
        .catch((error) => {
            return error;
        });
}