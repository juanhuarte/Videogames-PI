const { Gender, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Gender model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Gender.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Gender.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Should throw an error if name is not unique", () => {
        return new Promise(async (resolve, reject) => {
          await Gender.create({ name: "name" });
          await Gender.create({ name: "name" })
            .then(() => reject(new Error("name must be unique")))
            .catch(resolve);
        });
      });
    });
  });
  after(() => Gender.sync({ force: true }));
});
