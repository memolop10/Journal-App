import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    return (
        <div className="note__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea 
                    className="notes__textarea"
                    placeholder="What happend today" 
                    cols="30" 
                    rows="10"
                >

                </textarea>
            </div>

            <div className="notes__image">
                <img 
                    src="https://thumbs.dreamstime.com/z/estaci%C3%B3n-de-recreo-resplandor-azul-en-fondo-oscuro-182098130.jpg" 
                    alt="ps5"
                />
            </div>

        </div>
    )
}

export default NoteScreen
