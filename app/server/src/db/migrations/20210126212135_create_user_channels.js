exports.up = function (knex) {
  return knex.schema.createTable('user_channels', (table) => {
    table.increments();
    table
      .integer('channelId')
      .notNullable()
      .references('channels.id')
      .onDelete('CASCADE');
    table
      .integer('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_channels');
};
