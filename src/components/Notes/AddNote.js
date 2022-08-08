import React,{useContext,useState} from 'react';
import NoteContext from '../../context/NoteContext';

const AddNote = () => {
    // getting functions from NoteContext
        const grabbedData=useContext(NoteContext);
        const {addNote}=grabbedData;

    // Using state to handle values submitted
        const [note,setNote] = useState({title:"",description:"",tag:""})
    // Handling input
        const changeHandler=(e)=>{
            setNote({...note,[e.target.name]:e.target.value});
        }
    // Adding Note by passing input as parameter to context function
        const clickHandler=(e)=>{
            e.preventDefault();
            addNote(note.title,note.description,note.tag);
        }
  return (
    <>
        <div className="container my-3">
          <h2>Add Note</h2>
          <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" className="form-control" id="title" name='title' onChange={changeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" className="form-control" id="description" name='description' onChange={changeHandler}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag:</label>
                <input type="text" className="form-control" id="tag" name='tag' onChange={changeHandler}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={clickHandler}>Submit</button>
          </form>
        </div>
    </>
  )
}

export default AddNote