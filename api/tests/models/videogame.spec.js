const { Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));

    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({
          description: "Juego de Mario Bros",
          realiseDate: "6/12/2021",
          rating: "4.8",
          platforms: ["PC", "Playstatio 4"],
          background_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("Should throw an error if name is not unique", () => {
        return new Promise(async (resolve, reject) => {
          await Videogame.create({
            name: "name",
            description: "Juego de Mario Bros",
            realiseDate: "6/12/2021",
            rating: "4.8",
            platforms: ["PC", "Playstatio 4"],
            background_img:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
          });
          await Videogame.create({
            name: "name",
            description: "Juego de Mario Bros",
            realiseDate: "6/12/2021",
            rating: "4.8",
            platforms: ["PC", "Playstatio 4"],
            background_img:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
          })
            .then(() => reject(new Error("name must be unique")))
            .catch(resolve);
        });
      });
    });
    describe("description", () => {
      it("should throw an error if description is null", (done) => {
        Videogame.create({
          name: "name",
          realiseDate: "6/12/2021",
          rating: "4.8",
          platforms: ["PC", "Playstatio 4"],
          background_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
        })
          .then(() => done(new Error("It requires a valid description")))
          .catch(() => done());
      });
    });

    describe("realiseDate", () => {
      it("should throw an error if realiseDate is null", (done) => {
        Videogame.create({
          name: "name",
          description: "Juego de Mario Bros",
          rating: "4.8",
          platforms: ["PC", "Playstatio 4"],
          background_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
        })
          .then(() => done(new Error("It requires a valid realiseDate")))
          .catch(() => done());
      });
    });

    describe("rating", () => {
      it("should throw an error if rating is null", (done) => {
        Videogame.create({
          name: "name",
          description: "Juego de Mario Bros",
          realiseDate: "6/12/2021",
          platforms: ["PC", "Playstatio 4"],
          background_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
        })
          .then(() => done(new Error("It requires a valid rating")))
          .catch(() => done());
      });
    });

    describe("platforms", () => {
      it("should throw an error if platforms is null", (done) => {
        Videogame.create({
          name: "name",
          description: "Juego de Mario Bros",
          realiseDate: "6/12/2021",
          rating: "4.8",
          background_img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3yEKyTrG6BEOWg1KNhyvE29NjOa3LRbT2Q&usqp=CAU",
        })
          .then(() => done(new Error("It requires a valid platforms")))
          .catch(() => done());
      });
    });
  });
  after(() => Videogame.sync({ force: true }));
});
