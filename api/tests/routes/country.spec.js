/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, Activity, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err)
    })
  )
  describe("GET /countries", () => {
    it("should get 200", (done) => { agent.get("/api/countries/").expect(200), done()})
    it('responds with 200', () => { agent.get('/api/countries?page=all').expect(200)});
    it('responds with 200', () => { agent.get('/api/countries/arg').expect(200)});
  })
})

describe("Activity routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err)
    })
  )
  beforeEach(() =>
    Activity.sync({ force: true }).then(() => Activity.create(
      {where:{ 
        name: "skii",
        difficulty: "1",
        duration: "10",
      }}))
  )


  describe("POST /api/activities", () => {

    it("should get 200", (done) => {agent.post("/api/activity/country").send({
      name: "skii",
      difficulty: "1",
      duration: "10",
      country:"Argentina"
      // season: "Summer"
    }).expect(200), done()})

    it('responds with 400 if it`s doesn`t object', () =>
    agent.post('/activities')
      .send([{
        name: 2,
        difficulty: 7,
        duration: "10",
        // season: "Summer"
      }])
      .expect(404));
  })
})