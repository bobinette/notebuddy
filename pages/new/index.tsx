import { useCallback } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';

import useInput from 'src/hooks/useInput';

const AddNotePage = () => {
  const router = useRouter();
  const [title, setTitle] = useInput('');
  const [content, setContent] = useInput('');

  const onCreate = useCallback(async () => {
    await axios.post('/api/notes', {
      title: `${title}.md`,
      content,
    });
    router.push(`/notes/${title}.md`);
  }, [title, content]);

  return (
    <>
      <div>
        <input value={title} onChange={setTitle} />
        .md
      </div>
      <div>
        <textarea value={content} onChange={setContent} />
      </div>
      <button type="button" onClick={onCreate}>
        Create
      </button>
    </>
  );
};

export default AddNotePage;
