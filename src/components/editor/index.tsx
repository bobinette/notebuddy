import React, { useEffect, useCallback, useRef } from 'react';
import Prism from 'prismjs';
import TextareaAutosize from 'react-textarea-autosize';

const initAutoloader = async () => {
  await import('prismjs/plugins/autoloader/prism-autoloader');
  Prism.plugins.autoloader.languages_path = 'https://prismjs.com/components/';
  Prism.highlightAll();
};

interface Props {
  value: string;
  onChange(s: string): void;
}

const CodeEditor = ({ value, onChange }: Props) => {
  useEffect(() => {
    initAutoloader();
  }, []);

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // let localValue = value;
      // const { selectionStart, selectionEnd } = evt.currentTarget;

      // handle 4-space indent on
      if (evt.key === 'Tab') {
        evt.preventDefault();

        // This bit does not work for now: the carret goes to the end
        // of the textarea and the undo/redo history is lost
        //       const before = localValue.substring(0, selectionStart);
        //       const after = localValue.substring(selectionEnd);
        //       localValue = `${before}    ${after}`;
        //       onChange(localValue);
        //       textareaRef.current.selectionStart =
        //         selectionEnd + 4 - (selectionEnd - selectionStart);
        //       textareaRef.current.selectionEnd =
        //         selectionEnd + 4 - (selectionEnd - selectionStart);
      }
    },
    [value, onChange]
  );

  const onChangeLocal = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  return (
    <div className="code-edit-container">
      <TextareaAutosize
        className="code-input"
        value={value}
        onChange={onChangeLocal}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        placeholder="Let me know about your thoughts..."
        minRows={1}
      />
      <pre className="code-output">
        <code className="language-md">{value}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
