import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        console.log( uid )

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        console.log(doc)

        dispatch( activeMode( doc.id , newNote ) );
    }
}

export const activeMode = ( id, note ) => ({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) )
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, note ) )
        Swal.fire( 'Saved',note.title, 'success')
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload:{
        id, 
        note: {
            id,
            ...note
        }
    }
})