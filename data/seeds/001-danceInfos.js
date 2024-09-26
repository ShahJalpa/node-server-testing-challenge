
exports.seed = function(knex) {
  return knex('dances')
    .truncate()
    .then(function() {
      return knex('dances').insert([
        {dance_name: "Jazz"},
        {dance_name: "Bharatnatyam"},
        {dance_name: "Hip-Hop"},
        {dance_name: "Kuchipudi"},
      ]);
    });
};
