import fs from "fs";
import path from "path";

import { GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  notes: string[];
}

const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "../zettelkasten/notes");
  const filenames = fs.readdirSync(postsDirectory);
  return { props: { notes: filenames } };
};

const HomePage = ({ notes }: Props) => {
  return (
    <ul>
      {notes.map((p) => (
        <li key={p}>
          <Link href={`/notes/${p}`}>{p}</Link>
        </li>
      ))}
    </ul>
  );
};

export { getStaticProps };
export default HomePage;
