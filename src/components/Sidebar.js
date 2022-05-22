import React from 'react'

function Sidebar(props) {
  const notesList = props.notes.map((note, index) => 
    <div key={note.id}
        className={`title ${
            note.id === props.currentNote.id ? 'selected-note' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
        >
        <h4 className='text-snippet'>{note.body}</h4>
        <button onClick={(event) => props.deleteNote(event, note.id)}>Delete</button>
    </div>)
  return (
    <section >
        <div>
          <h3 className='sidebar__header'>Notes</h3>
          <button className='button' onClick={props.createNote}>Add note</button>
          <button className='button' onClick={props.clearStorage}>Clear</button>
        </div>
        {notesList}
    </section>
  );
}

export default Sidebar;