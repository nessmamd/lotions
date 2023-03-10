import React from 'react';
import { useEffect, useState } from "react";

function Adding({ notes, onAddNote }) {
  const bookJSON = localStorage.getItem("1");
  const book = JSON.parse(bookJSON);
  const btitle = book.Title; //why wont it copy the title burvruehguih 
  const bcontent = book.Content;
  const bdate = book.Date; 
  const [formattedContent, setFormattedValue] = useState("");


  
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bcontent, "text/html");
    const unformattedContent = doc.documentElement.textContent;
    setFormattedValue(unformattedContent);
    const shorter_content = unformattedContent.slice(0,19);
  }, [bcontent]); 

  return (
    <div className="app-sidebar">
      <div className="intro">
        <h1>Notes</h1>
        <button onClick={onAddNote} className="adding" id="add">
          &#43;
        </button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div className="app-sidebar-note">
            <div className="sidebar-note-title">
              <strong>{btitle}</strong>
              <small className="note-meta">{bdate}</small>
            </div>
            <p className ="text">{formattedContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adding;
