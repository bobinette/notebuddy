import path from 'path';
import fs from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }

  const { title, content }: { title: string; content: string } = req.body;
  if (!title || !content) {
    res.statusCode = 400;
    res.json({
      error: 'title and content are compulsory',
    });
    return;
  }

  if (!title.match(/^[a-zA-z][a-zA-Z0-9_-]+\.md$/)) {
    res.statusCode = 400;
    res.json({
      error: 'invalid title: should match ^[a-zA-z][a-zA-Z0-9_-]+.md$',
    });
    return;
  }

  const filename = path.join(process.cwd(), process.env.NOTES_DIR, title);
  if (fs.existsSync(filename)) {
    res.statusCode = 400;
    res.json({
      error: 'file already exists',
    });
    return;
  }

  fs.writeFileSync(filename, content);

  res.statusCode = 201; // Created
  res.setHeader('Content-Type', 'application/json');
  res.json({ status: 'created' });
};
