import { getGoogleBucketInstance } from "./init-google-storage";

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
        const [publicUrl] = await blob.getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + 15 * 60 * 1000,
        });
        
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    } catch (error) {
      reject(error);
    }
  });
};

export { storeFile };
