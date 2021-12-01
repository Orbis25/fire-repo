import FireRepository from "../../repositories/implementations/fire.repository";
import { firebaseConfiguration } from "../../example/configuration";
import BaseModel from "../../models/base.model";

describe("FireRepository unit tests", () => {
  test("get all test with results", async () => {
    class Person extends BaseModel {
      name!: string;
    }

    class TestRepository extends FireRepository<Person> {
      constructor() {
        super(firebaseConfiguration, "/tests");
      }
    }

    const repository = new TestRepository().getAll();
    // const result = await repository.getAll();
    // expect(result).toBeTruthy();
  });
});
