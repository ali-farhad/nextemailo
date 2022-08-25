import React, { useState, useEffect } from "react";
import Link from 'next/link';

import {useSession, signIn, signOut} from "next-auth/react";
import { useRouter } from 'next/router';



export default function Navbar() {
  const {push, asPath} = useRouter();
  const router = useRouter();
  const { status } = router.query;
  

    const [isActive, setActive] = useState(false);
    const session = useSession();
 

    const handleToggle = () => {
        setActive(!isActive);
      };

      const signedOut = () => {
        //clear limit out of local storage
        localStorage.removeItem("limit");
        signOut({
          callbackUrl: `${window.location.origin}/`
        })
      }

        //remove extra parameters from the url
        const cleanUrl = () => {
          const { pathname, query } = router;
          const { status } = query;
          if (status) {
            router.push(pathname);
          }
        }
        useEffect(() => {
          //run clenUrl after 2 seconds
          setTimeout(cleanUrl, 5000);
        } , [status])


 
      const handleSignIn = () => router.push(`/enroll?callbackUrl=${asPath}dashboard`)

      //current path from window
      



  return (
    <div>

{status && status === 'success' && (
  <div className="flex justify-center p-4 mb-4 text-sm text-red-700 bg-green-200  dark:bg-red-200 dark:text-red-800" role="alert">
  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <span className="sr-only">Info</span>
  <div className="text-center">
    <span className="font-medium">SUCCESS!</span> Your Plan has been upgraded!
  </div>
</div>
)}


{status && status === 'cancel' && (

<div className="flex justify-center p-4 mb-4 text-sm text-red-700 bg-red  dark:bg-red-200 dark:text-red-800" role="alert">
  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
  <span className="sr-only">Info</span>
  <div className="text-center">
    <span className="font-medium">ERROR!</span> Payment Failed! Please Try Again!
  </div>
</div>
)}

       {/* <!-- Nav Container --> */}
    <nav className="relative container mx-auto p-6">
      {/* <!-- Flex Container For All Items --> */}
      <div className="flex items-center justify-between">
        {/* <!-- Flex Container For Logo/Menu --> */}
        <div className="flex items-center space-x-20">
          {/* <!-- Logo --> */}
          <div className="font-bold text-2xl"><Link href="/">Emailo</Link></div>
          {/* <!-- Left Menu --> */}
          <div className="hidden space-x-8 font-bold lg:flex">
            <a href="#stats" className="text-grayishViolet hover:text-veryDarkViolet"
              >Features</a
            >
            <a href="#pricing" className="text-grayishViolet hover:text-veryDarkViolet"
              >Pricing</a
            >
            <Link href="/blog/home">
           <span className="cursor-pointer text-grayishViolet hover:text-veryDarkViolet">Blog</span> 
          </Link>
          </div>
        </div>

        {/* <!-- Right Buttons Menu --> */}
        <div
          className="hidden items-center space-x-6 font-bold text-grayishViolet lg:flex"
        >
          {session.status === 'unauthenticated' && (
            <>         
             {/* <button onClick={() => signIn("google")} className="hover:text-veryDarkViolet">Login</button> */}
             {/* <button
            href="#"
            className="px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70"
            >Sign Up</button> */}

            {/* <button onClick={() => signIn("google")} type="button" className="text-white bg-cyan hover:bg-cyan/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign in with Google
            </button>
            </> */}

            <button onClick={handleSignIn} className="text-white bg-cyan hover:bg-cyan/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
            Sign Up
            </button>
            </>

          )}

          {session.status === 'authenticated' && (
            <>         
             <Link href="/dashboard">
             <button
            className="px-8 py-3 font-bold text-white bg-cyan rounded-full hover:opacity-70"
            >Dashboard</button>
              </Link> 

            <button
            onClick={signedOut}
            className="px-8 py-3 font-bold text-white bg-red rounded-full hover:opacity-70"
            >Logout</button>
            </>

          )}

         
        </div>

        {/* <!-- Hamburger Button --> */}
        <button
          id="menu-btn"
          className={`block hamburger lg:hidden focus:outline-none ${isActive ? "open" : null}`}
          type="button"
          onClick={handleToggle}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* <!-- Mobile Menu --> */}
      <div
        id="menu"
        className={`absolute p-6 rounded-lg bg-darkViolet left-6 right-6 top-20 z-100 ${isActive ? "flex" : "hidden"}`}
      >
        <div
          className="flex flex-col items-center justify-center w-full space-y-6 font-bold text-white rounded-sm"
        >
          <a href="#stats" className="w-full text-center">Features</a>
          <a href="#pricing" className="w-full text-center">Pricing</a>
          <Link className="w-full text-center" href="/blog/home">
          Blog
          </Link>
          {session.status === 'unauthenticated' && (
            <button onClick={handleSignIn} className="w-full py-3 text-center rounded-full bg-cyan"
            >Get Started</button>
           
          )}


          {session.status === 'authenticated' && (
            <>
            <button  className="w-full py-3 text-center rounded-full bg-cyan"
            >Dashboard</button>

            <button onClick={signedOut}  className="w-full py-3 text-center rounded-full bg-red text-white"
            >Logout</button>

            </>
          )}

          



          
        </div>
      </div>
    </nav>

    </div>
  )
}

