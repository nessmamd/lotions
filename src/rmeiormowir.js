import {useEffect, useState} from "react"; 
function Adding({ notes, onAddNote, activeNote, setActiveNote}){
   //use valueActive to loop through.... or that is what activeNote is any
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 
  const [numbers, setNumbers] = useState([]);
  const [sec, setSec] = useState(''); 
  const [bobby, setBobby] = useState('');
  const [date, setDate] = useState('');
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


  useEffect(() =>{
    const storedNumbers = localStorage.getItem('all_IDs');
    if(storedNumbers){
      const parsedNumbers = JSON.parse(storedNumbers);
      setNumbers(parsedNumbers); 
    }
  }, [])

  const numberElements = numbers.map((num) =>{
    const data = localStorage.getItem(num);
    if(data){
      const parsedData = JSON.parse(data); 
      setBobby(parsedData.Title); 
      setSec(parsedData.Content); 
      setDate(parsedData.date); 
    }
 
    return(          
      <div key={num} className={`app-sidebar-note ${num === activeNote && "active"}`} onClick={() => setActiveNote(num)}>      
        <div className="sidebar-note-title">
          <strong>{data ? bobby : 'no element'}</strong>
          <small className="note-meta">{data ? bobby : 'time'}</small>
          <p>{data ? sec: 'nonthing yet'}</p>
        </div>
      </div>
    )
  })

  return (
        <><div className="app-sidebar">
        <div className="intro">
          <h1>Notes</h1>
          <button onClick={onAddNote} className='adding' id='add'>&#43;</button>
        </div>
        <div className="app-sidebar-notes">

        {numbers.map((num) =>{
            const data = localStorage.getItem(num);
            if(data){
              const parsedData = JSON.parse(data); 
              setBobby(parsedData.Title); 
              setSec(parsedData.Content); 
              setDate(parsedData.date); 
            }
        
            return(          
              <div key={num} className={`app-sidebar-note ${num === activeNote && "active"}`} onClick={() => setActiveNote(num)}>      
                <div className="sidebar-note-title">
                  <strong>{data ? bobby : 'no element'}</strong>
                  <small className="note-meta">{data ? bobby : 'time'}</small>
                  <p>{data ? sec: 'nonthing yet'}</p>
                </div>
              </div>
            
            
          )})}

        </div>
      </div>
        </>
    ); 
}
export default Adding; 