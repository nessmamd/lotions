import {useState,useEffect} from "react"; 
function Adding({ notes, onAddNote, activeNote, setActiveNote }){
  const [IDX, setIdX] = useState([])
  const IDa = localStorage.getItem('all_IDS'); 
  if(IDa){
    const x = JSON.parse(IDa);
    setIdX(x); 
  }
  const dict = {};

  for (const index of IDX) {
    const bookJSON = localStorage.getItem(index);
    if (bookJSON) {
      const book = JSON.parse(bookJSON);
      dict[index] = {
        title: book.Title,
        content: book.Content,
        date: book.Date
      };
    }
  }


  return (
        <><div className="app-sidebar">
        <div className="intro">
          <h1>Notes</h1>
          <button onClick={onAddNote} className='adding' id='add'>&#43;</button>
        </div>
        <div className="app-sidebar-notes">

        {Object.keys(notes).map((key) => {
            const note = notes[key];
            return (
              <div key={key} className={`app-sidebar-note ${key === activeNote && "active"}`} onClick={() => setActiveNote(key)}>
                <div className="sidebar-note-title">
                  <strong>{note.Title}</strong>
                  <small className="note-meta">{note.Date}</small>
                </div>
                <p>{note.Content}</p>
              </div>
              );
            })}
        </div>
      </div>
        </>
    ); 
}
export default Adding; 