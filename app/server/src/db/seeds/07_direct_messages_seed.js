exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('direct_messages').del();

  // Inserts seed entries
  await knex('direct_messages').insert([
    {
      id: 1,
      senderId: 1,
      recipientId: 2,
      workspaceId: 1,
      text: 'Hey how are you doing friend?',
    },
    {
      id: 2,
      senderId: 1,
      recipientId: 2,
      workspaceId: 1,
      text: 'Hello why you not answer? Its ok!',
    },
    {
      id: 3,
      senderId: 1,
      recipientId: 1,
      workspaceId: 1,
      text: 'note to self, come back for this convo.',
    },
    {
      id: 4,
      senderId: 2,
      recipientId: 1,
      workspaceId: 1,
      text: 'Chill bro, chill!',
    },
  ]);

  await knex.raw(
    "SELECT setval('direct_messages_id_seq', (SELECT MAX(id) FROM direct_messages))"
  );
};
