import React from 'react';
import { EditorState } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBold,
  faItalic,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';

import StyleButton from './style-button';

const INLINE_STYLES = [
  { label: <FontAwesomeIcon icon={faBold} />, style: 'BOLD' },
  { label: <FontAwesomeIcon icon={faItalic} />, style: 'ITALIC' },
  { label: <FontAwesomeIcon icon={faUnderline} />, style: 'UNDERLINE' },
];

interface Props {
  editorState: EditorState;
  onToggle(style: string): void;
}

const InlineStyleControls = ({ editorState, onToggle }: Props) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="editor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
