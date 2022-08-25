import Email from '../../src/email';


const handler = (async (req, res) => {
    //if reuest is post
    if(req.method === 'POST') {
    const { args } = req.body;
    const { csvUrl, email } = args;
    

  try {
    await new Email(email, csvUrl).sendCSVLink();

    return res.status(200).json({
      success: true,
      message: 'Check your Email! 🎉 your Filtered CSV is ready to download',
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: 'Error sending email. Please try again.',
      err: error.message

    });
  }



    }

});

export default handler;