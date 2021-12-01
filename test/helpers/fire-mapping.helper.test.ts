import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotMetadata,
  Timestamp,
} from "firebase/firestore";
import BaseModel from "../../models/base.model";
import {
  toEntityArray,
  getFormateadFirebaseData,
} from "../../helpers/fire-mapping.helper";

describe("toEntityArray", () => {
  test("convert to typed array correct with returns", () => {
    class TestClass extends BaseModel {
      name!: string;
    }

    const docD = {
      name: "test",
      id: "2",
    } as DocumentData;

    const docs = [] as QueryDocumentSnapshot<DocumentData>[];
    docs.push({
      data: () => docD,
      id: "1",
      ref: {} as any,
      exists: () => true,
      get: () => docD,
      metadata: {} as SnapshotMetadata,
    });

    expect(toEntityArray<TestClass>(docs as any).length).toBe(1);
  });

  test("verify the structure", () => {
    class TestClass extends BaseModel {
      name!: string;
    }

    const docD = {
      name: "test",
      id: "2",
    } as DocumentData;

    const docs = [] as QueryDocumentSnapshot<DocumentData>[];
    docs.push({
      data: () => docD,
      id: "1",
      ref: {} as any,
      exists: () => true,
      get: () => docD,
      metadata: {} as SnapshotMetadata,
    });

    const results = toEntityArray<TestClass>(docs as any);
    expect(results[0].name).toBe(docD.name);
    expect(results[0].id).toBe(docD.id);
  });
});

describe("getFormateadFirebaseData", () => {
  test("format timestamp firebase to js date", () => {
    const data = {
      date: new Timestamp(Timestamp.now().seconds, 0),
      id: "1",
    };
    var result = getFormateadFirebaseData<{ date: Date; id: string }>(data);
    expect(result.date instanceof Date).toBe(true);
  });
});
