import React, {useState} from "react"
import Stripe from "stripe"
import Head from 'next/head'

//import componenet
import Validator from '../components/Validator'
import Footer from '../components/Footer'
import Pricing from '../components/Pricing'

//import auth
import {signIn, signOut} from "next-auth/react";
import { useSession, getSession } from "next-auth/react"
import { GetUserByEmail } from '../services/cloud';

import Link from "next/link"







export default function Home({prices, userData}) {
  const [user, setUser] = useState(userData);


  // console.log(user, "USERRR");
  
  return (
    <div>
      <Head>
      <title>Emailo - an Email Validation Service</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      </Head>  



      {/* <!-- Hero Section --> */}
    <section id="hero">
      {/* <!-- Hero Container --> */}
      <div className="container flex flex-col-reverse mx-auto p-6 lg:flex-row">
        {/* <!-- Content Container --> */}
        <div className="flex flex-col space-y-10 mb-44 lg:mt-16 lg:w-1/2 xl:mb-52">
          <h1
            className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left"
          >
          Email address verification
          </h1>
          <p
            className="text-2xl text-center text-gray-400 lg:max-w-md lg:text-left"
          >
          Clean your email address list for a higher deliverability, more conversions and lower cost.
          </p>
          <div className="mx-auto lg:mx-0">
            <a
              href="#pricing"
              className="py-5 px-10 text-2xl font-bold text-white bg-cyan rounded-full lg:py-4 hover:opacity-70"
              >Get Started</a
            >
          </div>
        </div>

        {/* <!-- Image --> */}
        <div className="mb-24 mx-auto md:w-180 lg:mb-0 lg:w-1/2">
          <img src="/illustration-working.svg" alt="" />
        </div>
      </div>
    </section>

    {/* VALIDATOR COMPONENT */}
    <Validator/>

    {/* <!-- Stats Section --> */}
    <section id="stats" className="py-24 bg-gray-100">
      <div className="container mx-auto px-3">
        <h2 className="text-4xl mb-6 font-bold text-center">Emailo saves you time and money
        </h2>
        <p className="max-w-xs mx-auto text-center text-gray-400 md:max-w-md">
          Increasing deliverability will ultimately increase email-marketing R.O.I.
        </p>
      </div>
    </section>

    {/* <!-- Feature Box Section --> */}
    <section id="features" className="pb-32 bg-gray-100">
      <div
        className="relative container flex flex-col items-start px-6 mx-auto md:flex-row md:space-x-7"
      >
        {/* <!-- Horizontal Line --> */}
        <div
          className="hidden absolute top-24 w-10/12 left-16 h-3 bg-cyan md:block"
        ></div>
        {/* <!-- Vertical Line --> */}
        <div className="absolute w-2 left-1/2 h-full -ml-1 bg-cyan md:hidden"></div>

        {/* <!-- Box 1 --> */}
        <div
          className="relative flex flex-col p-6 space-y-6 bg-white rounded-lg md:w-1/3"
        >
          {/* <!-- Image Positioning --> */}
          <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
            {/* <!-- Image Container For Background & Center --> */}
            <div
              className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet"
            >
              <img src="/icon-brand-recognition.svg" alt="" />
            </div>
          </div>
          <h5
            className="pt-6 text-xl font-bold text-center capitalize md:text-left"
          >
          Increase conversion rates
          </h5>
          <p className="text-center text-gray-400 md:text-left">
            Marketing emails are meant to convert leads into customers. Even the slightest change in conversion rates can have a big impact on your bottom line. Email address validation increases delivery rate which ultimately increases conversion rates.
          </p>
        </div>

        {/* <!-- Box 2 --> */}
        <div
          className="relative flex flex-col mt-24 p-6 space-y-6 bg-white rounded-lg md:mt-8 md:w-1/3"
        >
          {/* <!-- Image Positioning --> */}
          <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
            {/* <!-- Image Container For Background & Center --> */}
            <div
              className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet"
            >
              <img src="/icon-detailed-records.svg" alt="" />
            </div>
          </div>
          <h5
            className="pt-6 text-xl font-bold text-center capitalize md:text-left"
          >
          Protect your reputation
          </h5>
          <p className="text-center text-gray-400 md:text-left">
            Wrong email addresses hurt your sending reputation. Bad reputation means fewer emails delivered to the inbox. Validating your email list protects your reputation which in turn increases your delivery rate.
          </p>
        </div>

        {/* <!-- Box 3 --> */}
        <div
          className="relative flex flex-col mt-24 p-6 space-y-6 bg-white rounded-lg md:mt-16 md:w-1/3"
        >
          {/* <!-- Image Positioning --> */}
          <div className="absolute -ml-10 left-1/2 -top-10 md:left-16">
            {/* <!-- Image Container For Background & Center --> */}
            <div
              className="flex items-center justify-center w-20 h-20 p-4 rounded-full bg-veryDarkViolet"
            >
              <img src="/icon-fully-customizable.svg" alt="" />
            </div>
          </div>
          <h5
            className="pt-6 text-xl font-bold text-center capitalize md:text-left"
          >
          Get more leads

          </h5>
          <p className="text-center text-gray-400 md:text-left">
            Every email address with a typo is a lost lead and money thrown out of the window. Prevent loss at its source by implementing real-time email validation. Your leads will be invited to correct their email address before submitting. </p>
        </div>
      </div>
    </section>  

    {/* PRICING COMPONENET  */}
    <Pricing prices={prices} user={user}/>

     {/* <!-- CTA Section --> */}
    <section id="cta" className="py-24 bg-darkViolet">
      <div className="flex flex-col p-2 space-y-6">
        <h5
          className="mx-auto space-y-10 text-2xl font-bold text-center text-white"
        >
        Get 100 free verifications/month. Free forever, no credit card required.

        </h5>

        <Link href="/enroll"><button
        type="button"
        className={` disabled:bg-slate-50 px-10 py-5 mx-auto text-1xl font-bold text-white rounded-full bg-cyan hover:bg-cyanLlight md:text-base md:py-3 focus:outline-none`}
        >
        Sign Up Free
        </button>
        </Link>

      </div>
    </section> 



    {/* Footer Component */}
    <Footer/>

    </div>
  )
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const userData = await GetUserByEmail(session?.user.email || "");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { data: prices } = await stripe.prices.list({
    active: true, // Only bring active prices (a product can have multiple prices)
    limit: 10,
    expand: ['data.product'],
  })

  return {
    props: {
      prices,
      userData
    },
  }
}
