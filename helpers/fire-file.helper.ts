import { v4 as uuid } from "uuid";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FirebaseApp } from "firebase/app";

/**
 * upload a file to firebase storage
 * @param file File
 * @param path path
 * @returns
 */
export const fileUpload = async (
  config: FirebaseApp,
  file: File,
  path: string
): Promise<string> => {
  const storage = getStorage(config);
  const ext = file.name.split(".")[1];
  const newPath = `${path}/${uuid()}.${ext}`;

  try {
    const result = await uploadBytes(ref(storage, newPath), file);
    return await getDownloadURL(result.ref);
  } catch (error: any) {
    throw new Error("file not uploaded :" + error.message);
  }
};

/**
 * upload a file to firebase storage
 * @param file File
 * @param path path
 * @returns
 */
export const fileUploadWithExt = async (
  config: FirebaseApp,
  file: Blob | Uint8Array | ArrayBuffer,
  ext: string,
  path: string
): Promise<string> => {
  const storage = getStorage(config);
  const newPath = `${path}/${uuid()}.${ext}`;

  try {
    const result = await uploadBytes(ref(storage, newPath), file);
    return await getDownloadURL(result.ref);
  } catch (error: any) {
    throw new Error("file not uploaded :" + error.message);
  }
};

/**
 * remove a file from firebase storage
 * @param url path
 */
export const removeFile = async (config: FirebaseApp, url: string) => {
  const storage = getStorage(config);
  const refResult = ref(storage, url);
  await deleteObject(refResult);
};
