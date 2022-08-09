import NoteContext from "../context/NoteContext";
// import axios from 'axios';
import { useState } from "react";

const NoteState=(props)=>{
      const [notes, setNotes] = useState([]);
      const host="http://localhost:5000"  

    //   For getting all Notes from database
        const getNotes= async()=>{
            try {
                const response= await fetch(`${host}/api/note/fetchusernote`,{
                    method:"GET",
                    headers:{"Content-Type":"application/json","auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlY2Y2Yzg2M2E2MGFjNmUxNjc3NjhiIn0sImlhdCI6MTY1OTc3NTE4MX0.yIBuH3WV0JoXpOPOOY_IJI0yNwOpHlrY6zKxpnwQF1M"}
                });
                const fetchedNotes= await response.json();
                console.log(fetchedNotes);
                setNotes(fetchedNotes);
            }
            catch (error) {
                console.log(error);
            }
        }

    // Adding Notes to the database
      const addNote= async (title,description,tag)=>{
            try {
                const response= await fetch(`${host}/api/note/addnote`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json","auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlY2Y2Yzg2M2E2MGFjNmUxNjc3NjhiIn0sImlhdCI6MTY1OTc3NTE4MX0.yIBuH3WV0JoXpOPOOY_IJI0yNwOpHlrY6zKxpnwQF1M"},
                    body: JSON.stringify({title,description,tag})
                })
                const addedNote= await response.json();
                console.log(addedNote);
                getNotes();
            } catch (error) {
                console.log(error);
            }
      }
    
    // Deleting Note By id
          const deleteNote= async (id)=>{
              try {
                  const response= await fetch(`${host}/api/note/deletenote/${id}`,{
                      method:"DELETE",
                      headers:{"Content-Type":"application/json","auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlY2Y2Yzg2M2E2MGFjNmUxNjc3NjhiIn0sImlhdCI6MTY1OTc3NTE4MX0.yIBuH3WV0JoXpOPOOY_IJI0yNwOpHlrY6zKxpnwQF1M"}
                  })
  
                  const deletedNote= await response.json();
                  console.log(deletedNote);
                  getNotes();
                  
              } catch (error) {
                  console.log(error);
              }
  
        }
    //   Updating Note
      const updateNote=async (id,title,description,tag)=>{
        try {
            const response = await fetch(`${host}/api/note/updatenote/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json","auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlY2Y2Yzg2M2E2MGFjNmUxNjc3NjhiIn0sImlhdCI6MTY1OTc3NTE4MX0.yIBuH3WV0JoXpOPOOY_IJI0yNwOpHlrY6zKxpnwQF1M"},
                body: JSON.stringify({title,description,tag})
            })
            const json = await response.json();
            console.log(json);
            getNotes();
        } catch (error) {
            console.log(error);
        }
      }
    return (
            <NoteContext.Provider value={{notes,addNote,updateNote,deleteNote,getNotes,setNotes}}>
                {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;