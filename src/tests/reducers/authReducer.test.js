import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Test on authReducer', () => {
    test('should login', () => {
        
        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'MEMO'
            }
        }

        const state = authReducer( initState, action )

        expect(state).toEqual({
            uid:'abc',
            name: 'MEMO'
        })

    })

    test('should logout', () => {
        
        const initState = {
            uid: '4655654584646',
            name: 'memo'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer( initState, action )

        expect(state).toEqual({})

    })

    test('shouldn make changes', () => {
        
        const initState = {
            uid: '4655654584646',
            name: 'memo'
        };

        const action = {
            type: 'abcd'
        }

        const state = authReducer( initState, action )

        expect(state).toEqual(initState)

    })
    
});
