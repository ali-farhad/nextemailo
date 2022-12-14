import React, {useState} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { useSession} from "next-auth/react";
import { UpdateLimit } from '../services/cloud';


export default function Validator() {
  const { data: session, status } = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState({});

    // console.log(session.user.email, "email")

    const handleSubmit = async (e) =>{
        isValid.Success = false;
        e.preventDefault();
        const email = e.target.email.value;
        const limit = JSON.parse(localStorage.getItem("limit"));
        // console.log(limit)
        //if limit is 0 then abort
        if(limit === 0 && limit !== null){
          setIsValid({
            Success: false,
            message: "You have reached your limit. Please Upgrade Your Plan!"
        });
        return false;
      } else {

        const isEmailValid = async () => {
          //take limit out of local storage and minus 1
          const limit = JSON.parse(localStorage.getItem("limit"));
        
          if(limit)
          {
          const newLimit = limit - 1;
          localStorage.setItem("limit", JSON.stringify(newLimit));
          
          UpdateLimit(session.user.email, newLimit).then((result) => {
            // console.log(result)
          }); 

          // getComments(slug).then((result) => {
          //   setComments(result);
          // });
        }
         

          setIsLoading(true);
          const response = await fetch(`https://verify.gmass.co/verify?email=${email}&key=52D5D6DD-CD2B-4E5A-A76A-1667AEA3A6FC`);
          const data = await response.json();
          setIsLoading(false);
          return data;
     }

     isEmailValid().then(data => {
      console.log(data);
        setIsValid(data);
        console.log(data);
     })


      }

        
        

        

    };
    
  return (
    <div>
        
    {/* <!-- Shorten Section --> */}
    <section id="shorten" className="relative bg-gray-100">
      {/* <!-- Shorten Container --> */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* <!-- Form --> */}
        <form
          id="link-form"
          className="relative flex flex-col w-full p-10 -mt-20 space-y-4 bg-darkViolet rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="flex-1 p-3 border-2 rounded-lg placeholder-yellow-500 focus:outline-none"
            placeholder="Enter an Email Address"
            id="link-input"
            name="email"
          />

          <button
            className="px-10 py-3 text-white bg-cyan rounded-lg hover:bg-cyanLight focus:outline-none md:py-2"
          >
            Validate It!
          </button>

          {/* <!-- Error Message --> */}
          <div
            id="err-msg"
            className="absolute left-7 bottom-3 text-red text-sm italic"
          ></div>
        </form>

       

        {/* if isLoading show loading othewrise */}
        {isLoading && (
            <div className="mt-1">
                 <SkeletonTheme baseColor="#fff" highlightColor="#00FFFF">
            <Skeleton height={100} />
            </SkeletonTheme>

            </div>

        )}

        
{(isValid.Valid && isValid.Success) && (

         <div
          className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row"
        >
          <p className="font-bold text-center text-veryDarkViolet md:text-left">
            {isValid.Email}
          </p>

          <div
            className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0"
          >
            <div className="font-bold text-cyan">Valid Email</div>
            <button
              className="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none"
            >
              ???
            </button>
          </div>
        </div>   
)} 
        
         
        {(!isValid.Valid && isValid.Success) && (
             <div
             className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row"
           >
             <p className="font-bold text-center text-veryDarkViolet md:text-left">
               {isValid.Email}
             </p>
   
             <div
               className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0"
             >
               <div className="font-bold text-red">Invalid Email</div>
               <button
                 className="p-2 px-8 text-white bg-red rounded-lg hover:opacity-70 focus:outline-none"
               >
                 X
               </button>
             </div>
           </div>  
        )}


{(isValid.message && !isValid.Success) && (
             <div
             className="flex flex-col items-center justify-between w-full p-6 bg-white rounded-lg md:flex-row"
           >
             <p className="font-bold text-center text-veryDarkViolet md:text-left">
               {isValid.message}
             </p>
   
             <div
               className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0"
             >
               <div className="font-bold text-red">ERROR</div>
               <button
                 className="p-2 px-8 text-white bg-red rounded-lg hover:opacity-70 focus:outline-none"
               >
                 X
               </button>
             </div>
           </div>  
        )}
    
            
       



      </div>
    </section>
    </div>
  )
}

