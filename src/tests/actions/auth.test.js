import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'


const middlewares = [thunk];
const mockStore = configureStore( middlewares )

const initState = {};

let store = mockStore( initState )

describe('Test on auth actions', () => {

    beforeEach(() => {
        store = mockStore( initState )
    })

    test('login and logout should create the respective action', () => {
        
        const uid = '123456'
        const displayName = 'memo'
        const loginAction = login(uid, displayName)
        const logoutAction = logout()

        expect( loginAction ).toEqual({
            type: types.login,
            payload:{
                uid,
                displayName
            }
        })

        expect( logoutAction ).toEqual({
            type: types.logout
        })

    });

    test('should do the startLogout', async() => {
        await store.dispatch( startLogout() )

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.logout
        })

        expect( actions[0] ).toEqual({
            type: types.notesLogoutCleaning
        })
    });

    
    test('should start the startLoginEmailPassword', async() => {
        await store.dispatch( startLoginEmailPassword('test@testing.com','123456') )
        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload:{
                uid:'MatA87LtTLc9Z5SRkrqgrHep5Xl1',
                displayName: null
            }
        })
    });
    
    
});
