import React,{useContext,useState} from 'react';
import NoteContext from '../../context/NoteContext';

const AddNote = () => {

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
        <div className="container my-3">
          <h2>Add Note</h2>
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
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={clickHandler}>Add Note</button>
          </form>
        </div>
    </>
  )
}

export default AddNote