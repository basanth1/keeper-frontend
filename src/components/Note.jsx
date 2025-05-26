import React from "react";
function Note({ id, title, content, ondelete }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => ondelete(id)}>delete</button>
    </div>
  );
}
export default Note;
