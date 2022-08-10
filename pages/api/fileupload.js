export default async function asynchandler(req, res) {

  // get the files from the fileList as an array
    let files = [...req.files];
    //response file name back 
    res.json(files);
    

}