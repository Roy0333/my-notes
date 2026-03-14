import { useRef, useState, useEffect } from "react";
import {
  Bold,
  Quote,
  ImageUp,
  ListOrdered,
  List,
  Type,
  Heading3,
  Heading2,
  Heading1,
  Underline,
  Italic,
} from "lucide-react";

function Editor() {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRange = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [annotationText, setAnnotationText] = useState("");

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    h1: false,
    h2: false,
    h3: false,
  });

  // Save selection
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      savedRange.current = selection.getRangeAt(0);
    }

    updateToolbarState();
  };

  // Restore selection
  const restoreSelection = () => {
    if (!savedRange.current) return;

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange.current);
  };

  // Execute formatting
  const exec = (command, value = null) => {
    restoreSelection();
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateToolbarState();
  };

  // Headings
  const setHeading = (tag) => {
    restoreSelection();
    document.execCommand("formatBlock", false, tag);
    editorRef.current.focus();
    updateToolbarState();
  };

  // Detect active formatting
  const updateToolbarState = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      ul: document.queryCommandState("insertUnorderedList"),
      ol: document.queryCommandState("insertOrderedList"),
      h1: document.queryCommandValue("formatBlock") === "h1",
      h2: document.queryCommandValue("formatBlock") === "h2",
      h3: document.queryCommandValue("formatBlock") === "h3",
    });
  };

  // Upload image
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      exec("insertImage", event.target.result);
    };

    reader.readAsDataURL(file);
  };

  // Annotation modal
  const openAnnotationModal = () => {
    saveSelection();
    setShowModal(true);
  };

  const addAnnotation = () => {
    if (!savedRange.current) return;

    restoreSelection();

    const span = document.createElement("span");
    span.style.background = "yellow";
    span.style.cursor = "pointer";
    span.title = annotationText;

    span.appendChild(savedRange.current.extractContents());
    savedRange.current.insertNode(span);

    setAnnotationText("");
    setShowModal(false);
  };

  const btn = (active) =>
    `toolbar-btn px-2 py-1 rounded-[4px] ${active ? "active bg-white text-black" : ""}`;

  return (
    <div className="h-full m-auto rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="toolbar bg-black text-white flex items-center gap-4 flex-wrap px-3 py-2.5">
        <button
          className={btn(activeFormats.bold)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
        >
          <Bold size={18} />
        </button>

        <button
          className={btn(activeFormats.italic)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
        >
          <Italic size={18} />
        </button>

        <button
          className={btn(activeFormats.underline)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
        >
          <Underline size={18} />
        </button>

        <button
          className={btn(activeFormats.h1)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setHeading("h1")}
        >
          <Heading1 size={18} />
        </button>

        <button
          className={btn(activeFormats.h2)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setHeading("h2")}
        >
          <Heading2 size={18} />
        </button>

        <button
          className={btn(activeFormats.h3)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setHeading("h3")}
        >
          <Heading3 size={18} />
        </button>

        <button
          className="toolbar-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setHeading("p")}
        >
          <Type size={18} />
        </button>

        <button
          className={btn(activeFormats.ul)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
        >
          <List size={18} />
        </button>

        <button
          className={btn(activeFormats.ol)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertOrderedList")}
        >
          <ListOrdered size={18} />
        </button>

        <input
          type="color"
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => exec("foreColor", e.target.value)}
        />

        <input
          type="color"
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => exec("hiliteColor", e.target.value)}
        />

        <button
          className="toolbar-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current.click()}
        >
          <ImageUp size={18} />
        </button>

        <button
          className="toolbar-btn"
          onMouseDown={(e) => e.preventDefault()}
          onClick={openAnnotationModal}
        >
          <Quote size={18} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={uploadImage}
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        className="editor-box h-[calc(100%-87px)] border border-gray-100 rounded-br-lg rounded-bl-lg p-3 focus:outline-none"
      />

      {/* Annotation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Annotation</h3>

            <input
              type="text"
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={addAnnotation}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Editor;
