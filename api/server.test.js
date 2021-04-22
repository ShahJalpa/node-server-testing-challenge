const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('./server.js')

const bnm = {dance_name: "Bharatnatyam"}
const hphp = {dance_name: "Hip-Hop"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=>{
    await db("dances").truncate()
})
afterAll(async ()=>{
    await db.destroy()
})

describe('server', () => {
    describe('[GET] /dances', () => {
        it('responds with 200 ok', async () => {
            const res = await request(server).get('/dances')
            expect(res.status).toBe(200)
        })
        it("returns right num o dances", async ()=>{
            let res 
            await db("dances").insert(bnm)
            res = await request(server).get("/dances")
            expect(res.body).toHaveLength(1)

            await db("dances").insert(hphp)
            res = await request(server).get("/dances")
            expect(res.body).toHaveLength(2)
        })
        it("returns right format for dances", async ()=>{
            await db("dances").insert(bnm)
            await db("dances").insert(hphp)
            const res = await request(server).get("/dances")
            expect(res.body[0]).toMatchObject({id:1, ...bnm})
            expect(res.body[1]).toMatchObject({id:2, ...hphp})
        })
    })
    describe("[POST] /dances", ()=>{
        it("resopnds with newly created dance", async ()=>{
            let res 
            res = await request(server).post("/dances").send(bnm)
            expect(res.body).toMatchObject({id:1, ...bnm})

            res = await request(server).post("/dances").send(hphp)
            expect(res.body).toMatchObject({id:2, ...hphp})
        })
    })
})