import { graphql } from '@octokit/graphql';
import axios from 'axios';

const owner = 'bobinette';
const repository = 'zettelkasten';

export interface Note {
  filename: string;
  content: string;
}

const config = {
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
};

const graphqlWithAuth = graphql.defaults(config);

export const getNotes = async (): Promise<Note[]> => {
  const response: any = await graphqlWithAuth(
    `
  query notes($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "master:notes") {
        ... on Tree {
          entries {
            name
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }
`,
    {
      owner,
      name: repository,
    }
  );

  return response.repository.object.entries.map((f) => ({
    filename: f.name,
    content: f.object.text,
  }));
};

export const readNote = async (noteName: string) => {
  const { note } = await graphqlWithAuth(
    `
  query notes($owner: String!, $name: String!, $noteName: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "master:notes/$noteName") {
        ... on Blob {
           text
        }
      }
    }
  }
`,
    {
      owner,
      name: repository,
      noteName,
    }
  );

  return note;
};

export const getLastCommit = async () => {
  const { lastCommit } = await graphqlWithAuth(
    `
  query lastCommit($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ref(qualifiedName: "master") {
        target {
          oid
        }
      }
    }
  }`,
    {
      owner,
      name: repository,
    }
  );

  return lastCommit.repository.ref.target.oid;
};

/**
 * Upload a new blob to Github and commits it to the master
 * branch.
 *
 * TODO: check how if the GraphQL API can be used for that. But
 * it does not look like I can interact with the trees/files via
 * the GraphQL mutations. I'll explore more.
 */
export const save = async (filename: string, content: string) => {
  let sha;
  try {
    ({
      data: { sha },
    } = await axios.get(
      `https://api.github.com/repos/${owner}/${repository}/contents/notes/${filename}`,
      config
    ));
  } catch {
    // If we are here, the file does not exist, meaning we need to have
    // sha empty for the following call: all clear captain 👌
  }

  // TODO: try catcht this one to extract the error message from Github
  const { data } = await axios.put(
    `https://api.github.com/repos/${owner}/${repository}/contents/notes/${filename}`,
    {
      message: `${sha ? 'Update' : 'Create'} ${filename} via notebuddy`,
      content: Buffer.from(content).toString('base64'),
      sha,
    },
    config
  );

  return data;
};
