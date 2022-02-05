import React from "react";

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom'

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
//para fingir rutas
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { activeNote } from "../../../actions/notes";
import NoteScreen from "../../../components/notes/NoteScreen";


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
            title:'Hola',
            body:'Mundo',
            date: 0
        },
        notes:[]
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store = {store}>
        <MemoryRouter>
            <NoteScreen /> 
        </MemoryRouter>
    </Provider>
)



describe('Test on <NoteScreen/>', () => {
    test('Should display correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch the activeNote action', () => {
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name:'title',
                value:'Hola de Nuevo'
            }
        })

        expect( activeNote ).toHaveBeenLastCalledWith(
            'ABC',
            {
                body:'Mundo',
                title: 'Hola de Nuevo',
                id: 'ABC',
                date: 0
            }
        )
    });
    
    
});
