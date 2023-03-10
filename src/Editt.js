import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// try chanigng it to a class if this dosent work
function Editt({ activeNote, toDelete, saveNote, notes, setNotes }) {
    /* const onEditField = (key, value) => {
         const note = JSON.parse(localStorage.getItem(activeNote.id))
         onUpdateNote({
             id: activeNote.id, 
             [key] : value, 
             lastMoified: note.Date
         })
     }; */

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const [value, setValue] = useState('');
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [dictTitle, setdictTitle] = useState('');
    const formRef = useRef(null);
    const textboxRef = React.createRef();
    const [TEXT, sendingText] = useState('');
    const madeTextRef = React.createRef();
    const currentDate = new Date().toLocaleString("en-US", options);
    const starter = new Date().toISOString().slice(0, 16);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedStuff, setdictStuff] = useState(TEXT);
    const timeEdit = React.createRef();
    const timeFinal = React.createRef();
    const titleEnter = React.createRef();
    const finalTitle = React.createRef();

    const handleDateChange = (event) => {
        const news = new Date(event.target.value).toLocaleString("en-US", options); //this is to format it so it looks nice
        setSelectedDate(news); //everytime it is pressed etc
        //when this is pressed than it gets rid of the current time and date the date changes fully
    }

    const handleTitle = (event) => {
        event.preventDefault();
        titleEnter.current.style.display = 'none';
        finalTitle.current.style.display = 'inline';
    }

    const handleDeleteNote = (idToDelete) => {
        const answer = window.confirm("Are you sure?");
        if (answer){
            localStorage.removeItem(idToDelete);
        }
            
    }

    const handleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value); //this adds to the title value
    }
    useEffect(() => {
        const data = localStorage.getItem(activeNote.id);
        if (data) {
            const parsedData = JSON.parse(data);
            setTitle(parsedData.Title);
            setValue(parsedData.Content);

        }
        else {
            setValue('');
            setTitle('new title');
        }
    }, [activeNote]);

    // const sendToDelete(){

    //}
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            setEditing(false);
            textboxRef.current.style.display = 'inline';
            madeTextRef.current.style.display = 'none';
            timeEdit.current.style.display = 'inline';
            timeFinal.current.style.display = 'none';


        } else {
            setEditing(true);
            textboxRef.current.style.display = 'none';
            madeTextRef.current.style.display = 'inline';
            timeEdit.current.style.display = 'none';
            timeFinal.current.style.display = 'inline';
            setdictTitle(title);
        }
        //find its contents 
        const note = JSON.parse(localStorage.getItem(activeNote.id));
        const n = { Tit: note.Title, Cont: note.Content, Date: note.currentDate }
        saveNote(n, activeNote.id);
    }

    const reEdit = (event) => {
        event.preventDefault();
        titleEnter.current.style.display = 'inline';
        finalTitle.current.style.display = 'none';
        setTitle(event.target.value);
    }


    useEffect(() => {
        const formattedValue = value.replace(/\n/g, '<br>');
        sendingText(formattedValue);
        document.querySelector('.value').innerHTML = formattedValue;
        const books = {
            'Title': title,
            'ID': activeNote.id,
            'Content': TEXT,
            'Date': currentDate
        };
        localStorage.setItem(activeNote.id.toString(), JSON.stringify(books));

        const data = localStorage.getItem(activeNote.id);
        if (data) {
            const parsedData = JSON.parse(data);
            setdictTitle(parsedData.Title);
            setdictStuff(parsedData.Content);

        }
    }, [value, activeNote.id, dictTitle]);

    //you need the notes id that it is on ....

    return (
        <>
            <div className="first">
                <div className="bar">
                    <form onSubmit={handleTitle}>
                        <div className="title">
                            <input divClass="edit_title" style={{ display: "inline" }} ref={titleEnter} type="text" onChange={handleChange} value={title}></input>
                            <div className="final_title" style={{ display: "none" }} ref={finalTitle} onClick={reEdit}>
                                <h1>{title}</h1>
                            </div>

                            <input style={{ display: "inline" }} defaultValue={starter} ref={timeEdit} type="datetime-local" onChange={handleDateChange} />

                            <div className="Creation" style={{ display: "none" }} ref={timeFinal} >
                                <p>{selectedDate}</p>
                            </div>

                        </div>
                    </form>
                    <form className="first" onSubmit={handleSubmit} ref={formRef}>
                        <div className="bb">
                            <button type="button" className="cc" onClick={() => handleDeleteNote(activeNote.id)}> Delete</button>
                            <input type="submit" className="cc" value={isEditing ? 'Edit' : 'Save'} />
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div className="text-editor" style={{ display: "inline" }} ref={textboxRef}>
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
                <div className="value" style={{ display: "none" }} ref={madeTextRef}>
                </div>
            </div>
        </>
    );
}

export default Editt;