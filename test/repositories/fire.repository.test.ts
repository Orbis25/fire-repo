import FireRepository from "../../repositories/implementations/fire.repository";
import { FilterType } from "../../repositories/types";
import { DocumentData, Query, getDocs } from "firebase/firestore";

describe("FireRepository.getAll unit tests", () => {
  test("get all test with results", async () => {
    jest
      .spyOn(FireRepository.prototype, "getAll")
      .mockImplementation((filters?: FilterType<any>) => {
        return Promise.resolve([
          {
            id: "1",
            name: "test",
          },
        ]);
      });

    const results = await FireRepository.prototype.getAll();
    expect(results.length > 0).toEqual(true);
  });

  test("get all test not results", async () => {
    jest
      .spyOn(FireRepository.prototype, "getAll")
      .mockImplementation((filters?: FilterType<any>) => {
        return Promise.resolve([]);
      });

    const results = await FireRepository.prototype.getAll();
    expect(results.length > 0).toEqual(false);
  });

  test("get all test with filters", async () => {
    jest
      .spyOn(FireRepository.prototype, "getAll")
      .mockImplementation((filters?: FilterType<any>) => {
        if (filters && filters.key === "name" && filters.criteria === "test") {
          return Promise.resolve([
            {
              id: "1",
              name: "test",
            },
          ]);
        }
        return Promise.resolve([]);
      });

    const results = await FireRepository.prototype.getAll({
      key: "name",
      criteria: "test",
      isEquals: false,
    });
    expect(results.length > 0).toEqual(true);
  });

  test("get all test with filters not results", async () => {
    jest
      .spyOn(FireRepository.prototype, "getAll")
      .mockImplementation((filters?: FilterType<any>) => {
        if (filters && filters.key === "name" && filters.criteria === "test") {
          return Promise.resolve([
            {
              id: "1",
              name: "test",
            },
          ]);
        }
        return Promise.resolve([]);
      });

    const results = await FireRepository.prototype.getAll();
    expect(results.length > 0).toEqual(false);
  });
});

describe("FireRepository.getOne unit tests", () => {
  test("get one with result", () => {
    jest
      .spyOn(FireRepository.prototype, "getOne")
      .mockImplementation((id: string) => {
        return Promise.resolve({
          id: "1",
          name: "test",
        });
      });

    const result = FireRepository.prototype.getOne("1");
    expect(result).not.toBeNull();
  });

  test("get one with result", () => {
    jest
      .spyOn(FireRepository.prototype, "getOne")
      .mockImplementation((id: string) => {
        if (id === "1") {
          return Promise.resolve({
            id: "1",
            name: "test",
          });
        }
        return Promise.resolve(null);
      });

    const result = FireRepository.prototype.getOne("1");
    expect(result).not.toBeNull();
  });

  test("get one with not found", () => {
    jest
      .spyOn(FireRepository.prototype, "getOne")
      .mockImplementation((id: string) => {
        if (id === "1") {
          return Promise.resolve({
            id: "1",
            name: "test",
          });
        }
        throw new Error("not found");
      });

    const result = () => FireRepository.prototype.getOne("2");
    expect(result).toThrow(Error);
  });

  test("get one verify structure", async () => {
    jest
      .spyOn(FireRepository.prototype, "getOne")
      .mockImplementation((id: string) => {
        return Promise.resolve({
          id: "1",
          name: "test",
        });
      });

    const result = await FireRepository.prototype.getOne("1");
    expect(result.id).toBe("1");
    expect(result.name).toBe("test");
  });
});

describe("FireRepository.add unit tests", () => {
  test("add with result", () => {
    jest
      .spyOn(FireRepository.prototype, "add")
      .mockImplementation((data: any) => {
        return Promise.resolve(data);
      });

    const data = {
      name: "test",
      id: "1",
    };

    const result = FireRepository.prototype.add(data);
    expect(result).not.toBeNull();
  });

  test("add verify structure", async () => {
    jest
      .spyOn(FireRepository.prototype, "add")
      .mockImplementation((data: any) => {
        return Promise.resolve(data);
      });

    const data = {
      name: "test",
      id: "1",
    };
    const result = await FireRepository.prototype.add(data);
    expect(result.id).toBe("1");
    expect(result.name).toBe("test");
  });

  test("add with error", () => {
    jest
      .spyOn(FireRepository.prototype, "add")
      .mockImplementation((data: any) => {
        throw new Error("error");
      });

    const data = {
      name: "test",
      id: "1",
    };

    const result = () => FireRepository.prototype.add(data);
    expect(result).toThrow(Error);
  });
});

describe("FireRepository.update unit tests", () => {
  test("update success", () => {
    jest
      .spyOn(FireRepository.prototype, "update")
      .mockImplementation((id: string, data: any) => {
        return Promise.resolve(data);
      });

    const data = {
      name: "test",
      id: "1",
    };

    const result = FireRepository.prototype.update(data.id, data);
    expect(result).not.toBeNull();
  });

  test("update verify structure", async () => {
    jest
      .spyOn(FireRepository.prototype, "update")
      .mockImplementation((id: string, data: any) => {
        return Promise.resolve(data);
      });

    const data = {
      name: "test",
      id: "1",
    };
    const result = await FireRepository.prototype.update(data.id, data);
    expect(result.id).toBe("1");
    expect(result.name).toBe("test");
  });

  test("update with error", () => {
    jest
      .spyOn(FireRepository.prototype, "update")
      .mockImplementation((id: string, data: any) => {
        throw new Error("error");
      });

    const data = {
      name: "test",
      id: "1",
    };

    const result = () => FireRepository.prototype.update(data.id, data);
    expect(result).toThrow(Error);
  });
});

describe("FireRepository.deleteEntity unit tests", () => {
  test("deleteEntity success", () => {
    jest
      .spyOn(FireRepository.prototype, "deleteEntity")
      .mockImplementation(() => {
        return Promise.resolve();
      });

    FireRepository.prototype
      .deleteEntity("1")
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(() => {
        expect(true).toBe(false);
      });
  });

  test("deleteEntity with error", () => {
    jest
      .spyOn(FireRepository.prototype, "deleteEntity")
      .mockImplementation(() => {
        return Promise.reject();
      });

    FireRepository.prototype
      .deleteEntity("1")
      .then(() => {
        expect(true).toBe(false);
      })
      .catch(() => {
        expect(true).toBe(true);
      });
  });
});

describe("FireRepository.remove unit tests", () => {
  test("remove success", () => {
    jest.spyOn(FireRepository.prototype, "remove").mockImplementation(() => {
      return Promise.resolve();
    });

    FireRepository.prototype
      .remove("1")
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(() => {
        expect(true).toBe(false);
      });
  });

  test("remove with error", () => {
    jest.spyOn(FireRepository.prototype, "remove").mockImplementation(() => {
      return Promise.reject();
    });

    FireRepository.prototype
      .remove("1")
      .then(() => {
        expect(true).toBe(false);
      })
      .catch(() => {
        expect(true).toBe(true);
      });
  });
});

describe("FireRepository.getCollection unit tests", () => {
  test("getCollection test with results", async () => {
    const docD = {
      name: "test",
      id: "2",
    } as DocumentData;

    const docs = {
      ...docD,
    } as Query<DocumentData>;

    jest
      .spyOn(FireRepository.prototype, "getCollection")
      .mockImplementation(() => {
        return docs;
      });

    const results = FireRepository.prototype.getCollection();
    expect(results).toBeNull();
  });
});
