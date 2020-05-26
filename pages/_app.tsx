import React from 'react';
import Head from 'next/head';

import 'src/styles/style.scss';

interface Props {
  Component: React.ElementType;
  pageProps: object;
}

export default ({ Component, pageProps }: Props) => {
  return (
    <>
      <Head>
        <title>note buddy</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
