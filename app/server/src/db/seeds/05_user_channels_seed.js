exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('user_channels').del();

  // Inserts seed entries
  await knex('user_channels').insert([
    {
      id: 1,
      userId: 1,
      channelId: 1,
    },
    {
      id: 2,
      userId: 1,
      channelId: 2,
    },
  ]);

  await knex.raw(
    "SELECT setval('user_channels_id_seq', (SELECT MAX(id) FROM user_channels))"
  );
};
