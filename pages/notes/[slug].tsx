import React from 'react';

import fs from 'fs';
import path from 'path';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';

import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

const processor = unified()
  .use(markdown)
  // .use(slug)
  // .use(toc)
  // .use(github, {repository: 'rehypejs/rehype-react'})
  .use(remark2rehype)
  // .use(highlight)
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
  return (
    <>
      <h1>{slug}</h1>
      {(processor.processSync(content) as any).result}
      <Link href={`/notes/${slug}/edit`}>
        <a href={`/notes/${slug}/edit`}>Edit</a>
      </Link>
    </>
  );
};

export { getStaticPaths, getStaticProps };
export default PostPage;
