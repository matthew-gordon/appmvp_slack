exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('workspaces').del();

  // Inserts seed entries
  await knex('workspaces').insert([
    {
      id: 1,
      name: 'greenside',
      cname: 'greenside',
      ownerId: 1,
      created_at: new Date('10/05/2019').toISOString(),
      updated_at: new Date('10/05/2019').toISOString(),
    },
    {
      id: 2,
      name: 'apollo',
      cname: 'apollo',
      ownerId: 1,
      created_at: new Date('10/05/2019').toISOString(),
      updated_at: new Date('10/05/2019').toISOString(),
    },
  ]);

  await knex.raw(
    "SELECT setval('workspaces_id_seq', (SELECT MAX(id) FROM workspaces))"
  );
};
