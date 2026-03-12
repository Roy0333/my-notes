import { useRef } from "react";

function Editor() {
  const editorRef = useRef(null);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const setHeading = (tag) => {
    document.execCommand("formatBlock", false, tag);
  };

  const addImage = () => {
    const url = prompt("Enter Image URL");
    if (url) format("insertImage", url);
  };

  const addAnnotation = () => {
    const note = prompt("Enter annotation");
    if (!note) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const span = document.createElement("span");
    span.style.background = "yellow";
    span.title = note;

    span.appendChild(range.extractContents());
    range.insertNode(span);
  };

  const setFontSize = (size) => {
    document.execCommand("fontSize", false, size);
  };

  return (
    <div className="h-full m-auto">
      {/* Toolbar */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {/* Basic */}
        <button onClick={() => format("bold")}>Bold</button>
        <button onClick={() => format("italic")}>Italic</button>
        <button onClick={() => format("underline")}>Underline</button>

        {/* Headings */}
        <button onClick={() => setHeading("h1")}>H1</button>
        <button onClick={() => setHeading("h2")}>H2</button>
        <button onClick={() => setHeading("h3")}>H3</button>
        <button onClick={() => setHeading("p")}>P</button>

        {/* Font Size */}
        <select onChange={(e) => setFontSize(e.target.value)}>
          <option value="">Font Size</option>
          <option value="2">Small</option>
          <option value="3">Default</option>
          <option value="5">Large</option>
          <option value="6">Extra Large</option>
        </select>

        {/* Font Family */}
        <select onChange={(e) => format("fontName", e.target.value)}>
          <option value="">Font</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier</option>
          <option value="Times New Roman">Times</option>
        </select>

        {/* Colors */}
        <input
          type="color"
          onChange={(e) => format("foreColor", e.target.value)}
        />

        <input
          type="color"
          onChange={(e) => format("hiliteColor", e.target.value)}
        />

        {/* Image */}
        <button onClick={addImage}>Image</button>

        {/* Annotation */}
        <button onClick={addAnnotation}>Annotate</button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="h-full p-3"
        style={{
          fontFamily: "Arial",
        }}
      />
    </div>
  );
}

export default Editor;
