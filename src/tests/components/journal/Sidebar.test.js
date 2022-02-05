import React from "react";
import Sidebar from "../../../components/journal/Sidebar";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { startNewNote } from "../../../actions/notes";
import { startLogout } from "../../../actions/auth";


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}))
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore( middlewares )

const initState = {
    auth:{
        uid:'1',
        name:'MEMO'
    },
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

const wrapper = mount( 
    <Provider store = {store}>
        <MemoryRouter>
            <Sidebar/> 
        </MemoryRouter>
    </Provider>
)

describe('Test on <Sidebar/>', () => {

    test('should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should called the startLogout action', () => {
        wrapper.find('.btn').simulate('click');
        expect( startLogout ).toHaveBeenCalled();
    });

    test('should called the startNewNote action', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });
    
    
});
