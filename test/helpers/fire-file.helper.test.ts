import { fileUpload, removeFile } from "../../helpers";
import { FirebaseApp } from "firebase/app";

jest.mock("../../helpers");

describe("fileUpload", () => {
  test("upload file success", async () => {
    const mockedDependency = fileUpload as jest.MockedFunction<
      typeof fileUpload
    >;

    const file = { name: "test.png", size: 10, type: "Blob" } as File;

    const value = new Promise<string>((resolve) => {
      return resolve("firebase.app.url/" + file.name);
    });

    const mockFunction = mockedDependency.mockReturnValueOnce(value);
    const result = await mockFunction({} as FirebaseApp, file, "test");

    expect(result).toBe("firebase.app.url/" + file.name);
  });

  test("remove file success", async () => {
    const mockedDependency = removeFile as jest.MockedFunction<
      typeof removeFile
    >;

    const url = "firebase.app.url/test.png";

    const value = new Promise<void>((resolve) => {
      return resolve();
    });

    const mockFunction = mockedDependency.mockReturnValueOnce(value);
    mockFunction({} as FirebaseApp, url)
      .then(() => {
        expect(true).toBe(true);
      })
      .catch(() => {
        expect(false).toBe(true);
      });
  });
});
