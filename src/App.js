import { useEffect, useState } from "react";
import NotesList from "./components/NotesList";
import {nanoid} from 'nanoid';
import Search from "./components/Search";
import Header from "./components/Header";

const App = () =>{
  const [notes,setNotes]=useState([
    {
      id :nanoid(),
      text:"This is my first Note",
      date:"15/08/2022"
    },
    {
      id :nanoid(),
      text:"This is my Second Note",
      date:"16/08/2022"
    },
    {
      id :nanoid(),
      text:"This is my Third Note",
      date:"17/08/2022"
    },
    {
      id :nanoid(),
      text:"This is my Fourth Note",
      date:"18/08/2022"
    }
])
const [searchText,setSearchText]=useState('')

useEffect(()=>{
  const savedNote=JSON.parse(localStorage.getItem('react-notes-app-data'))
  if(savedNote){
    setNotes(savedNote)
  }
},[])

useEffect(()=>{
  localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
},[notes])

const addNote=(text)=>{
  const date=new Date();
  const newNote={
    id:nanoid(),
    text:text,
    date:date.toLocaleDateString(),
  }
  const newNotes=[...notes,newNote]
  setNotes(newNotes)
}
const deleteNote=(id)=>{
  const newNotes=notes.filter((note)=>note.id!==id);
  setNotes(newNotes);
}
  return <div className="container">
    <Header />
    <Search handleSearchNote={setSearchText} />
    <NotesList notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText.toLowerCase()))} handleAddNote={addNote}
      handleDeleteNote={deleteNote}/>
  </div>
}


export default App;