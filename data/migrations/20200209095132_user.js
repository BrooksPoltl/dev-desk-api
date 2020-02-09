exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('firstName', 25).notNullable();
    table.string('lastName', 25).notNullable();
    table
      .string('username', 25)
      .notNullable()
      .unique();
    table.string('password', 200).notNullable();
    table.boolean('student').defaultTo(false);
    table.boolean('helper').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
