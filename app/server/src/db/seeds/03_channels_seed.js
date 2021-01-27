exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('channels').del();

  // Inserts seed entries
  await knex('channels').insert([
    {
      id: 1,
      workspaceId: 1,
      name: 'general',
    },
    {
      id: 2,
      workspaceId: 1,
      name: 'random',
    },
    {
      id: 3,
      workspaceId: 2,
      name: 'general',
    },
    {
      id: 4,
      workspaceId: 2,
      name: 'random',
    },
    {
      id: 5,
      workspaceId: 2,
      name: 'weekly jams',
    },
  ]);

  await knex.raw(
    "SELECT setval('channels_id_seq', (SELECT MAX(id) FROM channels))"
  );
};
