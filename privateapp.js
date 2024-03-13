const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIATCKANTVK5QDC6KK6",
    secretAccessKey: "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",
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

async function putObject(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: "bucket.piyush.private",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
async function listObjects() {
  const command = new ListObjectsV2Command({
    Bucket: "bucket.piyush.private",
    key: "/",
  });

  const result = await s3Client.send(command);
  console.log("result ==>", result);
}

async function init() {
  // console.log(await listObjects());
  console.log(
    "URL for boy.jpg",
    await getObjectURL("uploads/user-uploads/3.webp")
  );
  // console.log(
  //   "URL for boy.jpg",
  //   await getObjectURL("uploads/user-uploads/video-1710319338135.mp4")
  // );
  // console.log(
  //   "URL for uploading",
  //   await putObject(`image-${Date.now()}.jpeg`, `images/jpeg`)
  // );
  //   console.log(
  //     "URL for uploading",
  //     await putObject(`video-${Date.now()}.mp4`, `video/mp4`)
  //   );
  //   const cmd = new DeleteObjectCommand({
  //     Bucket: "bucket.piyush.private",
  //     Key: "49.webp",
  //   });
  //   await s3Client.send(cmd);
}

init();
