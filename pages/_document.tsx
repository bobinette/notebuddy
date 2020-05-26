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
            href="//fonts.googleapis.com/css?family=Fira Code:300,300italic,400,400italic,700,700italic"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css"
          />
          {/* <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-dark.min.css"
          /> */}
        </Head>
        <body>
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js" /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
