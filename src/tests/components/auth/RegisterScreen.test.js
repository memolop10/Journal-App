import React from "react";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import RegisterScreen from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore( middlewares )

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
};

let store = mockStore( initState );
// store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store = {store}>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
)

describe('Test on <RegisterScreen/>', () => {
    test('should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('shoul dispatch corresponding action', () => {
        
        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change',{
            target:{
                value:'',
                name:'email'
            }
        })

        wrapper.find('form').simulate('submit',{
            preventDefault(){}
        })

        const actions = store.getActions();
        
        expect( actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        })
    });

    test('should display the alert with the error', () => {
        const initState = {
            auth:{},
            ui:{
                loading: false,
                msgError: 'email no es correcto'
            }
        };
        
        const store = mockStore( initState );
        
        const wrapper = mount( 
            <Provider store = {store}>
                <MemoryRouter>
                    <RegisterScreen/> 
                </MemoryRouter>
            </Provider>
        )

        expect(wrapper.find( '.auth__alert-error' ).exists()).toBe( true );
        expect( wrapper.find( '.auth__alert-error' ).text().trim() ).toBe( initState.ui.msgError );
    });
    
    
});
