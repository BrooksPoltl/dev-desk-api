exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('category').insert([
        { ticket: 1, category: 'react' },
        { ticket: 1, category: 'frontend' },
        { ticket: 1, category: 'create-react-app' },
        { ticket: 2, category: 'docker' },
        { ticket: 2, category: 'devops' },
        { ticket: 2, category: 'environment' },
        { ticket: 3, category: 'heroku' },
        { ticket: 3, category: 'devops' },
        { ticket: 3, category: 'database' }
      ]);
    });
};
