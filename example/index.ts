import BaseModel from "../models/base.model";
import { FireRepository } from "../index";
import { firebaseConfiguration, collection } from "./configuration";

/**
 * Create a model
 */

class Person extends BaseModel {
  name!: string;
}

/**
 * Create a class
 */

class PersonService extends FireRepository<Person> {
  constructor() {
    super(firebaseConfiguration, collection);
  }
}

/**
 * Usage
 */

const service = new PersonService();

service.getAll().then((x) => {
  console.log(x);
});
