import { NextApiRequest, NextApiResponse } from 'next';
import { save } from 'src/api/github';
/**
 * DO NOT USE THIS ENDPOINT. Only used for testing the
 * Github call.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }

  const { slug } = req.query;

  const sha = await save(slug as string, req.body);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ sha });
};
