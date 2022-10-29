# Configuración inicial

```ts
import { initializeApp } from "firebase/app";

//configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const collection = "/test";

//initialize
export const firebaseConfiguration = initializeApp(firebaseConfig);
```

# Ejemplo de uso

```ts
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
```
