import React, { useCallback } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
  EditorCommand,
  DraftHandleValue,
} from 'draft-js';

import BlockStyleControls from './features/blocks';
import InlineStyleControls from './features/inlines';

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block: ContentBlock): string => {
  switch (block.getType()) {
    case 'blockquote':
      return 'blockquote';
    default:
      return '';
  }
};

interface Props {
  editorState: EditorState;
  onChange(es: EditorState): void;
}

const RichEditor = ({ editorState, onChange }: Props) => {
  const toggleBlockType = useCallback(
    (blockType: string) => {
      onChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, onChange]
  );
  const toggleInlineStyle = useCallback(
    (blockType: string) => {
      onChange(RichUtils.toggleInlineStyle(editorState, blockType));
    },
    [editorState, onChange]
  );
  const handleKeyCommand = useCallback(
    (command: EditorCommand, es: EditorState) => {
      const newState = RichUtils.handleKeyCommand(es, command);
      if (newState) {
        onChange(newState);
        return true;
      }
      return false;
    },
    [onChange]
  );
  const mapKeyToEditorCommand = useCallback(
    (evt: React.KeyboardEvent): DraftHandleValue => {
      if (evt.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          evt,
          editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== editorState) {
          onChange(newEditorState);
        }
        return 'handled';
      }
      return getDefaultKeyBinding(evt);
    },
    [editorState, onChange]
  );

  return (
    <div className="editor-root">
      <div className="editor-toolbar flex">
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <div className="editor-editor">
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Create your note..."
          spellCheck
        />
      </div>
    </div>
  );
};

export default RichEditor;
