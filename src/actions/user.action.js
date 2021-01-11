import firebase from "firebase";
import { userConstants } from "./constants"
//import firebase from "firebase";

export const getRealtimeUsers = (uid) => {
    return async (dispatch) => {
        dispatch({ type: `${userConstants.GET_REAL_TIME_USERS}_REQUEST` });
        const db = firebase.firestore();
        const unsubscribe = db.collection("users")
            //.where("uid", "!=", "CA")
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());

                    }

                });
                // console.log('uuuuuuuuuu',users);
                dispatch({
                    type: `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`,
                    payload: { users }
                });
            });

        return unsubscribe;

    }
}

export const updateMessage = (msgObj) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversation')
            .add({
                ...msgObj,
                isView: false,
                createdAt: new Date(),
            })
            .then((data) => {
                // success
                dispatch({
                    type: userConstants.GET_REAL_TIME_MESSAGE,

                })
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const getRealtimeConverSation = (user) => {
    return async dispatch => {
        const db = firebase.firestore();
        db.collection('conversation')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            //conversation.orderBy('createdAt', 'desc')
            .orderBy("createdAt", "asc")
            .onSnapshot((querySnapshot) => {
                const conversation = [];
                querySnapshot.forEach(doc => {
                    if (
                        (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                        ||
                        (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                    ) {

                        conversation.push(doc.data())
                    }
                      if(conversation.length > 0){
                          dispatch({
                              type:userConstants.GET_REAL_TIME_MESSAGE,
                              payload:{conversation}
                          })
                      }else{
                          dispatch({
                              type:`${userConstants.GET_REAL_TIME_MESSAGE}_FAILURE`,
                              payload:{conversation}
                          })
                      }

                });

                console.log(conversation);
            })
    }
}