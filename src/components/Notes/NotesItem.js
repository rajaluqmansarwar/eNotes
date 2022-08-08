import React from 'react'

const NotesItem = (props) => {
   
    const{notes}=props

  return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p class="blockquote-footer my-2"><cite>{notes.tag}</cite></p>
                        <p className="card-text">{notes.description}</p>
                        <i className="fa-solid fa-pen-to-square mx-2" style={{color:"#00f75f"}}></i>
                        <i className="fa-solid fa-trash-can mx-2" style={{color:"Red"}}></i>
                    </div>
                </div>
            </div>
        </>
  )
}

export default NotesItem;