import '../styles/globals.css'
import "../styles/Home.scss";

import { useRouter } from 'next/router'

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let showHeader = true;
  let showBlogHeader = true;
  //catch all routes with /blog/
  if (router.pathname.includes('/blog/')) {
    showHeader = false;
  } else {
    showHeader = true;
  }

  return (
    <>
       {showHeader && <Navbar/>}  
      <Component {...pageProps} />

</>
  )
}

export default MyApp
