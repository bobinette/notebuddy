import fs from 'fs';
import path from 'path';

import { formatDistance, addSeconds } from 'date-fns';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglassHalf,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Note {
  name: string;
  filename: string;

  words: number;
  readingTime: string;
}

const headlineRegex = /(# .*)/;

// Found there: https://stackoverflow.com/questions/18679576/counting-words-in-string
const countWords = (s: string): number => {
  const clean = s
    .replace(/(^\s*)|(\s*$)/gi, '') // exclude  start and end white-space
    .replace(/[ ]{2,}/gi, ' ') // 2 or more space to 1
    .replace(/\n /, '\n'); // exclude newline with a start spacing

  return clean.split(' ').filter(String).length;
};

const readingTime = (words: number): string => {
  const baseDate = new Date(0);
  const secs = (words / 200) * 60;
  return formatDistance(addSeconds(baseDate, secs), baseDate);
};

const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const postsDirectory = path.join(process.cwd(), process.env.NOTES_DIR);
  const filenames = fs.readdirSync(postsDirectory);

  const notes: Note[] = filenames.map((filename) => {
    const fullFilename = path.join(
      process.cwd(),
      process.env.NOTES_DIR,
      filename
    );
    const content = fs.readFileSync(fullFilename, 'utf-8');

    const match = content.match(headlineRegex);
    let name = 'Unnamed';
    if (match && match.length > 1) {
      [, name] = match;
      name = name.replace(/^#/, '').trim();
    }

    const words = countWords(content);

    return {
      name,
      filename,

      words,
      readingTime: readingTime(words),
    };
  });

  return { props: { notes } };
};

interface Props {
  notes: Note[];
}

const HomePage = ({ notes }: Props) => {
  return (
    <div className="card-grid">
      {notes.map((p) => (
        <div className="card" key={p.filename}>
          <div>{p.name}</div>
          <div className="muted flex flex-v-center">
            <FontAwesomeIcon className="fa-left" icon={faHourglassHalf} />
            <span>{p.readingTime}</span>
          </div>
          <Link href={`/notes/${p.filename}`}>
            <span className="btn btn-link">Read</span>
          </Link>
        </div>
      ))}
      <div className="card flex flex-v-center flex-h-center">
        <Link href="/new">
          <div className="btn btn-primary flex flex-v-center">
            <FontAwesomeIcon className="fa-left" icon={faPlusCircle} />
            <span>Add a note</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export { getStaticProps };
export default HomePage;
