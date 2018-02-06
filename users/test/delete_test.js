const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach(() => {
    joe = new User({ name: 'Joe' });
    return joe.save();
  });

  it('model instance remove', () => {
    return joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
      });
  });

  it('class method remove', () => {
    // Remove a bunch of records with some given criteria
    return User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
      });
  });

  it('class method findOneAndRemove', () => {
    return User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
      });
  });

  it('class method findByIdAndRemove', () => {
    return User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
      });
  });
});
