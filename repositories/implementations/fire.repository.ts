import { FirebaseApp } from "firebase/app";

import {
  where,
  orderBy,
  query,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  getFirestore,
  DocumentData,
  Query,
  doc,
} from "firebase/firestore";

import BaseModel from "../../models/base.model";
import { IWrite } from "../interfaces/write.interface";
import { IRead } from "../interfaces/read.interface";
import { FilterType } from "../types";
import { toEntityArray, getFormateadFirebaseData } from "../../helpers";
import { v4 as uuidv4 } from "uuid";

/**
 * Represent the logic of the repository
 */
export default abstract class FireRepository<T extends BaseModel>
  implements IWrite<T>, IRead<T>
{
  /**
   * Represent the db connection
   */
  private db: Firestore;
  /**
   * Represent the firebase collectionName
   */
  public collectionName: string;

  /**
   *
   */
  constructor(configuration: FirebaseApp, collectionName: string) {
    this.db = getFirestore(configuration);
    this.collectionName = collectionName;
  }

  async getAll(
    filters?: FilterType<T>,
    disableOrderBy: boolean = false
  ): Promise<T[]> {
    let results = this.getCollection(disableOrderBy);

    if (filters) {
      results = query(
        results,
        where(filters.key.toString(), "==", filters.criteria.toString())
      );
    }

    return toEntityArray<T>(await getDocs(results));
  }

  async getOne(id: string): Promise<T> {
    const response = await getDocs(
      query(this.getCollection(), where("id", "==", id))
    );
    if (response.empty) {
      throw new Error("Document not found");
    }
    const doc = response.docs[0];
    return getFormateadFirebaseData(doc.data());
  }

  async getDocId(id: string): Promise<string> {
    const response = await getDocs(
      query(this.getCollection(), where("id", "==", id))
    );

    if (response.empty) {
      throw new Error("Document not found");
    }
    return response.docs[0].id;
  }

  getCollection(ordered: boolean = false): Query<DocumentData> {
    if (ordered) {
      return query(
        collection(this.db, this.collectionName),
        orderBy("createdAt", "desc"),
        where("isDeleted", "==", false)
      );
    }

    return query(
      collection(this.db, this.collectionName),
      where("isDeleted", "==", false)
    );
  }

  async add(entity: T): Promise<T> {
    if (entity === null) {
      throw new Error("Entity is null");
    }
    await addDoc(collection(this.db, this.collectionName), {
      ...entity,
      createdAt: new Date(),
    });
    return entity;
  }

  async update(id: string, entity: T): Promise<T> {
    let docId = await this.getDocId(id);
    try {
      const docRef = doc(this.db, this.collectionName, docId);
      const data = { ...entity, updatedAt: new Date() } as object;
      await updateDoc(docRef, data);
    } catch (error: any) {
      throw new Error("Document not was updated. error:" + error.message);
    }
    return entity;
  }

  async deleteEntity(id: string): Promise<void> {
    const docId = await this.getDocId(id);
    return deleteDoc(doc(this.db, this.collectionName, docId));
  }

  async remove(id: string): Promise<void> {
    await this.update(id, { isDeleted: true, deleteToken: uuidv4() } as T);
  }
}
