/**
 * @author Orbis Alonzo Gutierrez
 * @license MIT
 * @version 1.0.0
 * @copyright Orbis Alonzo Gutierrez
 * @creationDate 27/11/2021
 * @github Orbis25
 */

import FireRepository from "./repositories/implementations/fire.repository";
import BaseModel from "./models/base.model";

import {
  fileUpload,
  getFormateadFirebaseData,
  removeFile,
  toEntityArray,
} from "./helpers/index";

const Helpers = {
  fileUpload,
  getFormateadFirebaseData,
  removeFile,
  toEntityArray,
};

export { FireRepository, BaseModel, Helpers };
