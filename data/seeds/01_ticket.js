exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ticket')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('ticket').insert([
        {
          createdBy: 1,
          description: 'cant get create react app to work.',
          open: true
        },
        {
          assignedTo: 3,
          createdBy: 1,
          description: 'docker is really hard pls help.',
          open: true
        },
        {
          assignedTo: 2,
          createdBy: 3,
          description: 'Having trouble getting my heroku app to deploy',
          open: false
        }
      ]);
    });
};
