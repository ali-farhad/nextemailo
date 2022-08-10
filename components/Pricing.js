import React, { useState, useEffect } from 'react';
import { getPricing } from '../services/cloud'
import {useSession, signIn, signOut} from "next-auth/react";
import { checkout } from './../checkout';



const Pricing = (props) => {
    // const { product, unit_amount } = prices;
    const { data: session, status } = useSession();
    var prices = props.prices;
    var pquota;

    if(status === "authenticated") {
       
        pquota = props.user.pquota;
        }

        if(status === "unauthenticated") {
       
            pquota = 100;
            }
    



    // console.log(prices)

   
    // console.log(prices, "wtf")



    console.log(status);


    // const proPlan = prices[0].product.name;
    // const starterPlan = prices[1].unit_amount;
    // console.log(starterPlan)
   

    //   console.log(pricing);

    const handleCheckout = (e, item) => {
        e.preventDefault();

        if(status === 'unauthenticated') {
           return  signIn("google");
        }
        else {


            checkout(item);
            

        
    }

    }

  
  return (
    <div>
        <section id="pricing" className="py-16">
            <div className="relative container flex flex-col space-y-5 md:space-y-0 justify-center px-6 mx-auto md:flex-row md:space-x-7 max-w-[1200px]">
                {/* box 1 */}
            <div className="rounded-lg shadow-lg overflow-hidden w-full">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                FREE
            </span>
            </div>
            <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                from
            </span>
            $0
            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
            </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
            <ul>
            <li className="mt-4 flex items-start">
            <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    100 verifications / month
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Email Support
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Bulk Verification
                </p>
            </li>
        </ul>
        {/* if pquota is 100 */}
      
        <div className="mt-6 rounded-md shadow">
        {pquota === 100 && (
            <button onClick={() => signIn("google")}  className=" w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-black hover:outline hover:outline-2 outline outline-1  focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Get Started 
            </button>
        )}
    
            
        </div>
    </div>
            </div>

            {/* box 2 */}
            <div className="rounded-lg shadow-lg overflow-hidden  outline outline-cyan w-full">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">

            <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                  { prices[1].product.name }
            </span>
           
            </div>
            <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                from
            </span>
            ${prices[1].unit_amount /100}
            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
            </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
            <ul>
            <li className="mt-4 flex items-start">
            <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    10,000 verifications / month
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Email Support
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Cancel anytime
                </p>
            </li>
        </ul>
        <div className="mt-6 rounded-md shadow">
        {pquota === 100 && (
            <button name="starter"  onClick={(e) => handleCheckout(e, prices[1])} className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
            Get Started
        </button>
        )}

        {pquota === 10000 && (
            <button name="starter"  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-cyan hover:bg-cyanLight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
            Currenlty Subscribed
        </button>
        )}
           
        </div>
    </div>
            </div>

            {/* box 3 */}
            <div className="rounded-lg shadow-lg overflow-hidden w-full">
            <div className="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
            <span className="inline-flex px-4 py-1 dark:text-white rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
                {prices[0].product.name}
            </span>
            </div>
            <div className="mt-4 flex justify-center text-6xl leading-none font-extrabold dark:text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                from
            </span>
            ${prices[0].unit_amount /100}
            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
                /month
            </span>
            </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
            <ul>
            <li className="mt-4 flex items-start">
            <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    1 Million Verifications / month
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Email Support
                </p>
            </li>
            <li className="mt-4 flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7">
                        </path>
                    </svg>
                </div>
                <p className="ml-3 text-base leading-6 text-gray-700 dark:text-gray-200">
                    Cancel Anytime
                </p>
            </li>
        </ul>
        <div className="mt-6 rounded-md shadow">
        {pquota === 100 && (
             <button name="pro" onClick={(e) => handleCheckout(e, prices[0])} className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-darkViolet hover:bg-veryDarkViolet focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
             Get Started
         </button>
        )}

        {pquota === 100000 && (
             <button name="pro"  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-darkViolet hover:bg-veryDarkViolet focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
             Currently Subscribed
         </button>
        )}

        {pquota === 10000 && (
             <button name="pro"  onClick={(e) => handleCheckout(e, prices[0])}  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-darkViolet hover:bg-veryDarkViolet focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
             Upgrade
         </button>
        )}
           
        </div>
    </div>
            </div>

            </div>

        </section>
    </div>
  )
}

export default Pricing



  