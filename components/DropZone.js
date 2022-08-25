import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../styles/DropZone.module.css";
import { useSession} from "next-auth/react";


import PropagateLoader from "react-spinners/PropagateLoader";
import { UpdateLimit } from '../services/cloud';

import Swal from 'sweetalert2'


const DropZone = ({ data, dispatch }) => {
    const { data: session, status } = useSession();

    


    const [statusId, setStatusId] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [csvURL, setCsvURL] = useState("");
    const [minusQuota, setMinusQuota] = useState(0);
    const [ErrorAPI, setErrorAPI] = useState("");


    const sendEmail = async (csvLink) => {
      
      const email = session.user.email;
      const payload  = {
        csvUrl: csvLink,
        email: email
      }
        const response = await fetch('/api/sendemail', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({args: payload}),

        });
          const data = await response.json()
          // setMsg(data.message);

          if(data.success) {
            Swal.fire({
              title: 'Email Sent! 🎉',
              text: 'your CSV file has been sent to your email address successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong!',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        
    }

    

  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  //useEfect
  useEffect(() => {
  
    getFile();
  }, [statusId])

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  // to handle file uploads
  const uploadFiles = async () => {
    setIsUploading(true);

    
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const formData = new FormData();
    // loop over files and add to formData
    files.forEach((file) => formData.append("file_contents", file));
    //console log file
    // console.log(files[0]);

    // console.log(formData);



var requestOptions = {
  method: 'POST',
  body: formData,
  redirect: 'follow'
};

fetch(`${process.env.NEXT_PUBLIC_EMAILO_VERIFY_URI}${process.env.NEXT_PUBLIC_EMAILO_API_KEY}&filename=emails`, requestOptions)
  .then(response => response.text())
  .then(result => {
    // console.log(result);
    setStatusId(result);
})
  .catch(error => console.log('error', error));
  };


  const getFile = async () => {
    setIsReady(false);
    // console.log(statusId, "STATE");
    //make a get call via fetch
    fetch(`${process.env.NEXT_PUBLIC_EMAILO_UPLOAD_URI}${process.env.NEXT_PUBLIC_EMAILO_API_KEY}&id=${statusId}`)
    .then(response => response.text())
    .then(result => {
        //clean result by |
        let cleanResult = result.split("|");
        if(cleanResult.includes("finished")) {
            // console.log(cleanResult[8]);
            // console.log(cleanResult);
            setIsReady(true);
            setIsUploading(false);
            setCsvURL(cleanResult[8]);
            minusQuota = cleanResult[6];
            //convert to number
            // console.log(typeof(cleanResult[3]));
            //open new tab with url
            // window.open(cleanResult[8]);

            //update limit
            const limit = JSON.parse(localStorage.getItem("limit"));
            const newLimit = limit - Number(cleanResult[3]);
            UpdateLimit(session.user.email, newLimit).then((result) => {
                // console.log(result)
              }); 


              //wait for 5 seconds
              sendEmail(cleanResult[8]);

        

        }

        if(cleanResult.includes("progress")) {
            // console.log("loading");
            //call function every 30 seconds
            setTimeout(getFile, 30000);
        }

        if(statusId==="no_credit") {
            setIsUploading(false);
            setIsReady(true);
            setErrorAPI("Something Went Wrong!");
        }
     
        }
    )
    .catch(error => console.log('error', error));

}

  return (
    <div className="max-w-2xl mx-auto">
    
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <Image src="/upload.svg" alt="upload" height={50} width={50} />

        <input
          id="fileSelect"
          type="file"
          multiple
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">You can select CSV/TXT Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
      {/* Only show upload button after selecting atleast 1 file */}
      {data.fileList.length > 0 && !isReady && (
        <button className={styles.uploadBtn} onClick={uploadFiles}>
          Upload 
        </button>
      )}

        {isUploading &&( 
          <div className="flex w-full justify-center p-20">
          <PropagateLoader
          color="#27e0b9"
          size={20}
        />
        </div>

        )}

        {/* {isUploading && !isReady  &&( 
          <ClipLoader color={"#fffff"} size={150} />

        )} */}

        {isReady && ErrorAPI.length===0 && (
            <div className="flex justify-center">
              <a className=" inline-block p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none" href={csvURL} target="_blank">
              Download Here
            </a> 
            </div>
        )}


        {ErrorAPI && (
            <div className="flex justify-center">
              <a className=" inline-block p-2 px-8 text-white bg-red rounded-lg hover:opacity-70 focus:outline-none">
              Something Went Wrong!. Please Try Again!
            </a> 
            </div>
        )}


     

    </div>
  );
};

export default DropZone;