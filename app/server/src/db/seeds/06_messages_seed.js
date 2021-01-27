exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('messages').del();

  // Inserts seed entries
  await knex('messages').insert([
    {
      id: 1,
      channelId: 1,
      authorId: 1,
      text: 'this is the first message!',
    },
    {
      id: 2,
      channelId: 1,
      authorId: 1,
      text: 'this is another message!',
    },
  ]);

  await knex.raw(
    "SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))"
  );
};
