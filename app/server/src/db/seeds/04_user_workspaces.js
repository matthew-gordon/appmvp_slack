exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('user_workspaces').del();

  // Inserts seed entries
  await knex('user_workspaces').insert([
    {
      id: 1,
      userId: 1,
      workspaceId: 1,
    },
    {
      id: 2,
      userId: 1,
      workspaceId: 2,
    },
    {
      id: 3,
      userId: 2,
      workspaceId: 1,
    },
    {
      id: 4,
      userId: 2,
      workspaceId: 2,
    },
  ]);

  await knex.raw(
    "SELECT setval('user_workspaces_id_seq', (SELECT MAX(id) FROM user_workspaces))"
  );
};
