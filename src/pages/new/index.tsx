import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Editor from 'components/editor';
import useInput from 'hooks/useInput';

const AddNotePage = () => {
  const router = useRouter();
  const [title, setTitle] = useInput('');
  const [content, setContent] = useState('');

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const onCreate = useCallback(async () => {
    await axios.post('/api/notes', {
      title: `${title}.md`,
      content,
    });
    router.push(`/notes/${title}.md`);
  }, [title, content, router]);

  return (
    <>
      <div className="flex flex-v-center flex-space">
        <div>
          <input value={title} onChange={setTitle} />
          .md
        </div>
        <div className="btn-group">
          <Link href="/">
            <span className="btn btn-link">Cancel</span>
          </Link>
          <button type="button" className="btn btn-primary" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>

      <div>
        {isMounted ? (
          // <Editor editorState={editorState} onChange={setEditorState} />
          <Editor value={content} onChange={setContent} />
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default AddNotePage;
