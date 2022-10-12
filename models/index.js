const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Beer = require('./Beer');
const Beerlist = require('./Beerlist');



User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
Beerlist.hasMany(Beer,{
    foreignKey: 'beer_id',
    onDelete: 'CASCADE'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });
Beerlist.belongsTo(User,{
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
  });
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Comment, Beer, Beerlist };