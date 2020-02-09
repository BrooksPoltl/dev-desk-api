exports.up = function(knex) {
  return knex.schema.createTable('user', table => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('firstName', 25).notNullable();
    table.string('lastName', 25).notNullable();
    table
      .string('username', 25)
      .notNullable()
      .unique();
    table.string('password', 25).notNullable();
    table.boolean('student').defaultTo(false);
    table.boolean('helper').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
