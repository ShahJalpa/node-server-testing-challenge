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
    describe('[GET] /', () => {
        it('responds with 200 ok', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })
})