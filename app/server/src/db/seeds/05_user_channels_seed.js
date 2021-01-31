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
    {
      id: 3,
      userId: 1,
      channelId: 3,
    },
    {
      id: 4,
      userId: 1,
      channelId: 4,
    },
    {
      id: 5,
      userId: 1,
      channelId: 5,
    },
    {
      id: 6,
      userId: 2,
      channelId: 1,
    },
    {
      id: 7,
      userId: 2,
      channelId: 2,
    },
    {
      id: 8,
      userId: 2,
      channelId: 3,
    },
    {
      id: 9,
      userId: 2,
      channelId: 4,
    },
    {
      id: 10,
      userId: 2,
      channelId: 5,
    },
  ]);

  await knex.raw(
    "SELECT setval('user_channels_id_seq', (SELECT MAX(id) FROM user_channels))"
  );
};
