import React, {useContext, useEffect} from 'react'
import NoteContext from '../../context/NoteContext';
import NotesItem from "../Notes/NotesItem";
import AddNote from './AddNote';
const Notes = () => {
    const grabbedNotes=useContext(NoteContext);
    const {notes,getNotes}=grabbedNotes;
    useEffect(() => {
      getNotes();
    }, )
    
  return (
        <>
            <AddNote/>
            <h2>Your Notes</h2>
            <div className="row my-3">
                    {
                        notes.map((notes)=>{
                        return  <NotesItem key={notes._id} notes={notes}/>
                        })
                    }
            </div>
        </>
  )
}

export default Notes