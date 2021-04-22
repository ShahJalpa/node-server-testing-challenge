const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('dances')
}

function getById(id) {
  return null
}

async function insert(dances) {
    const [id] = await db("dances").insert(dances)
    return db("dances").where({id}).first()
}

async function update(id, changes) {
  return db("dances").update(changes).where({id})
}

function remove(id) {
  return null
}
