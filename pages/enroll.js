import React, { useState, useEffect } from "react";
import {useSession, getSession, signIn, signOut} from "next-auth/react";
import { useRouter } from 'next/router';
import ClipLoader from "react-spinners/ClipLoader";
import DotLoader from "react-spinners/DotLoader";
import { getCsrfToken } from "next-auth/react"






function Enroll({se, csrfToken}) {
  const [formErr, setFormErr] = useState(null);
  const router = useRouter();
  const { status } = useSession();
  // console.log(status);



  

  //redirect to home if user is already logged in
  useEffect(() => {
    
      if (se) {
        router.push('/');
      }
    
  } , []);




  
  

    const [isActive, setActive] = useState(false);
    const [emailing, setEmailing] = useState(false);
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


    //     const handleLogin = async (e) => {

    //       e.preventDefault();
    //       const data = {
    //         email: e.target.email.value,
    //         password: e.target.password.value,
    //       }

    //     const isValid = data.email !== '' && data.password !== '';


          
          
    //       if(isValid) {
    //       console.log(data);
    //       const x = signIn("credentials",
    //                   {
    //                     redirect: false,
    //                     email: data.email, 
    //                     password: data.password,
    //                     callbackUrl: 'http://localhost:3000/dashboard'
    //                   })
    //                   .then((data) => {
    //                     console.log("****signin ok: ", data)
    //                     if (data.error) {
    //                       console.log("ERRROR: ", data.error)
    //                       setFormErr(data.error)
    //                     }
    //                     //Some front logic here...
    //                   })
    //                   .catch((error) => {
    //                     console.log("*****error adminInitiateAuth: ", error)
    //                     console.log(JSON.stringify(error))
    //                     //Some front logic here...
    //                   })
      
    //   }
    //   else {
    //     setFormErr("Please fill in all fields")
    //   }
    // }


    //passswordless login
    const handleLogin = async (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      if(!email) {
        setFormErr("Please fill in the email field")
      }
      
      if(email) {
      signIn("email", {email, redirect: true, callbackUrl: "/dashboard"})
      setEmailing(true);
      setFormErr("Please check your email box!")

    }
    }

    const handleGooogle = async (e) => {
      e.preventDefault(); 
      signIn("google", {redirect: true, callbackUrl: "/dashboard"})

    }

    if(emailing) {
      return (
        <div className="flex justify-center md:mt-32">
        <DotLoader color="#22d5d0"/>    
      </div>

      )

    }

      

    

  return (
    
  <>
    {status==="loading" &&( 

    <div className="flex justify-center md:mt-32">
          <ClipLoader color={"#fffff"} size={500} />
    </div>

        )}


    
    {status==="unauthenticated" &&(
  <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
    

  

    {/* if formErr exists */}
    {formErr && (
      <div className="text-white  py-1 m-2 bg-rose-600 text-center">
        {formErr}
      </div> 
    )}
  <h1 className="text-4xl font-medium mb-4">Login | Signup</h1>
  <p className="text-slate-500">Hi, Welcome! 👋</p>

  <div className="my-5">
      <button onClick={handleGooogle} className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
          <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> <span>Login with Google</span>
      </button>
  </div>
  <form onSubmit={handleLogin}  className="my-10">
      <div className="flex flex-col space-y-5">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"/>
          </label>
          {/* <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password"/>
          </label> */}
          {/* <div className="flex flex-row justify-between">
              <div>
                  <label htmlFor="remember" className="">
                      <input type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-indigo-600"/>
                      Remember me
                  </label>
              </div>
              <div>
                  <a href="#" className="font-medium text-indigo-600">Forgot Password?</a>
              </div>
          </div> */}
          <button type="submit" className="w-full py-3 font-medium text-white bg-cyan hover:bg-cyan/90 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login / Signup</span>
          </button>
          {/* <p className="text-center">Not registered yet? <a href="#" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg></span></a></p> */}
      </div>
  </form>
</div>
    )}
    
  
    </>
  )
}

export default Enroll

export async function getServerSideProps(ctx) {
  const csrfToken = await getCsrfToken(ctx)

  //get session
  const session = await getSession(ctx)
  // console.log(session.user.email);
  // console.log(userData)
    if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      se: await getSession(ctx),
      csrfToken,
    }
  }
}