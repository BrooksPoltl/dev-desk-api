exports.up = function(knex) {
  return knex.schema.createTable('category', table => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('ticket').unsigned();
    table
      .foreign('ticket')
      .references('ticket.id')
      .onDelete('CASCADE');
    table.string('category', 25).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('category');
};
