const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "bucket.piyush.private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log("URL for boy.jpg", await getObjectURL("boy.jpg"));
}

init();
