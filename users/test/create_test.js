const assert = require('assert');
const mongoose = require('mongoose');
// const User = require('../src/user');
const User = require('mongoose').model('user'); // Another way of getting mongoose model

describe('Creating records', () => {
  it('saves a user', () => {
    const joe = new User({ name: 'Joe' });
    assert(joe.isNew);
    return joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew);
        // done();
      });
  });
});
