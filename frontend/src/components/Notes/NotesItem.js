import React,{useContext, useState, useRef} from 'react';
import NoteContext from '../../context/NoteContext';

const NotesItem = (props) => {
    // For pointing towards refrence point i.e (hidden button in this case)
    const ref= useRef(null);

    // Grabbing delete function from note context
        const grabbedData = useContext(NoteContext);
        const{deleteNote,updateNote} = grabbedData;

    // Getting Notes to display as prop from main Notes component
        const{notes}=props;

    // Using state to handle values submitted
    const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"General"})

    // Handling input
      const changeHandler=(e)=>{
          setNote({...note,[e.target.name]:e.target.value});
      }

    // Adding Note by passing input as parameter to context function
      const clickHandler=(e)=>{
          e.preventDefault();
          updateNote(note.id,note.etitle,note.edescription,note.etag);
      }
  
    // Editing Note
      const editNoteModal=(noteToEdit)=>{
            ref.current.click();
            setNote({id:noteToEdit._id,etitle:noteToEdit.title,edescription:noteToEdit.description,etag:noteToEdit.tag});
            
      }
  return (
        <>
            {/* Edit Modal */}
      {/* Button trigger modal  */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title:</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={changeHandler}  required minLength={3}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description:</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={changeHandler} required minLength={5} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag:</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={changeHandler} minLength={5} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5} type="submit" className="btn btn-primary" onClick={clickHandler} data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>

            {/* Displaying Notes */}
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="blockquote-footer my-2"><cite>{notes.tag}</cite></p>
                        <p className="card-text">{notes.description}</p>
                        <p className="card-text"><cite>{notes.date}</cite></p>
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color:"#00f75f"}} onClick={()=>{editNoteModal(notes);}}></i>
                        <i className="fa-solid fa-trash-can mx-2" style={{color:"Red"}} onClick={()=>{deleteNote(notes._id);}}></i>
                    </div>
                </div>
            </div>
        </>
  )
}

export default NotesItem;