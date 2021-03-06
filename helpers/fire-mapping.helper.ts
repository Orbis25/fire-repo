import { QuerySnapshot, DocumentData, Timestamp } from "firebase/firestore";
import BaseModel from "../models/base.model";

/**
 * format all properties timestamp firebase to DateJs
 * @author Orbis Alonzo Gutierrez
 * @param data any
 * @returns T Object
 */
export const getFormateadFirebaseData = <T>(data: any) => {
  //get the keys
  const keys = Object.keys(data);
  //get the values
  const values = Object.values(data);

  //loop for keys and set data
  values.forEach((value, index) => {
    if (value instanceof Timestamp) {
      // format date
      const time = data[keys[index]] as unknown as Timestamp;
      const timeStamp = new Timestamp(time.seconds, time.nanoseconds);
      data[keys[index]] = timeStamp.toDate();
    }
  });

  return data as T;
};

/**
 * Return the entity class array from array firebase data
 * @param docs Array docs results firebase
 * @author Orbis Alonzo Gutierrez
 * @returns
 */
export const toEntityArray = <T extends BaseModel>(
  docs: QuerySnapshot<DocumentData>
): T[] => {
  //result is a object collection
  const results: T[] = [];
  //docs is a firebase collection
  docs.forEach((doc) => {
    let data = doc.data() as T;
    results.push(getFormateadFirebaseData<T>(data));
  });

  return results;
};
