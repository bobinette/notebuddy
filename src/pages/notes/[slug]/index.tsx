import React, { useEffect } from 'react';
import Prism from 'prismjs';

import fs from 'fs';
import path from 'path';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';

import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

const initAutoloader = async () => {
  await import('prismjs/plugins/autoloader/prism-autoloader');
  Prism.plugins.autoloader.languages_path = 'https://prismjs.com/components/';
  Prism.highlightAll();
};

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, { createElement: React.createElement });

const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), process.env.NOTES_DIR);
  const filenames = fs.readdirSync(postsDirectory);
  return {
    paths: filenames.map((fn) => `/notes/${fn}`),
    fallback: false,
  };
};

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

interface Props {
  slug: string;
  content: string;
}

const PostPage = ({ slug, content }: Props) => {
  useEffect(() => {
    initAutoloader();
  }, []);

  return (
    <>
      <div className="flex flex-v-center flex-space">
        <h1>{slug}</h1>
        <Link href={`/notes/${slug}/edit`}>
          <button className="btn btn-link" type="button">
            Edit
          </button>
        </Link>
      </div>
      {(processor.processSync(content) as any).result}
    </>
  );
};

export { getStaticPaths, getStaticProps };
export default PostPage;
