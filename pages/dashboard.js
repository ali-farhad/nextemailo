import React, { useEffect, useState, useReducer } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Validator from '../components/Validator';
import DotLoader from "react-spinners/DotLoader";



//import auth
import { useSession, getSession } from "next-auth/react"
import ErrorPage from '../components/ErrorPage';
import { GetUserByEmail } from '../services/cloud';
import Link from 'next/link';
import Tables from './../components/Tables';
import DropZone from './../components/DropZone';



const Dashboard = ({se, userData}) => {

        //code for file importer
    // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });      



    const [isActive, setActive] = useState(false);
    const [isCSV, setIsCSV] = useState(false);
    const [user, setUser] = useState(userData);
    const { data: session, status } = useSession();

    // console.log(userData);

   
    const [limit, setLimit] = useState(userData.limit);
  

      useEffect(() => {
        //if limit does not exist in local storage
       
            //set limit to default value
            localStorage.setItem("limit", JSON.stringify(userData.limit));
        
        //   if(limit !== userData.limit) {
        //   localStorage.setItem("limit", JSON.stringify(userData.limit));
        // }

      }, [limit, userData.limit]);

    const handleToggle = () => {
        setActive(!isActive);
        };

        const toggleCSV = () => {
            setIsCSV(!isCSV);
            };

        if (status === "loading") {
          return (
            <div className="flex justify-center md:mt-32">
            <DotLoader color="#22d5d0"/>    
          </div>
    
          )
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
            <div className="container flex flex-col space-y-5 md:space-y-0 justify-center px-6 mx-auto md:flex-row md:space-x-7">
                {/* box 1 */}
                
            <div className="relative rounded-lg shadow-lg overflow-hidden min-w-[320px]">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
             {/* if plan has starter or pro in it    */}
                {userData.pquota ===10000 && (
            <strong className="top-2 left-2 absolute bg-darkViolet text-white text-red-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">Premium</strong>
            )}
            {userData.pquota === 100000 && (
            <strong className="top-2 left-2 absolute bg-darkViolet text-white text-red-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">Pro</strong>
            )}

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
            {userData.pquota === 100 && (
            <a className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black hover:outline hover:outline-2 outline outline-1  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    <Link href="/#pricing">Upgrade Now</Link>   
            </a>
            )}

            {userData.pquota === 10000 && (
            <a className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black hover:outline hover:outline-2 outline outline-1  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    <Link href="/#pricing">Upgrade Now</Link>   
            </a>
            )}

            {userData.pquota === 100000 && (
            <a className=" cursor-default flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black hover:outline hover:outline-2 outline outline-1  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                    <button className="cursor-default">Pro Activated 🐱‍🏍</button>   
            </a>
            )}
            
            
        
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
            {Math.floor((userData.limit / userData.pquota) * 100)}%
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
            <button onClick={() => toggleCSV() } className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                VERIFY CSV LIST
            </button>
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

    
    <section className='my-5'>
        {isCSV ? <DropZone data={data} dispatch={dispatch}/> : null}
    </section>




        <Footer/>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps(ctx) {
    //get session
    const session = await getSession(ctx)
      if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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