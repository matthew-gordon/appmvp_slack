exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('messages').del();

  // Inserts seed entries
  await knex('messages').insert([
    {
      id: 1,
      channelId: 3,
      authorId: 1,
      text: 'this is the first message!',
    },
    {
      id: 2,
      channelId: 3,
      authorId: 1,
      text: 'this is another message!',
    },
    {
      id: 3,
      channelId: 3,
      authorId: 2,
      text: 'jumping in the pool!',
    },
    {
      id: 4,
      channelId: 3,
      authorId: 2,
      text: 'feels fine!',
    },
    {
      id: 5,
      channelId: 4,
      authorId: 1,
      text: 'new deeps!',
    },
    {
      id: 6,
      channelId: 5,
      authorId: 1,
      text: 'WE LOVE THE STONKS!',
    },
    {
      id: 7,
      channelId: 5,
      authorId: 2,
      text: 'Diamond hands APE tits!',
    },
    {
      id: 8,
      channelId: 5,
      authorId: 2,
      text: 'wow',
    },
  ]);

  await knex.raw(
    "SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))"
  );
};
