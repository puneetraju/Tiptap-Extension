
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FindAndReplace from './FindAndReplace';
import { useState } from 'react';
import './RepStyles.css'; 

export default function TiptapEditor() {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  const editor1 = useEditor({
    extensions: [
      StarterKit,
      FindAndReplace,
    ],
    content: '<p>Imagine being able to replace all outdated references in a document, rename variables in a codebase, or even adjust formatting inconsistencies—all without breaking a sweat. Plus, with an intuitive interface and undo options, you’re always in control. Why waste time doing it manually when you can automate it with precision?</p> <p>Start saving time today and explore the limitless possibilities of search and replace. Try it out and see how it transforms the way you work!</p>',
  });

  const handleReplace = () => {
    if (!findText.trim()) {
      alert('Please enter text to find!');
      return;
    }
    if (editor1 && editor1.commands.findAndReplace) {
      editor1.commands.findAndReplace({ findText, replaceText });
    } else {
      alert('Find and Replace functionality is not available.');
    }
  };

  return (
    <div className="editor-container">
      <div className="find-replace-controls">
        <input
          type="text"
          placeholder="Find"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={handleReplace}>Replace</button>
      </div>

      <EditorContent editor={editor1} />
    </div>
  );
}
