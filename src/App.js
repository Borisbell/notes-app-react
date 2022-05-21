import React from 'react'
import Split from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import { nanoid } from 'nanoid'
import './App.css';

function App() {
  const [notes, setNotes] = React.useState([{id: nanoid(), body:'text'}]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ''
  )

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

  return (
    <Split 
      sizes={[30,70]}
      direction='horizontal'
      className='split'
    >
      <Sidebar notes={notes} 
               currentNote={findCurrentNote()}
               createNote={createNewNote}
               setCurrentNoteId={setCurrentNoteId}>
      </Sidebar>
      { 
        currentNoteId && 
        <Editor findCurrentNote={findCurrentNote()}
              updateNote={updateNote}>
        </Editor>
      }
    </Split>
  );
}

export default App;
