import firebase from "firebase/compat/app";

import BaseModel from "../../models/base.model";
import { IWrite } from "../interfaces/write.interface";
import { IRead } from "../interfaces/read.interface";
import { FilterType } from "../types";
import { ToEntityArray } from "../../helpers";

/**
 * Represent the logic of the repository
 */
export default abstract class IFireRepository<T extends BaseModel>
  implements IWrite<T>, IRead<T>
{
  /**
   * Represent the db connection
   */
  private db: firebase.firestore.Firestore;
  /**
   * Represent the firebase collection
   */
  public collection: string;

  /**
   *
   */
  constructor(configuration: firebase.app.App, collection: string) {
    this.db = firebase.firestore(configuration);
    this.collection = collection;
  }

  async getAll(filters?: FilterType<T>[], isEquals?: boolean): Promise<T[]> {
    let results = this.getCollection();
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (isEquals) {
          results = results.where(filter.key.toString(), "==", filter.criteria);
        } else {
          results = results
            .orderBy(filter.key.toString())
            .startAt(filter.criteria)
            .endAt(`${filter.criteria}\uf8ff`);
        }
      });
    }
    return ToEntityArray<T>(await results.get());
  }

  getOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  getDocId(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getCollection(): firebase.firestore.Query<firebase.firestore.DocumentData> {
    return this.db
      .collection(this.collection)
      .orderBy("createdAt", "desc")
      .where("isDeleted", "==", false);
  }
  add(entity: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  update(id: string, entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  update(id: any, entity?: any): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
