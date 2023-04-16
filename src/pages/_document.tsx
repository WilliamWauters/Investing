import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="dark"
      style={{ height: "100%", overflow: "auto" }}
    >
      <Head />
      <body className="dark:bg-slate-900 text-white font-mono">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
