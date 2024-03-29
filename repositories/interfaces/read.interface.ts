import { Query } from "@firebase/firestore";
import { DocumentData } from "firebase/firestore";

import { FilterType } from "../types";
import BaseModel from "../../models/base.model";
/**
 * Represent the read interface base from the repository
 */
export interface IRead<TEntity extends BaseModel> {
  /**
   * Get all the entities
   * @param filters - The filters to apply
   * @param disableOrderBy - Disable the order by
   * @returns list of entities
   */
  getAll(
    filters?: FilterType<TEntity>,
    disableOrderBy?: boolean
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
   * @param disableOrderBy - Disable the order by createdAt
   * @return the firebase collection
   */
  getCollection(ordered?: boolean): Query<DocumentData>;
}
