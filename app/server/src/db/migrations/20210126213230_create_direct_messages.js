exports.up = function (knex) {
  return knex.schema.createTable('direct_messages', (table) => {
    table.increments();
    table.integer('senderId').references('users.id').onDelete('CASCADE');
    table.integer('recipientId').references('users.id').onDelete('CASCADE');
    table
      .integer('workspaceId')
      .references('workspaces.id')
      .onDelete('CASCADE');
    table.text('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('direct_messages');
};
