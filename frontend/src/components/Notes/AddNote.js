import React,{useContext,useState} from 'react';
import NoteContext from '../../context/NoteContext';

const AddNote = (props) => {

    // getting functions from NoteContext
        const grabbedData=useContext(NoteContext);
        const {addNote}=grabbedData;

    // Using state to handle values submitted
        const [note,setNote] = useState({title:"",description:"",tag:"General"})

    // Handling input
        const changeHandler=(e)=>{
            setNote({...note,[e.target.name]:e.target.value});
        }

    // Adding Note by passing input as parameter to context function
        const clickHandler=(e)=>{
            e.preventDefault();
            addNote(note.title,note.description,note.tag);
            setNote({title:"",description:"",tag:"General"})
        }

  return (
    <>
     {/* Add Note Modal */}

      {/* Button trigger modal  */}
      <button  type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        <i className="fa-solid fa-file-circle-plus"> Add Note</i>
      </button>

      {/* Modal  */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel2">Add Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={changeHandler} required minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={changeHandler} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag:</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={changeHandler}
                    minLength={3}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={clickHandler} data-bs-dismiss="modal">Add Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNote