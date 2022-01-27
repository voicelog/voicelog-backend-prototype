import { Bucket, Storage } from "@google-cloud/storage";

let storage: Storage;
let bucket: Bucket;

const initGoogleStorage = async () => {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS must be defined");
  }
  if (!process.env.GCLOUD_STORAGE_BUCKET) {
    throw new Error("GCLOUD_STORAGE_BUCKET must be defined");
  }

  storage = new Storage();
  bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET as string);
};

const getGoogleStorageInstance = () => {
  if (!storage) {
    initGoogleStorage();
  }

  return storage;
};

const getGoogleBucketInstance = () => {
  if (!bucket) {
    initGoogleStorage();
  }

  return bucket;
};

export { initGoogleStorage, getGoogleBucketInstance, getGoogleStorageInstance };
