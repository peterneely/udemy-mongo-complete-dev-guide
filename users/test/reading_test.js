const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  beforeEach(() => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });
    return Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]);
  });

  it('finds all users with a name of joe', () => {
    return User.find({ name: 'Joe' }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
    });
  });

  it('find a user with a particular id', () => {
    return User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
    });
  });

  it('can skip and limit the result set', () => {
    return User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
      });
  });
});
