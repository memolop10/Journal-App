import React from "react";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'
import { firebase } from "../../firebase/firebaseConfig";
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../actions/auth";
import AppRouter from "../../routers/AppRouter";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))
jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}))
const middlewares = [thunk];
const mockStore = configureStore( middlewares )

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        active:{
            id:'ABC',
        },
        notes:[]
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();



describe('Test on <AppRouter/>', () => {
    test('Should call the login if Im authenticated', async() => {
        
        let user;

        await act(async() => {
            
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com','123456');
            user = userCred.user;

            const wrapper = mount( 
                <Provider store = {store}>
                    <MemoryRouter>
                        <AppRouter/> 
                    </MemoryRouter>
                </Provider>
            )
        })

        expect( login ).toHaveBeenCalledWith('MatA87LtTLc9Z5SRkrqgrHep5Xl1',null);
    });
    
});
