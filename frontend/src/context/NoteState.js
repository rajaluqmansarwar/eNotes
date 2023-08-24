import NoteContext from "../context/NoteContext";
// import axios from 'axios';
import { useState } from "react";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:5000";

  //   For getting all Notes from database
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/note/fetchusernote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const fetchedNotes = await response.json();
      console.log(fetchedNotes);
      setNotes(fetchedNotes);
    } catch (error) {
      console.log(error);
      props.showAlert(`An error occured`, "danger");
    }
  };

  // Adding Notes to the database
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const addedNote = await response.json();
      console.log(addedNote);
      props.showAlert(`Note Added`, "success");
      getNotes();
    } catch (error) {
      console.log(error);
      props.showAlert(`An error occured`, "danger");
    }
  };

  // Deleting Note By id
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const deletedNote = await response.json();
      console.log(deletedNote);
      props.showAlert(`Note Deleted`, "success");
      getNotes();
    } catch (error) {
      console.log(error);
      props.showAlert(`An error occured`, "danger");
    }
  };
  //   Updating Note
  const updateNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);
      props.showAlert(`Note Updated`, "success");
      getNotes();
    } catch (error) {
      console.log(error);
      props.showAlert(`An error occured`, "danger");
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNotes, setNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
