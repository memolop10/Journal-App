import { db } from "../firebase/firebaseConfig"

export const loadNotes = async( uid ) => {
                                        /* path de donde se encuentran las notas
                                          del usuario */
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    console.log(notesSnap)

    notesSnap.forEach( snapHijo => {
        notes.push({
            id:snapHijo.id,
            ...snapHijo.data()
        })
    })
    console.log(notes)

    return notes;
}   