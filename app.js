const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIATCKANTVK7YZJ62VA",
    secretAccessKey: "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",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "bucket.piyush.private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });
  return url;
}

async function init() {
  console.log("URL for boy.jpg", await getObjectURL("boy.jpg"));
}

init();
