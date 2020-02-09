exports.up = function(knex) {
  return knex.schema.createTable('ticket', table => {
    table
      .increments('id')
      .unique()
      .primary();
    table
      .integer('assignedTo')
      .unsigned()
      .defaultsTo(0);
    table.foreign('assignedTo').references('user.id');
    table.integer('createdBy').unsigned();
    table
      .foreign('createdBy')
      .references('user.id')
      .onDelete('CASCADE');
    table.string('description', 1024).notNullable();
    table.boolean('open').defaultsTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ticket');
};
