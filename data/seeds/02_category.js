exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('category').insert([
        { id: 1, ticket: 1, category: 'react' },
        { id: 2, ticket: 1, category: 'frontend' },
        { id: 3, ticket: 1, category: 'create-react-app' },
        { id: 4, ticket: 2, category: 'docker' },
        { id: 5, ticket: 2, category: 'devops' },
        { id: 6, ticket: 2, category: 'environment' },
        { id: 7, ticket: 3, category: 'heroku' },
        { id: 8, ticket: 3, category: 'devops' },
        { id: 9, ticket: 3, category: 'database' }
      ]);
    });
};
