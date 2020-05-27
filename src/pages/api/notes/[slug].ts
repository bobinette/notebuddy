import path from 'path';
import fs from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }

  const { slug } = req.query;

  const filename = path.join(
    process.cwd(),
    process.env.NOTES_DIR,
    slug as string
  );
  if (!fs.existsSync(filename)) {
    res.statusCode = 400;
    res.json({
      error: 'file does not exist',
    });
    return;
  }

  const { content }: { content: string } = req.body;
  fs.writeFileSync(filename, content);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ status: 'ok' });
};
