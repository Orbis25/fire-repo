import BaseModel from "../models/base.model";
import { FireRepository } from "../index";
import { firebaseConfiguration, collection } from "./configuration";

/**
 * Create a model
 */

class Person extends BaseModel {
  name!: string;
  constructor(name: string) {
    super();
    Object.assign(this, { name });
  }
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

service
  .getAll({
    key: "name",
    criteria: "John Doe",
  })
  .then((x) => {
    console.log(x);
  })
  .catch((e) => {
    console.log(e);
  });
