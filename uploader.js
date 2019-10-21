const express = require('express');
const router = express.Router();
const multer  = require('multer');
const AWS = require('aws-sdk');

const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  }
});

const multipleUpload = multer({ storage: storage }).array('file');
// const upload = multer({ storage: storage }).single('file');
const BUCKET_NAME = 'BUCKET_NAME';
const IAM_USER_KEY = 'USER_KEY';
const IAM_USER_SECRET = 'USER_SECRET_KEY';

router.post('/upload',multipleUpload, (req, res) => {
  const file = req.files;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });

  s3bucket.createBucket(function () {
    // let Bucket_Path = 'BUCKET_PATH';
    const responseData = [];
   
    file.map((item) => {
      const params = {
        Bucket: BucketPath,
        Key: item.originalname,
        Body: item.buffer,
        ACL: 'public-read'
      };

      s3bucket.upload(params, (err, data) => {
        if (err) {
         res.json({ "error": true, "Message": err});
        } else {
          responseData.push(data);
            if(responseData.length === file.length) {
              res.json({ "error": false, "Message": "File uploaded successfully.", Data: responseData});
            }
          }
       });
     });
   });
});

module.exports = router;
