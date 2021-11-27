import firebase from "firebase/compat/app";
import BaseModel from "../../models/base.model";
import { FilterType } from "../types";
/**
 * Represent the read interface base from the repository
 */
export interface IRead<TEntity extends BaseModel> {
  /**
   * Get all the entities
   * @param filters - The filters to apply
   * @param isEquals - If the filters use equals or contains
   * @returns list of entities
   */
  getAll(
    filters?: FilterType<TEntity>[],
    isEquals?: boolean
  ): Promise<TEntity[]>;

  /**
   * Get the entity by id
   * @param id - The id of the entity
   * @returns the entity
   */
  getOne(id: string): Promise<TEntity>;

  /**
   * Get the firebase doc id
   * @param id - The id of the entity
   * @returns the firebase doc id
   */
  getDocId(id: string): Promise<string>;

  /**
   * get the firebase collection with the filters of isDeleted = false applied
   * and the order by the createdAt field
   * return
   */
  getCollection(): firebase.firestore.Query<firebase.firestore.DocumentData>;
}
