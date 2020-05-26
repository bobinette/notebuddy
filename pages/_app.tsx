import React from 'react';
import Head from 'next/head';

import Layout from 'src/components/layout';

import 'src/styles/style.scss';

interface Props {
  Component: React.ElementType;
  pageProps: object;
}

export default ({ Component, pageProps }: Props) => {
  return (
    <Layout>
      <Head>
        <title>note buddy</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};
