import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
    const dispatch = useDispatch()

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;


    const activeId = useRef( note.id );

    //Ayudar a cambiar la nota activa evitando un ciclo
    useEffect(() => {
        /*cambiar si y solo si el id 
          de la nota es diferente */
      if ( note.id !== activeId.current ) {
          reset( note );
          activeId.current = note.id    
      }
    }, [note, reset])

    useEffect(() => {
       dispatch( activeNote( formValues.id, {...formValues} ) )
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting( id ) )
    }

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
                        src={ note.url }
                        alt="img_note"
                    />
                </div> )
            }

            <button
                className='btn btn-danger'
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}

export default NoteScreen
