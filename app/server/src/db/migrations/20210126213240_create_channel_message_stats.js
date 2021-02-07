exports.up = function (knex) {
  return knex.schema.createTable('channel_message_stats', (table) => {
    table.increments();
    table.integer('userId').references('users.id').onDelete('CASCADE');
    table.integer('channelId').references('channels.id').onDelete('CASCADE');
    table.integer('messageId').references('messages.id').onDelete('CASCADE');
    table.boolean('read').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('channel_message_stats');
};
