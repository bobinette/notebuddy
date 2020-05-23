import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { GetStaticProps, GetStaticPaths } from 'next';
import useInput from 'src/hooks/useInput';
import Link from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

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

const EditPage = ({ slug, content }: Props) => {
  const [updatedContent, setUpdatedContent] = useInput(content);
  const router = useRouter();
  const onEdit = useCallback(async () => {
    await axios.post(`/api/notes/${slug}`, {
      content: updatedContent,
    });
    router.push(`/notes/${slug}`);
  }, [slug, updatedContent, router]);

  return (
    <>
      <h1>{slug}</h1>
      <textarea value={updatedContent} onChange={setUpdatedContent} />
      <Link href={`/notes/${slug}`}>
        <a href={`$/notes/${slug}`}>Cancel</a>
      </Link>
      <button type="button" onClick={onEdit}>
        Save
      </button>
    </>
  );
};

export { getStaticProps, getStaticPaths };
export default EditPage;
