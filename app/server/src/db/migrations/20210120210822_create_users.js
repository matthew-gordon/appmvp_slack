exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('username').unique().notNullable();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.enum('role', ['ADMIN', 'USER']).defaultTo('USER');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
