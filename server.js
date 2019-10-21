const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const s3FileUploader = require('./uploader.js');

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', s3FileUploader);

// Start the server
app.listen(PORT, (err) => {
  if(err){
   console.log("Server Error: ", err);
  } else{
   console.log('App listening on port: ', PORT);
  }
});