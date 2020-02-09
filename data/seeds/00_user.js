exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstName: 'brooks',
          lastName: 'poltl',
          password: '1234',
          student: true,
          helper: false,
          username: 'bpoltl'
        },
        {
          firstName: 'john',
          lastName: 'smith',
          password: '1234',
          student: false,
          helper: true,
          username: 'jsmith'
        },
        {
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
