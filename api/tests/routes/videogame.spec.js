/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, Gender, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "Juego de Mario Bros",
  realiseDate: "6/12/2021",
  rating: "4.8",
  platforms: ["PC", "Playstatio 4"],
  background_img:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
};

describe("Videogame routes", () => {
  let videogameID;
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(async () => {
      videogameID = await Videogame.create(videogame).id;
    })
  );

  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));

    it("Should return an array of Videogames", () =>
      new Promise((resolve, reject) => {
        agent
          .get("/videogames")
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");
            expect(res.body[0]).to.have.property("description");
            expect(res.body[0]).to.have.property("realiseDate");
            expect(res.body[0]).to.have.property("rating");
            expect(res.body[0]).to.have.property("platforms");
            expect(res.body[0].platforms).to.be.an("array");
            expect(res.body[0]).to.have.property("background_img");
            return resolve();
          });
      }));
  });

  describe("GET /videogame/:idVideogame", () => {
    it("Should return one object of a Videogame from DB", () =>
      new Promise((resolve, reject) => {
        agent
          .get(`/videogame/${videogameID}`)
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("object");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");
            expect(res.body[0]).to.have.property("description");
            expect(res.body[0]).to.have.property("realiseDate");
            expect(res.body[0]).to.have.property("rating");
            expect(res.body[0]).to.have.property("platforms");
            expect(res.body[0].platforms).to.be.an("array");
            expect(res.body[0]).to.have.property("background_img");
            return resolve();
          });
      }));
    it("Should return one object of a Videogame from API", () =>
      new Promise((resolve, reject) => {
        agent
          .get("/videogame/3498")
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("object");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");
            expect(res.body[0]).to.have.property("description");
            expect(res.body[0]).to.have.property("realiseDate");
            expect(res.body[0]).to.have.property("rating");
            expect(res.body[0]).to.have.property("platforms");
            expect(res.body[0].platforms).to.be.an("array");
            expect(res.body[0]).to.have.property("background_img");
            return resolve();
          });
      }));

    it("Should return an error 404 if ID is not found on DB", () =>
      agent.get(`/videogame/notAValidID`).expect(404));

    it("Should return an error 404 if ID is not found on API", () =>
      agent.get("/videogame/notAValidID").expect(404));
  });

  describe("POST /videogame", () => {
    it("Should create new Videogame on DB", () => {
      return new Promise(async (resolve, reject) => {
        try {
          await Gender.create({ name: "Action" });
          await agent
            .post("/videogame")
            .send({ ...videogame, name: "Mario cars", gender: ["Action"] })
            .expect(200)
            .then(async (res) => {
              expect(res.body).to.be.an("object");
              expect(res.body[0]).to.have.property("id");
              expect(res.body[0]).to.have.property("name");
              expect(res.body[0]).to.have.property("description");
              expect(res.body[0]).to.have.property("realiseDate");
              expect(res.body[0]).to.have.property("rating");
              expect(res.body[0]).to.have.property("platforms");
              expect(res.body[0].platforms).to.be.an("array");
              expect(res.body[0]).to.have.property("gender");
              expect(res.body[0].gender).to.be.an("array");
              expect(res.body[0].gender[0]).to.be.equal("Action");
              expect(res.body[0]).to.have.property("background_img");
            });
          return resolve();
        } catch (err) {
          return reject(err);
        }
      });
    });
  });

  after(() => {
    Videogame.sync({ force: true });
    Gender.sync({ force: true });
  });
});
