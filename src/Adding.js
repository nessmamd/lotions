import {useState} from "react"; 
function Adding({ notes, onAddNote, activeNote, setActiveNote, noteS, lestS, conS }){
   //use valueActive to loop through.... or that is what activeNote is anywyas but try
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 
  const getNoteData = (note) => {
    const data = localStorage.getItem(note.id);
    if (data) {
      const parsedData = JSON.parse(data);
      setTitle(parsedData.title);
      body(parsedData.body);
    }
    setTitle('Title'); 
    setBody('Content not found'); 
  } // right it should just automatically be updated...? 

  return (
        <><div className="app-sidebar">
        <div className="intro">
          <h1>Notes</h1>
          <button onClick={onAddNote} className='adding' id='add'>&#43;</button>
        </div>
        <div className="app-sidebar-notes">

        {notes.map((note) => {
          return (
            <div
              key={note.id}
              className={`app-sidebar-note ${note.id === activeNote ? "active" : ""}`} onClick={() => setActiveNote(note.id)}>
              <div className="sidebar-note-title">
                <strong>{lestS}</strong>
                <small className="note-meta">{note.lastModified}</small>
              </div>
              <p dangerouslySetInnerHTML={{ __html: conS }}></p>
            </div>
          );
        })}

        </div>
      </div>
        </>
    ); 
}
export default Adding; 