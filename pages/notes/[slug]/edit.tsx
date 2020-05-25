import { useState, useCallback } from 'react';

import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import Editor from 'src/components/editor';

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

const useDraftEditorState = (markdownString: string) => {
  const rawData = markdownToDraft(markdownString);
  const contentState = convertFromRaw(rawData);
  const [state, setState] = useState(
    EditorState.createWithContent(contentState)
  );

  return [state, setState];
};

const draftStateToMarkdown = (state): string => {
  const content = state.getCurrentContent();
  const rawObject = convertToRaw(content);
  return draftToMarkdown(rawObject);
};

const EditPage = ({ slug, content }: Props) => {
  const [editorState, setEditorState] = useDraftEditorState(content);

  const router = useRouter();
  const onEdit = useCallback(async () => {
    await axios.post(`/api/notes/${slug}`, {
      content: draftStateToMarkdown(editorState),
    });
    router.push(`/notes/${slug}`);
  }, [slug, editorState, router]);

  return (
    <>
      <div className="flex flex-v-center flex-space">
        <h1>{slug}</h1>
        <div className="btn-group">
          <Link href={`/notes/${slug}`}>
            <span className="btn btn-link">Cancel</span>
          </Link>
          <button type="button" className="btn btn-primary" onClick={onEdit}>
            Save
          </button>
        </div>
      </div>
      <div>
        <Editor
          editorKey="key-for-ssr"
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
    </>
  );
};

export { getStaticProps, getStaticPaths };
export default EditPage;
