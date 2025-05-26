import React, { useState } from "react";
function CreateArea({ onAdd }) {
  const [input, setInput] = useState({ title: "", content: "" });
  const [isExpand, setExpand] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    onAdd(input);
    setInput({ title: "", content: "" });
  }

  return (
    <form className="create-note">
      {isExpand && <input name="title" onChange={handleChange} value={input.title} placeholder="Title" />}
      <textarea name="content" onClick={() => setExpand(true)} onChange={handleChange} value={input.content} placeholder="Take a note..." rows={isExpand ? 3 : 1} />
      <button onClick={submit}>&#x2713;</button>
    </form>
  );
}
export default CreateArea;
