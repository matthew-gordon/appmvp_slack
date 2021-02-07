exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('channel_message_stats').del();

  // Inserts seed entries
  await knex('channel_message_stats').insert([
    {
      id: 1,
      channelId: 5,
      userId: 1,
      messageId: 7,
      read: false,
    },
  ]);

  await knex.raw(
    "SELECT setval('channel_message_stats_id_seq', (SELECT MAX(id) FROM channel_message_stats))"
  );
};
