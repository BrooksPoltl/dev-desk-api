exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ticket')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('ticket').insert([
        {
          id: 1,
          createdBy: 1,
          description: 'cant get create react app to work.',
          open: true
        },
        {
          id: 2,
          assignedTo: 3,
          createdBy: 1,
          description: 'docker is really hard pls help.',
          open: true
        },
        {
          id: 3,
          assignedTo: 2,
          createdBy: 3,
          description: 'Having trouble getting my heroku app to deploy',
          open: false
        }
      ]);
    });
};
