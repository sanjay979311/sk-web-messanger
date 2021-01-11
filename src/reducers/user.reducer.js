import { userConstants } from "../actions/constants"


const initState = {
 users:[],
 conversation:[]
}

export default (state = initState , action) => {
   // console.log('iiiiiiiiii',action);
    switch(action.type){
       case `${userConstants.GET_REAL_TIME_USERS}_REQUEST`:
           
           break;
        case `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users:action.payload.users
            } 
            
            break;

           case userConstants.GET_REAL_TIME_MESSAGE:
               state = {
                   ...state,
                   conversation:action.payload.conversation
               }
    }

   // console.log('ssssssssssss', state);

    return state;
}

/*
export default (state = initState , action) =>{

    switch(action.type){
        case `${userConstants.GET_REAL_TIME_USERS}__REQUEST`:
            break;
        case `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`:
        case `${userConstants.GET_REAL_TIME_USERS}_SUCCESS`:

            state = {
                ...state,
                users: action.payload.users
            }
                break;   
    }
console.log('state is --------', state);
    return state;

}

*/