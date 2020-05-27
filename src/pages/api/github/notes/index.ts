import { NextApiRequest, NextApiResponse } from 'next';

import { getNotes } from 'api/github';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const notes = await getNotes();
  res.json({ notes });
};
