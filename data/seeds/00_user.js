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
          password:
            '$2a$12$WoxbeSd5k1eFSBlVECGxmertZnfmeBt2ZuKnXtZBBgFCVa.HCxYzC',
          student: true,
          helper: false,
          username: 'bpoltl'
        },
        {
          firstName: 'john',
          lastName: 'smith',
          password:
            '$2a$12$WoxbeSd5k1eFSBlVECGxmertZnfmeBt2ZuKnXtZBBgFCVa.HCxYzC',
          student: false,
          helper: true,
          username: 'jsmith'
        },
        {
          firstName: 'patrick',
          lastName: 'mahomes',
          password:
            '$2a$12$WoxbeSd5k1eFSBlVECGxmertZnfmeBt2ZuKnXtZBBgFCVa.HCxYzC',
          student: true,
          helper: true,
          username: 'pmahomes'
        }
      ]);
    });
};
