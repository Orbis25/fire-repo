import BaseModel from "../../models/base.model";

/**
 * Represent the filters to be applied to the query to get the data in repository
 */
export type FilterType<TEntity extends BaseModel> = {
  /**
   * Represent the key to be used to filter the data
   */
  key: keyof TEntity;
  /**
   * Represent the criteria to be used to filter the data
   */
  criteria: string;
  /**
   * Define if use == or contains to filter the data
   */
  isEquals?: boolean;
};
