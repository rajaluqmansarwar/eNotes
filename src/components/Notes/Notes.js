import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../../context/NoteContext';
import NotesItem from "../Notes/NotesItem";
import AddNote from './AddNote';
const Notes = (props) => {
  const grabbedNotes = useContext(NoteContext);
  const { notes, getNotes} = grabbedNotes;
  const navigate=useNavigate();

  // For fetching Notes to the home page 
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      
        <div className="mt-5">
            <div className="d-flex">
                <h2>Your Notes</h2>

              {/* Adding Notes */}
                <AddNote showAlert={props.showAlert}/>
            </div>
            {
              notes.length===0 && <div>
                <p><em>You don't have any notes right now</em></p>
              </div>
            }

            {/* Displaying Notes */}
              <div className="row my-3">
                {
                  notes.map((notes) => {
                    return <NotesItem key={notes._id} notes={notes} />
                  })
                }
              </div>
        </div>
    </>
  )
}

export default Notes