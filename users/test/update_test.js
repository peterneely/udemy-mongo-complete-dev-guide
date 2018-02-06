const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(() => {
    joe = new User({ name: 'Joe', likes: 0 });
    return joe.save();
  });

  function assertName(operation) {
    return operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
      });
  }

  it('instance type using set n save', () => {
    joe.set('name', 'Alex');
    assertName(joe.save());
  });

  it('A model instance can update', () => {
    assertName(joe.update({ name: 'Alex' }));
  });

  it('A model class can update', () => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }));
  });

  it('A model class can update one record', () => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }));
  });

  it('A model class can find a record with an Id and update', () => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }));
  });

  it('A user can have their postcount incremented by 1', () => {
    return User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
      });
  });
});
