exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table
      .integer('channelId')
      .notNullable()
      .references('channels.id')
      .onDelete('CASCADE');
    table.integer('authorId').references('users.id').onDelete('CASCADE');
    table.text('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
