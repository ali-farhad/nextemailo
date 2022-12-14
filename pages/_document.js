// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className='scroll-smooth'>
      <Head>
     
    <link
      rel="shortcut icon"
      type="image/png"
      href="images/favicon-32x32.png"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link
      href="https://fonts.googleapis.com/css2?family=Alata&family=Poppins:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}