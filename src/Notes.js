import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editt from './Editt';

class Notes extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {value: '', isEditing: false, title: ''};  //this is like an argument passing
        this.textboxRef = React.createRef();
        this.madeTextRef = React.createRef();
        this.showingTitle = React.createRef();
        this.titleName = React.createRef(); 
        //this is the binding step
        this.assignment = this.assignment.bind(this); //this is so you can use it in another function
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.title = this.title.bind(this); 
    }

    assignment(event){
        //this is the moment you start typing
        this.setState({value: event.target.value}); 
    }

    title(event){
        this.setState({title: event.target.value})
    }

    updateValue = (newValue) => {
        this.setState({ value: newValue });
      }
      
    handleTitle = (event) =>{
        event.preventDefault()
        if(event.key == 'Enter'){
            this.titleName.current.style.display = 'inline';
            this.showingTitle.current.style.display = 'none';  
        }
        else {
            this.titleName.current.style.display = 'none';
            this.showingTitle.current.style.display = 'inline';  
        }  
    }

    handleSubmit = (event) => {
        event.preventDefault()
         //..do we want it to reload or not?
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
            this.textboxRef.current.style.display = 'inline';
            this.madeTextRef.current.style.display = 'none'; 


          } else {
            this.setState({ isEditing: true });
            this.textboxRef.current.style.display = 'none';
            this.madeTextRef.current.style.display = 'inline'; 
          }  

    }

    render(){
        return(
            
            <><form className="first" onSubmit={this.handleTitle}>
            
                <div className="bar">
                    <div className="title">
                        <input type="text" className="h" value={this.state.title} onChange={this.title} style={{ display: "inline" }} ref = {this.titleName}/>
                    <div className = "showingTitle" style = {{display: "none"}} ref = {this.showingTitle}>
                            <p>{this.state.title}</p>
                    </div>
                        <p>date 📅</p>
                    </div>
                  
                    <div className="bb">
                        <button type="button" className="cc">Delete</button>
                        <input type="submit" className="cc" value={this.state.isEditing ? 'Edit' : 'Save'} />
                    </div>
                </div>
            </form>
            <form className = "second" onSubmit={this.handleSubmit}>
                    <div className="textbox" style={{ display: "inline" }}>
                    </div>
                    <div className="madeText" style={{ display: "none" }} ref={this.madeTextRef}>
                        <p>{this.state.value}</p>
                    </div>
                    
                </form></>
        ); 
    }
} 
export default Notes; 

