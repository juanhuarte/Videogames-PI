/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Gender, conn } = require("../../src/db.js");

const agent = session(app);
const gender = {
  name: "Super Mario Bros",
};

describe("Gender routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Gender.sync({ force: true }).then(() => Gender.create(gender))
  );
  describe("GET /genres", () => {
    it("should get 200", () => agent.get("/genres").expect(200));

    it("Should return an array of Genres", () =>
      new Promise((resolve, reject) => {
        agent
          .get("/genres")
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");

            return resolve();
          });
      }));
  });

  after(() => Gender.sync({ force: true }));
});
