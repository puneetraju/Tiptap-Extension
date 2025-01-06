import { Extension } from '@tiptap/core';

const FindAndReplace = Extension.create({
  name: 'findAndReplace',

  addCommands() {
    return {
      findAndReplace: ({ findText, replaceText }) => ({ editor }) => {
        const { view } = editor;

        // Get the current document's JSON structure
        const state = view.state;
        const tr = state.tr;

        // Perform a case-insensitive find and replace with whole word matching
        const content = state.doc.textBetween(0, state.doc.content.size, '\n', '\n');
        
        // Create a regular expression that matches whole words only
        const regex = new RegExp(`\\b${findText}\\b`, 'gi'); // 'g' for global, 'i' for case-insensitive, and '\b' for word boundaries

        // Replace all whole word occurrences of findText with replaceText (case-insensitive)
        const newContent = content.replace(regex, replaceText);

        // If there’s nothing to replace, don’t make changes
        if (newContent === content) return false;

        // Replace the content with the updated text
        tr.replaceWith(0, state.doc.content.size, state.schema.text(newContent));
        view.dispatch(tr);

        return true;
      },
    };
  },
});

export default FindAndReplace;
