import React from 'react';
import { EditorState } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faListOl,
  faCode,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';

import StyleButton from './style-button';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: <FontAwesomeIcon icon={faQuoteLeft} />, style: 'blockquote' },
  { label: <FontAwesomeIcon icon={faListUl} />, style: 'unordered-list-item' },
  { label: <FontAwesomeIcon icon={faListOl} />, style: 'ordered-list-item' },
  { label: <FontAwesomeIcon icon={faCode} />, style: 'code-block' },
];

interface Props {
  editorState: EditorState;
  onToggle(style: string): void;
}

const BlockStyleControls = ({ editorState, onToggle }: Props) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="editor-controls">
      {BLOCK_TYPES.map((type) => {
        return (
          <StyleButton
            key={type.style}
            active={type.style === blockType}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        );
      })}
    </div>
  );
};

export default BlockStyleControls;
