import './App.css';
import Adding from "./Adding";
import Editt from './Editt';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import React, {useState, useEffect} from "react"; 

function App() {
  const changes = React.createRef(); 
  
  const [clicked, setClicked] = useState(true);
  const [notes, setNotes] = useState([]); //this is to update the words and everything we have
  const [activeNote, setActiveNote] = useState(false); 
  const [highestId, setHighestId] = useState(0);
  const [noteID, setnoteID] = useState(''); 
  const [lest,setID] = useState('');
  const [cons,setCON] = useState(''); 

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
  const [myId, setMyId] = useState([])
 
  //take the activeID and write in it
  const onAddNote = () => {
    const newId = highestId+1; 
    const Note = {
      title: "New Title",
      body: "to be added..",
      lastModified: formattedDate,
      id: newId
    };

    setHighestId(newId); 
    localStorage.setItem('all_IDs', JSON.stringify(myId))
    setNotes([Note, ...notes]); 
    const newItem = Note.id;   
    setMyId([...myId,newItem]);
  }


  useEffect(() => {
    const empty = {'Title': '' , 'ID': '32323232', 'Content': '', 'Date': ''} 
    localStorage.setItem('32323232', JSON.stringify(empty));
  
    const storedIds = JSON.parse(localStorage.getItem('all_IDs'));
    if (storedIds && storedIds.length > 0) {
      const maxId = Math.max(...storedIds);
      setHighestId(maxId);
    }
  }, []);

  const saveNote = (newNote, noteId) => {
    //how to create a note On the side 
    setnoteID(noteID);
    setID(newNote.Tit); 
    setCON(newNote.Con); 
  }
  

  const byeBye = (event) =>{
    event.preventDefault();
    if(clicked === true){
      changes.current.style.display = 'none'; 
      setClicked(false); 
    }
    else{
      changes.current.style.display = 'inline'; 
      setClicked(true); 
    }
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }
  
  //
  return (
        <div className="App">    
                  <div className = "header"> 
                      <button className = 'sidetrip' id = 'sidezz' onClick = {byeBye}>&#8801;</button>
                      <div className = "information">
                          <h1>Lotion </h1> 
                          <h2>Like notion, but worse.</h2>
                      </div>
                  </div>
                <div className = "flexbox-container">
                <div className = "flexbox-item flexbox-item-1" style={{display: 'inline'}} ref = {changes} id = "byebye"> 
                  <Adding notes = {notes} onAddNote = {onAddNote} activeNote = {activeNote} setActiveNote = {setActiveNote} noteS = {noteID} lestS = {lest} conS = {cons}/>
                </div>

                <div className = "flexbox-item flexbox-item-2" id = "rightSide"> 
                  {activeNote ? <Editt key={activeNote.id}  saveNote={saveNote} activeNote={getActiveNote()} notes={notes} setNotes={setNotes}/> : <p className = "message">Select a note, or create a new one.</p>}
                </div>
            </div>
                
        </div>
  );
}

//Pages
//Layout
//

export default App;
