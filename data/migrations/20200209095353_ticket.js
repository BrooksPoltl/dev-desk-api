exports.up = function(knex) {
  return knex.schema.createTable('ticket', table => {
    table.increments();
    table
      .integer('assignedTo')
      .unsigned()
      .defaultsTo(0);
    table.foreign('assignedTo').references('users.id');
    table.integer('createdBy').unsigned();
    table
      .foreign('createdBy')
      .references('users.id')
      .onDelete('CASCADE');
    table.string('description', 1024).notNullable();
    table.boolean('open').defaultsTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ticket');
};
