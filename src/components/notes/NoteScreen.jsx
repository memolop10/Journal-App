import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeMode } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    const dispatch = useDispatch()

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;


    const activeId = useRef( note.id );

    useEffect(() => {
      if ( note.id !== activeId.current ) {
          reset( note );
          activeId.current = note.id    
      }
    }, [note, reset])

    useEffect(() => {
       dispatch( activeMode( formValues.id, {...formValues} ) )
    }, [formValues, dispatch])

    return (
        <div className="note__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value = { title }
                    onChange = { handleInputChange }
                />

                <textarea 
                    className="notes__textarea"
                    placeholder="What happend today" 
                    cols="30" 
                    rows="10"
                    name="body"
                    value = { body }
                    onChange = { handleInputChange }
                >

                </textarea>
            </div>

            {
                ( note.url ) && (
                <div className="notes__image">
                    <img 
                        src="https://thumbs.dreamstime.com/z/estaci%C3%B3n-de-recreo-resplandor-azul-en-fondo-oscuro-182098130.jpg" 
                        alt="ps5"
                    />
                </div> )
            }

        </div>
    )
}

export default NoteScreen
