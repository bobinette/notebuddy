import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Source Sans Pro:300,300italic,400,400italic,700,700italic"
          />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Inter:300,300italic,400,400italic,700,700italic"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
