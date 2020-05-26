import { useState, useCallback, useEffect } from 'react';

import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
// import PrismDecorator from 'draft-js-prism';

import Editor from 'src/components/editor';

// const decorator = new PrismDecorator();

const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: string = ctx.params.slug as string;
  const filename = path.join(process.cwd(), process.env.NOTES_DIR, slug);
  const content = fs.readFileSync(filename, 'utf-8');

  return {
    props: {
      slug,
      content,
    },
  };
};

const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), process.env.NOTES_DIR);
  const filenames = fs.readdirSync(postsDirectory);
  return {
    paths: filenames.map((fn) => `/notes/${fn}/edit`),
    fallback: false,
  };
};

interface Props {
  slug: string;
  content: string;
}

// const useDraftEditorState = (markdownString: string) => {
//   const rawData = markdownToDraft(markdownString);
//   const contentState = convertFromRaw(rawData);
//   const [state, setState] = useState(
//     EditorState.createWithContent(contentState, decorator)
//   );

//   const updateState = useCallback(
//     (newState: EditorState) => {
//       setState(EditorState.set(newState, { decorator }));
//     },
//     [setState]
//   );

//   console.log(state.toJS());

//   return [state, updateState];
// };

// const draftStateToMarkdown = (state): string => {
//   const content = state.getCurrentContent();
//   const rawObject = convertToRaw(content);
//   return draftToMarkdown(rawObject);
// };

const EditPage = ({ slug, content }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // const [editorState, setEditorState] = useDraftEditorState(content);
  const [updatedContent, setUpdatedContent] = useState(content);

  const router = useRouter();
  const onSave = useCallback(async () => {
    // const updatedContent = draftStateToMarkdown(editorState)
    await axios.post(`/api/notes/${slug}`, {
      content: updatedContent,
    });
    router.push(`/notes/${slug}`);
    // }, [slug, editorState, router]);
  }, [slug, updatedContent, router]);

  return (
    <>
      <div className="flex flex-v-center flex-space">
        <h1>{slug}</h1>
        <div className="btn-group">
          <Link href={`/notes/${slug}`}>
            <span className="btn btn-link">Cancel</span>
          </Link>
          <button type="button" className="btn btn-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
      <div>
        {isMounted ? (
          // <Editor editorState={editorState} onChange={setEditorState} />
          <Editor value={updatedContent} onChange={setUpdatedContent} />
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export { getStaticProps, getStaticPaths };
export default EditPage;
