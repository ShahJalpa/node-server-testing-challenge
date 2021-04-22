
exports.up = function(knex) {
  return knex.schema.createTable('dances', tbl => {
      tbl.increments();
      tbl.string('dance_name', 255).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('dances');
};
