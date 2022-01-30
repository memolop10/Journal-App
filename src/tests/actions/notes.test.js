import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes'
import { db } from '../../firebase/firebaseConfig'
import { fileUpload } from '../../helpers/fileUpload'
import { types } from '../../types/types'

jest.mock('../../helpers/fileUpload', () =>({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
        //return Promise.resolve('https://hola-mundo.com/cosa.jpg')
    })
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = mockStore({
    auth: {
        uid:'TESTING'
    },

    notes:{
        id:'Nj8KyyGV2lBWu4vJk59h',
        title: 'Hola',
        body: 'Mundo'
    }
})

let store = mockStore(initState)


describe('Test on notes-actions', () => {
    beforeEach( () => {
        store = mockStore( initState )
    })

    test('should create a new note startNewNote', async() => {
        await store.dispatch( startNewNote() )

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }

        })

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        })

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();
    })


    test('startLoadingNotes should load the notes ', async() => {
        await store.dispatch( startLoadingNotes('TESTING') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(String)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    })
    
    test('startSaveNote should update the note', async() => {
        
        const note = {
            id: 'Nj8KyyGV2lBWu4vJk59h',
            title: 'titulo',
            body: 'Nota de prueba'
        }

        await dispatch( startSaveNote( note ) );

        const actions = store.getActions();
        
        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );
    });
    
    test('startUploading should update the url entry', async() => {
        
        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc('/TESTING/journal/notes/Nj8KyyGV2lBWu4vJk59h').get();

        expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg')
    });
    
});
