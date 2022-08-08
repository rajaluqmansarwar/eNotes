import NoteContext from "../context/NoteContext";

const NoteState=(props)=>{
    return (
            <NoteContext.Provider value={{}}>
                {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;