exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          firstName: 'brooks',
          lastName: 'poltl',
          password: '1234',
          student: true,
          helper: false,
          username: 'bpoltl'
        },
        {
          id: 2,
          firstName: 'john',
          lastName: 'smith',
          password: '1234',
          student: false,
          helper: true,
          username: 'jsmith'
        },
        {
          id: 3,
          firstName: 'patrick',
          lastName: 'mahomes',
          password: '1234',
          student: true,
          helper: true,
          username: 'pmahomes'
        }
      ]);
    });
};
