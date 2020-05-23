import fs from 'fs';
import path from 'path';

import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Props {
  notes: string[];
}

const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), process.env.NOTES_DIR);
  const filenames = fs.readdirSync(postsDirectory);
  return { props: { notes: filenames } };
};

const HomePage = ({ notes }: Props) => {
  return (
    <>
      <ul>
        {notes.map((p) => (
          <li key={p}>
            <Link href={`/notes/${p}`}>
              <a href={`/notes/${p}`}>{p}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/new">
        <a href="/new">Add a note</a>
      </Link>
    </>
  );
};

export { getStaticProps };
export default HomePage;
