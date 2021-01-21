exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: 'new_user',
          email: 'user@email.com',
          password: 'password123',
        },
      ]);
    });
};
