exports.up = function (knex) {
  return knex.schema.createTable('channels', (table) => {
    table.increments();
    table.text('name').notNullable();
    table
      .integer('workspaceId')
      .notNullable()
      .references('workspaces.id')
      .onDelete('CASCADE');
    table.boolean('public').defaultTo(true);
    table.unique(['workspaceId', 'name']);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('channels');
};
