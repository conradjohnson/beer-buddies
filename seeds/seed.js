const sequelize = require('../config/connection');
const { User, Post, Comment, Beer, Beerlist } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const beerData = require('./beerData.json');
const beerlistData = require('./beerlistData.json');

const seedDatabase = async () => {
 await sequelize.sync({ force: true });
//  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
//  .then(function(){
//      return sequelize.sync({ force: true });
//  })
//  .then(function(){
//      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
//  })
//  .then(function(){
//      console.log('Database synchronised.');
//  }, function(err){
//      console.log(err);
//  });
  // for (const user of userData){
  //   await User.create ({
  //     ...user
  //   }, {
  //     individualHooks: true,
  //     returning: true
  //   })
  // }

  
  // for (const post of postData) {
  //   await Post.create({
  //     ...post,
  //     user_id: 1,
  //   });
  // }
  // const comments = await Comment.bulkCreate(commentData,{
  //       individualHooks: true,
  //       returning: true,
  //     });
  const beers = await Beer.bulkCreate(beerData,{
        individualHooks: true,
        returning: true,
      });
  // const beerlist = await Beerlist.bulkCreate(beerlistData, {
  //       individualHooks: true,
  //       returning: true,
  //     });

  process.exit(0);
};

seedDatabase();
