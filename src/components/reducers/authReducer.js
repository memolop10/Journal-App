import { types } from "../../types/types";

/*
    {
        uid: '4655654584646',
        name 'memo'
    }

*/

export const authReducer = ( state = {}, action ) => {
    switch (action.type) {
        case types.login:
            return{
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
            case types.logout:
                return { }
    
        default:
            return state;
    }
}