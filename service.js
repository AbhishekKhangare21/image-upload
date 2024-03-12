const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "",
    key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  console.log("URL for graphql.jpeg", getObjectURL("graphql.jpeg"));
}

init();
