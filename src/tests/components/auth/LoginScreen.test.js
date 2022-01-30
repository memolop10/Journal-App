import React from "react";
import LoginScreen from "../../../components/auth/LoginScreen";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";

const middlewares = [thunk];
const mockStore = configureStore( middlewares )

const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
};

let store = mockStore( initState )

const wrapper = mount( 
    <Provider store = {store}>
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
)

describe('Test on <LoginScreen/>', () => {

    beforeEach(() => {
        store = mockStore( initState )
    })
    
    test('<LoginScreen/> should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
});
