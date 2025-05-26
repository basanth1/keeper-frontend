import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/me`, { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          fetch(`${import.meta.env.VITE_API_URL}/notes`, { credentials: "include" })
            .then(res => res.json())
            .then(setNotes);
        }
      });
  }, []);

  function addNote(note) {
    fetch(`${import.meta.env.VITE_API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(note)
    })
      .then(() => setNotes(prev => [...prev, note]));
  }

  function deleteNote(id) {
    console.log("Deleting note with ID:", id);
    fetch(`${import.meta.env.VITE_API_URL}/delete/${id}`, {
      method: "DELETE",
      credentials: "include"
    }).then(() => setNotes(prev => prev.filter(note => note.id !== id)));
  }

  if (!user) return <Login />;

  return (
    <div>
      <Header user={user} />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          ondelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
