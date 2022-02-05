import React from "react";
import LoginScreen from "../../../components/auth/LoginScreen";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

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
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
)

describe('Test on <LoginScreen/>', () => {

    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    })
    
    test('<LoginScreen/> should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('should dispatch the startGoogleLogin action', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('should dispatch the startLoginEmailPassword action with its arguments', () => {
        const email ='inglopezvargas@gmail.com'
        const password = '112354'
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLoginEmailPassword ).toHaveBeenCalledWith( email, password);
    });
    
    
});
