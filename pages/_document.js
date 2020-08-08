import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="A todo list app" />
          <meta name="application-name" content="Todo App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Todo App" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#364156" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" sizes="180x180" href="/book-180.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/book-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/book-xs.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#364156" />
          <link rel="shortcut icon" href="/book-sm.png" />
          <meta name="twitter:card" content="A Todo App" />
          <meta name="twitter:url" content="https://todo-lemon.vercel.app" />
          <meta name="twitter:title" content="Todo App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="https://todo-lemon.vercel.app/book-lg.png"
          />
          <meta name="twitter:creator" content="@Locksi_desmond" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Todo App" />
          <meta property="og:description" content="Todo App" />
          <meta property="og:site_name" content="Todo App" />
          <meta property="og:url" content="https://todo-lemon.vercel.app" />
          <meta
            property="og:image"
            content="https://todo-lemon.vercel.app/book-sm.png"
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

export default MyDocument;
