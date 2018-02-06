const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middlware', () => {
  let joe, blogPost;

  beforeEach(() => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    joe.blogPosts.push(blogPost);
    return Promise.all([joe.save(), blogPost.save()]);
  });

  it('users clean up dangling blogposts on remove', () => {
    return joe.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
      });
  });
});
