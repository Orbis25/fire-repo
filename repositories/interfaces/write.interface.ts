import BaseModel from "../../models/base.model";

/**
 * Represent the Write interface base from the repository
 */
export interface IWrite<TEntity extends BaseModel> {
  /**
   * Add a new entity
   * @param entity
   */
  add(entity: TEntity): Promise<TEntity>;
  /**
   * Update an entity
   * @param id id of the entity to update
   * @param entity entity to update
   */
  update(id: string, entity: TEntity): Promise<TEntity>;
  /**
   * Update an entity
   * @param entity entity to update
   */
  update(entity: TEntity): Promise<TEntity>;
  /**
   * Delete an entity
   * @param id id of the entity to delete
   * */
  delete(id: string): Promise<void>;
  /**
   * Applied soft delete to an entity
   * @param id id of the entity
   */
  remove(id: string): Promise<void>;
}
