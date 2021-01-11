
import firebase from "firebase";
import { authConstants } from "./constants";
//import {fireStore} from 'firebase';


export const signup = (user) => {


    return async (dispatch) => {
        const db = firebase.firestore();
        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` })

        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                const correntUser = firebase.auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`;
                correntUser.updateProfile({
                    displayName: name
                }).then(() => {
                    //if you are here it updated successfully
                    db.collection('users')
                    .doc(data.user.uid)
                     .set({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        uid: data.user.uid,
                        createdAt: new Date(),
                        isOnline: true
                    })
                        .then(() => {
                            const loggedInUser = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                uid: data.user.uid,
                                email: user.email
                            }
                            localStorage.setItem('user', JSON.stringify(loggedInUser))
                            console.log('user Logged Successfully');
                            dispatch({
                                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                                payload: { loggedInUser }
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            dispatch({
                                type: `${authConstants.USER_LOGIN}_FAILURE`,
                                payload: { error }
                            })
                        });
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

}

export const signin = (user) => {

    return async dispatch => {
        dispatch({type:`${authConstants.USER_LOGIN}_REQUEST`});
        firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {

             const db = firebase.firestore();
             db.collection('users')
             .doc(data.user.uid)
             .update({
                 isOnline:true
             })
             .then( () => {

                
                console.log(data);
                const name = data.user.displayName.split(" ");
                const firstName = name[0];
                const lastName = name[1];

                const loggedInUser = {
                    firstName,
                    lastName,
                    uid: data.user.uid,
                    email: data.user.email
                }

                localStorage.setItem('user', JSON.stringify(loggedInUser));

                dispatch({
                    type: `${authConstants.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedInUser }
                });



             })
             .catch(error =>{
                 console.log(error);
             })


            }).catch(error => {
                console.log(error);
                dispatch({
                    type: `${authConstants.user}_FAILURE`,
                    payload: { error }
                });
            })

    }

}

export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (user) {
            dispatch({
                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        } else {
            dispatch({
                type: `${authConstants.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login Again ' }
            })
        }

    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstants.USER_LOGOUT}_REQUEST` });

        const db = firebase.firestore();
        db.collection('users')
           .doc(uid)
            .update({
                isOnline: false
            }).then(() => {
                firebase.auth()
                    .signOut()
                    .then(() => {
                        // logout Succesfully
                        localStorage.clear();
                        dispatch({ type: `${authConstants.USER_LOGOUT}_SUCCESS` });

                    })

                    .catch(error => {
                        console.log(error);
                        dispatch({ type: `${authConstants.USER_LOGOUT}_FAILURE`, payload: { error } })
                    })

            }).catch(error => {
                console.log(error);
            })



    }
}