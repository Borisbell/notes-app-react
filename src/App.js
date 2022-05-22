import React from 'react'
import Split from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'nanoid'
import './App.css';

function App() {
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )

  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: 'Type smthng',
    }
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes(prevNotes => prevNotes.map( prevNote => {
      return prevNote.id === currentNoteId 
        ? {...prevNote, body: text}
        : prevNote
    }));
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
      }) || notes[0]
  }

  function clearStorage() {
    console.log(notes);
    setNotes([]);
    localStorage.clear();
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();

    console.log('deleted', noteId)
    setNotes(oldNotes => oldNotes.filter(
      (note) => note.id !== noteId
    ))
  }

  return (
    <>
      {
        notes.length > 0
        ?
      <Split 
        sizes={[30,70]}
        direction='horizontal'
        className='split'
      >
        <Sidebar notes={notes} 
                 currentNote={findCurrentNote()}
                 createNote={createNewNote}
                 setCurrentNoteId={setCurrentNoteId}
                 clearStorage={clearStorage}
                 deleteNote={deleteNote}
                 >  
        </Sidebar>
        { 
          currentNoteId && 
          <Editor findCurrentNote={findCurrentNote()}
                  updateNote={updateNote}>
          </Editor>
        }
      </Split>
      :
      <div className="no-notes">
              <h1>You have no notes</h1>
              <button 
                  className="first-note" 
                  onClick={createNewNote}
              >
                  Create one now
              </button>
      </div>
    }
    </>
  );
}

export default App;
