import React,{useContext} from 'react';
import NoteContext from '../../context/NoteContext';

const NotesItem = (props) => {
    // Grabbing delete function from note context
        const grabbedData = useContext(NoteContext);
        const{deleteNote} = grabbedData;

    // Getting Notes to display as prop from main Notes component
        const{notes,editNote}=props;

  return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="blockquote-footer my-2"><cite>{notes.tag}</cite></p>
                        <p className="card-text">{notes.description}</p>
                        <p className="card-text"><cite>{notes.date}</cite></p>
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color:"#00f75f"}} onClick={()=>{editNote(notes);}}></i>
                        <i className="fa-solid fa-trash-can mx-2" style={{color:"Red"}} onClick={()=>{deleteNote(notes._id);}}></i>
                    </div>
                </div>
            </div>
        </>
  )
}

export default NotesItem;