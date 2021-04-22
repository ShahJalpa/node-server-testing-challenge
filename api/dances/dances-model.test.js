const Dances = require('./dances-model.js')
const db = require('../../data/dbConfig.js')

const bnm = {dance_name: "Bharatnatyam"}
const hphp = {dance_name: "Hip-Hop"}

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=>{
    await db("dances").truncate()
})
afterAll(async ()=>{
    await db.destroy()
})

it("correct env", ()=>{
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Dances model", () => {
    describe("insert function", () => {
        it("adds dances to db", async () => {
            let all 
            await Dances.insert(bnm)
            all = await db("dances")
            expect(all).toHaveLength(1)

            await Dances.insert(hphp)
            all = await db("dances")
            expect(all).toHaveLength(2)
        })
        it("values of dances", async () => {
            const dance = await Dances.insert(bnm)
            expect(dance).toMatchObject({id:1, ...bnm})
        })
    })
    describe("update function", () => {
        it("update the dance", async () => {
            const [id] = await db("dances").insert(bnm)
            await Dances.update(id, {dance_name: "Bharatnatyam"})
            const updated = await db("dances").where({id}).first()
            expect(updated.dance_name).toBe("Bharatnatyam")
        })
        it("check the updated dance", async () => {
            const [id] = await db("dances").insert(bnm)
            await Dances.update(id, {dance_name: "Bharatnatyam"})
            const updated = await db("dances").where({id}).first()
            expect(updated).toMatchObject({id:id, dance_name:"Bharatnatyam"})
        })
    })
})