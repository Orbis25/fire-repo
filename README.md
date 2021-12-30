# FIRE-REPO 🔥

This library is an implementation of the firebase repository pattern and some helpers to facilitate the work of developers using firebase. - (ts projects only)

[![Main actions](https://github.com/Orbis25/fire-repo/actions/workflows/main.yml/badge.svg)](https://github.com/Orbis25/fire-repo/actions/workflows/main.yml)

`npm i fire-repo`

or

`yarn add fire-repo`

## Table of Contents

- [FIRE-REPO 🔥](#fire-repo-)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Libraries](#libraries)
  - [Project structure](#project-structure)
  - [Use](#use)
    - [Methods](#methods)
    - [Helpers](#helpers)
  - [Contribution](#contribution)
    - [Branches](#branches)
    - [Report an issuer](#report-an-issuer)

## Installation

Only you need download the code and install the dependencies running the command `npm install`.

## Libraries

The used libraries are:

- [Firebase](https://www.npmjs.com/package/firebase/v/9.5.0)
- [uuid](https://www.npmjs.com/package/uuid/v/8.3.2)
- [Jest](https://www.npmjs.com/package/jest/v/27.4.2)
- [jest-junit](https://github.com/palmerj3/jest-junit)

## Project structure

- 📁 `.github` : Contains the github actions configurations.
- 📁 `example` : Contains the example of usage from library.

  - ts `configuration.ts` : Example of configuration.
  - ts `index.ts` : Example of usage.

- 📁 `helpers` : Contains the helpers of library.

  - ts `fire-file.helper.ts` : Helper to work with firebase files.
  - ts `fire-mapping.helper.ts` : Helper to mapping the firebase data.
  - ts `index.ts` : Export the helpers.

- 📁 `models` : Contains the models of library

  - ts `base.model.ts` : Base model.

- 📁 `repositories` : Contains the repositories of library
  - 📁 `implementations`: Contains the implementations of repositories.
  - 📁 `interfaces` : Contains the interfaces of library.
    - ts `index.ts` : Export the interfaces.
    - ts `read.interface.ts` : Interface to read data.
    - ts `write.interface.ts` : Interface to write data.
  - 📁 `types`: Contains the types of library.
    - ts `filter.type.ts`: Type to filter data.
    - ts `index.ts`: Export the types.
- 📁 `test`
  - 📁 `helpers`: Contains the test of helpers.
  - 📁 `repositories`: Contains the test of repositories

## Use

For use the library in you project you need install the fire-repo library running the command `npm i fire-repo` and import the library in your project.

```ts
import { FireRepository } from "fire-repo";
import { BaseModel } from "fire-repo";
```

Create your model extending the base model.

```ts
class User extends BaseModel {
  name: string;
  email: string;
}
```

Create your service class for work with the repository and manage the entity and data.

```ts
class UserService extends FireRepository<User> {
  constructor() {
    /**
     * @param {initializeApp} firebaseConfiguration firebase configuration
     * @param {string} collection firebase collection "/test"
     */
    super(firebaseConfiguration, collection);
  }
}
```

### Methods

- `add`: Create a new entity.
- `update`: Update an entity.
- `deleteEntity`: Delete an entity.
- `remove`: Applied the soft delete a entity.
- `getAll`: Get all entities.
- `getOne`: Get One entity.
- `getDocId`: Get the document id.
- `getCollection`: Get the collection.

### Helpers

- `fileUpload`: Upload a file to firebase storage.
- `removeFile`: Remove a file from firebase storage.
- `toEntityArray`: Convert an array of firebase data to an array of entities.
- `getFormateadFirebaseData`: Format the retrieved data from firebase. (Date - timestamp)

## Contribution

If you want to contribute to the library you can create a branch in the repository and send a pull request. Remember create great unit tests and documentation updates.

### Branches

Remember usage this structure:

- `feature/[name]`
- `fix/[name]`
- `bug/[name]`

### Report an issuer

If you have an issue or a problem with the library you can report it in the [issues](https://github.com/Orbis25/fire-repo/issues)
