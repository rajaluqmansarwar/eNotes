import NoteContext from "../context/NoteContext";
import axios from 'axios';
import { useState } from "react";

const NoteState=(props)=>{
      const [notes, setNotes] = useState([]);
      const host="http://localhost:5000"  
    //   For getting all Notes from database
        const getNotes= async()=>{
            try {
                const response = await axios({
                    method:"GET",
                    url:`${host}/api/note/fetchusernote`,
                    headers:{"Content-Type":"application/json","auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlY2Y2Yzg2M2E2MGFjNmUxNjc3NjhiIn0sImlhdCI6MTY1OTc3NTE4MX0.yIBuH3WV0JoXpOPOOY_IJI0yNwOpHlrY6zKxpnwQF1M"}
                });
                const data= response.json();
                console.log(data);
                // setNotes(json);
            }
            catch (error) {
                console.log(error);
            }
        }

      const addNote=(title,description,tag)=>{
         const   notesDummy2={
                "_id": "62efacda602b311d5ed3e80e",
                "user": "62ecf6c863a60ac6e167768b",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2022-08-07T12:15:22.481Z",
                "__v": 0
            }
        setNotes(notes.concat(notesDummy2));
      }
      const updateNote=()=>{

      }
      const deleteNote=()=>{

      }
    return (
            <NoteContext.Provider value={{notes,addNote,updateNote,deleteNote,getNotes}}>
                {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;