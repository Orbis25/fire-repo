import { v4 as uuidv4 } from "uuid";

/**
 * Represent the base model of the entities
 */
export default class BaseModel {
  constructor() {
    this.createdAt = new Date();
    this.id = uuidv4();
  }

  /**
   * Id of the entity
   * */
  id!: string;
  /**
   * Created date of the entity
   */
  createdAt?: Date;
  /**
   * Updated date of the entity
   */
  updatedAt?: Date;
  /**
   * User Created id of the entity
   */
  createdBy!: string;
  /**
   * User Updated id of the entity
   */
  updatedBy?: string;

  /**
   * Flag to indicate if the entity is deleted
   * */
  isDeleted = false;
}
