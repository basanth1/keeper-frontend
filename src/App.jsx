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
  const fetchUserAndNotes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: "include",
      });

      console.log("GET /me status:", res.status);

      if (res.ok) {
        const userData = await res.json();
        console.log("User data:", userData);
        setUser(userData);

        const notesRes = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
          credentials: "include",
        });

        console.log("GET /notes status:", notesRes.status);

        if (notesRes.ok) {
          const notesData = await notesRes.json();
          setNotes(notesData);
        } else {
          console.warn("Failed to fetch notes");
        }

      } else {
        console.warn("User not authenticated");
      }

    } catch (err) {
      console.error("Error during fetch:", err);
    }
  };

  fetchUserAndNotes();
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
