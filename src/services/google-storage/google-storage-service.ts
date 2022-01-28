import { GetSignedUrlConfig } from "@google-cloud/storage";
import { getGoogleBucketInstance } from "./init-google-storage";

const SIGNED_URL_OPTIONS: GetSignedUrlConfig = {
  version: "v4",
  action: "read",
  expires: Date.now() + 15 * 60 * 1000,
};

const storeFile = async (fileName: string, file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const bucket = getGoogleBucketInstance();

      const blob = bucket.file(fileName);

      blob.getSignedUrl;
      const blobStream = blob.createWriteStream();

      blobStream.on("error", (err) => {
        reject(err);
      });

      blobStream.on("finish", async () => {
        // The public URL can be used to directly access the file via HTTP.
        const [publicUrl] = await blob.getSignedUrl(SIGNED_URL_OPTIONS);

        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    } catch (error) {
      reject(error);
    }
  });
};

const doesFileExist = async (fileName: string) => {
  const bucket = getGoogleBucketInstance();

  return await bucket.file(fileName).exists();
};

const getFileStream = async (fileName: string) => {
  if (!doesFileExist(fileName)) {
    throw new Error(`File of name ${fileName} does not exist`);
  }

  const bucket = getGoogleBucketInstance();

  return bucket.file(fileName).createReadStream();
};

const getFilePublicUrl = async (fileName: string) => {
  if (!doesFileExist(fileName)) {
    throw new Error(`File of name ${fileName} does not exist`);
  }

  const bucket = getGoogleBucketInstance();

  const [publicUrl] = await bucket
    .file(fileName)
    .getSignedUrl(SIGNED_URL_OPTIONS);

  return publicUrl;
};

export { storeFile, getFileStream, doesFileExist, getFilePublicUrl };
