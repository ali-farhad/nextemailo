import React, { useEffect, useState } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Validator from './../components/Validator';


//import auth
import { useSession, getSession } from "next-auth/react"
import ErrorPage from '../components/ErrorPage';
import { GetUserByEmail } from '../services/cloud';
import Link from 'next/link';



const dashboard = ({se, userData}) => {
    const [isActive, setActive] = useState(false);
    const [user, setUser] = useState(userData);
    const { data: session, status } = useSession();

    // console.log(userData);

   
    const [limit, setLimit] = useState(userData.limit);
  

      useEffect(() => {
        //if limit does not exist in local storage
        if(!localStorage.getItem("limit")){
            //set limit to default value
            localStorage.setItem("limit", JSON.stringify(userData.limit));
        }
          if(limit !== userData.limit) {
          localStorage.setItem("limit", JSON.stringify(userData.limit));
        }

      }, []);

    const handleToggle = () => {
        setActive(!isActive);
        };

        if (status === "loading") {
            return <p>Loading...</p>
          }
        
          if (status === "unauthenticated") {
            return (
                <ErrorPage/>
            )
          }

  return (
    <div>
          <section id="cta" className="py-2 bg-darkViolet">
      <div className="flex flex-col md:flex-row md:space-y-0 justify-between p-2 space-y-6">
        <h5
          className="space-y-10 text-2xl font-bold text-left text-white"
        >
        Dashboard

        </h5>
        <h5 className="space-y-10 text-2xl font-bold text-left text-white">
            {/* if session === autehtnicated  */}
            {status === "authenticated" && userData.email}
        </h5>
      </div>
    </section> 

    <section className="flex flex-1 flex-col md:flex-row w-full justify-around align-center">
    <section id="pricing" className="pt-10">
            <div className="relative container flex flex-col space-y-5 md:space-y-0 justify-center px-6 mx-auto md:flex-row md:space-x-7">
                {/* box 1 */}
            <div className="rounded-lg shadow-lg overflow-hidden min-w-[320px]">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                YOUR CURRENT PLAN
            </span>
            </div>
            <div className="mt-4 flex justify-center text-6xl uppercase leading-none font-extrabold dark:text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                
            </span>
            
            {userData.plan}
            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                
            </span>
            </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
        
        <div className="mt-6 rounded-md shadow">
            <a className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black hover:outline hover:outline-2 outline outline-1  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    <Link href="/#pricing">Upgrade Now</Link>   
            </a>
        </div>
    </div>
            </div>

            {/* box 2 */}
            <div className="rounded-lg shadow-lg overflow-hidden  outline outline-cyan min-w-[320px]">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                Your Quota Left
            </span>
            </div>
            <div className="mt-4 flex flex-col text-center text-6xl leading-none font-extrabold dark:text-white">
            <span className="ml-1 text-xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                
            </span>
            {/* remove decimals */}
            {Math.floor(userData.limit / userData.pquota * 100)}%
            {/* {(localStorage.getItem("limit") / 100) * 100}%  */}
            <p className="text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                {userData.limit}/{userData.pquota}
            </p>
            
            </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
       
        <div className="mt-6 rounded-md shadow">
            <a href="#" className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Get Started
            </a>
        </div>
    </div>
            </div>

            {/* box 3 */}
        
            </div>

        </section>
    </section>


    <section className="flex flex-col md:flex-row w-full justify-around align-center">
    <section id="pricing" className="py-16">
            <div className="relative container flex flex-col space-y-1 md:space-y-0 justify-center px-6 mx-auto md:flex-row md:space-x-7">
                {/* box 1 */}
                <div className="rounded-lg shadow-lg overflow-hidden  outline outline-cyan min-w-[320px]">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <div className="rounded-md shadow">

            <button onClick={() => handleToggle() } className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                VERIFY SINGLE ADDRESS
            </button>
        </div>
            </div>
            </div>
            </div>

            {/* box 2 */}
            <div className="rounded-lg shadow-lg overflow-hidden  outline outline-cyan min-w-[320px]">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <div className=" rounded-md shadow">
            <a href="#" className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                VERIFY CSV LIST
            </a>
        </div>
            </div>
            </div>
            </div>

            {/* box 3 */}
        
            </div>

        </section>
    </section>

    <section className='my-5'>
        {isActive ? <Validator /> : null}
    </section>





        <Footer/>
    </div>
  )
}

export default dashboard

export async function getServerSideProps(ctx) {
    //get session
    const session = await getSession(ctx)
    // console.log(session.user.email);
    const userData = await GetUserByEmail(session?.user.email || "");
    // console.log(userData)

    return {
      props: {
        se: await getSession(ctx),
        userData
      }
    }
  }