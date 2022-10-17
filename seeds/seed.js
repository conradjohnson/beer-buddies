const sequelize = require('../config/connection');
const { User, Post, Comment, Beer, Beerlist } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const beerData = require('./beerData.json');
const beerlistData = require('./beerlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData){
    await User.create ({
      ...user
    }, {
      individualHooks: true,
      returning: true
    })
  }
  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: 1,
    });
  }
  const comments = await Comment.bulkCreate(commentData,{
        individualHooks: true,
        returning: true,
      });
  const beers = await Beer.bulkCreate(beerData,{
        individualHooks: true,
        returning: true,
      });
  const beerlist = await Beerlist.bulkCreate(beerlistData, {
        individualHooks: true,
        returning: true,
      });

  process.exit(0);
};

seedDatabase();
