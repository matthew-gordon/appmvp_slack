const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync('password123', salt);

  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users')
        .insert([
          {
            id: 1,
            username: 'mateo',
            email: 'user@email.com',
            role: 'ADMIN',
            password: hash,
          },
          {
            id: 2,
            username: 'brian',
            email: 'brian@email.com',
            role: 'USER',
            password: hash,
          },
        ])
        .then(() =>
          knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
        );
    });
};
