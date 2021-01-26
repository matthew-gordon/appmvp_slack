exports.up = function (knex) {
  return knex.schema.createTable('workspaces', (table) => {
    table.increments();
    table.text('name').unique().notNullable();
    table.text('cname').unique().notNullable();
    table
      .integer('ownerId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('workspaces');
};
