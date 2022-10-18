const router = require('express').Router();
const { User, Post, Comment, Beerlist, Beer } = require('../models');
const withAuth = require('../utils/auth');


// we can send an array of functions to check various things.  In this case,
// we're only sending one function 'withAuth' to use when getting the '/' path in our 
// webapp.  'withAuth' is checking to see if the req.session.logged_in is set to true. 
// if it is set to true, it allows the request to proceed to our async function. 
router.get('/',  async (req, res) => {
  try {
    
    // get posts data
    const postData = await Post.findAll({
      order: [['title', 'ASC']],
      include:[{
        model: Comment,
        order: [['date_created', 'ASC']]
      }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    //console.log(posts);

    //get beerleader board data.
    // needs more intelligence to count of checked functionality grouped by user to limit the user object.
    const beerLeaderboardData = await Beerlist.findAll({
      order:[['user_id', 'ASC'], ['beer_id', 'ASC']],
      include:[{model:User}],
      
    })
    const beerLeaderboard = beerLeaderboardData.map((blb) => blb.get({plain: true}));
    const leaderboardList = [];
    let current_user_id = beerLeaderboard[0].user_id;
   
    let listObj = {
      user_id: current_user_id,
      user: beerLeaderboard[0].user.username,
    }
    let total_beer_count = 0;
    let drank_count =0;
    for (let i=0; i<beerLeaderboard.length; i++){
      
      if (current_user_id === beerLeaderboard[i].user_id){
        total_beer_count++;
          if (beerLeaderboard[i].drank){
            drank_count++;
          }
      } else{
        //add beercounts to object
        let beerCounts = {
          total_beers: total_beer_count,
          drank_beers: drank_count 
        }
        listObj = Object.assign(listObj, beerCounts);
        
        //add object to leaderboardList array
        leaderboardList.push(listObj);
        // set new current_user_id
        current_user_id = beerLeaderboard[i].user_id;

        // set total beer and drank count to 1 and 1/0 respectively
        total_beer_count = 1;
        if (beerLeaderboard[i].drank){
          drank_count=1;
        } else {
          drank_count = 0;
        }

        // set new listObj
        listObj = {
          user_id: current_user_id,
          user: beerLeaderboard[i].user.username,
        }
      }
    }
    //complete last listObj
    let beerCountsEnd = {
      total_beers: total_beer_count,
      drank_beers: drank_count 
    }
    listObj = Object.assign(listObj, beerCountsEnd);
    // add object to leaderboardList array
    leaderboardList.push(listObj);

    
   

    // get user information for the page.
    // let's get a list of user_ids that we'll use to query.
    // ... we'll get users from the post data and the beer leaderboard
    const userArray = [];
    
    // first from the posts:
    for (let i=0; i<posts.length; i++){
      userArray.push(posts[i].user_id);
    }
    
    // next from the beer leaderboard
    for (let i=0; i<beerLeaderboard.length; i++){
            userArray.push(beerLeaderboard[i].user_id);
    }
    //remove duplicates
    const uniqueUserArray = [...new Set(userArray)];
    
   
    // find based on our dataset.
    const userData = await User.findAll({
      where: {
        id: uniqueUserArray,
      }
    })
    const users = userData.map((user)=> user.get({plain:true}));
    // sort the list
    leaderboardList.sort((a,b)=> b.drank_beers - a.drank_beers);
   

    // render homepage
    res.render('homepage', {
      posts, leaderboardList, users,
      // this will tell the homepage the users object and the logged_in value of the 
      // req.session.logged_in tag. 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/post/:id',  async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include:[{model: Comment}]
      });
      const post = postData.get({ plain: true });
      const user_name = req.session.user_name;
     
     
      res.render('post', {post, user_name, logged_in: req.session.logged_in});
    } catch (err) {
      console.log(err);
      res.status(500).json(err.message);
    }
  });

  router.get('/edit-post/:id',  async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const postData = await Post.findByPk(req.params.id);
  
      const post = postData.get({ plain: true });
     
      res.render('edit-post', {post, logged_in: req.session.logged_in});
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ include:[Comment], model: Post }],
      });
      const user = userData.get({ plain: true });
      const userId = user.id;
      
      const beerListData = await Beerlist.findAll({ 
        where:{user_id: userId},
        include:{model:Beer}
      })
      const beersList = beerListData.map((beerlist) => beerlist.get({ plain: true }));
     
     // console.log(userId);

//TODO to make a separate function for leaderboard
      //get beerleader board data.
    // needs more intelligence to count of checked functionality grouped by user to limit the user object.
    const beerLeaderboardData = await Beerlist.findAll({
      order:[['user_id', 'ASC'], ['beer_id', 'ASC']],
      include:[{model:User}],
      
    })
    const beerLeaderboard = beerLeaderboardData.map((blb) => blb.get({plain: true}));
    const leaderboardList = [];
    let current_user_id = beerLeaderboard[0].user_id;
   
    let listObj = {
      user_id: current_user_id,
      user: beerLeaderboard[0].user.username,
    }
    let total_beer_count = 0;
    let drank_count =0;
    for (let i=0; i<beerLeaderboard.length; i++){
      
      if (current_user_id === beerLeaderboard[i].user_id){
        total_beer_count++;
          if (beerLeaderboard[i].drank){
            drank_count++;
          }
      } else{
        //add beercounts to object
        let beerCounts = {
          total_beers: total_beer_count,
          drank_beers: drank_count 
        }
        listObj = Object.assign(listObj, beerCounts);
        
        //add object to leaderboardList array
        leaderboardList.push(listObj);
        // set new current_user_id
        current_user_id = beerLeaderboard[i].user_id;

        // set total beer and drank count to 1 and 1/0 respectively
        total_beer_count = 1;
        if (beerLeaderboard[i].drank){
          drank_count=1;
        } else {
          drank_count = 0;
        }

        // set new listObj
        listObj = {
          user_id: current_user_id,
          user: beerLeaderboard[i].user.username,
        }
      }
    }
    //complete last listObj
    let beerCountsEnd = {
      total_beers: total_beer_count,
      drank_beers: drank_count 
    }
    listObj = Object.assign(listObj, beerCountsEnd);
    // add object to leaderboardList array
    leaderboardList.push(listObj);

    // sort the list
    leaderboardList.sort((a,b)=> b.drank_beers - a.drank_beers);


          
     // console.log(user);
      res.render('dashboard', {
        ...user,
        beersList,
        leaderboardList,
       logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Profile Route
router.get('/profile/:username',  async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findOne( {
      where:{username: req.params.username},
      attributes: { exclude: ['password'] },
      include: [{ include:[Comment], model: Post }],
    });
    
    const user = userData.get({ plain: true });
    
    const userId = user.id;
    
    const beerListData = await Beerlist.findAll({ 
      where:{user_id: userId},
      include:{model:Beer}
    })
    
    const beersList = beerListData.map((beerlist) => beerlist.get({ plain: true }));
        
   // console.log(user);
    res.render('profile', {
      ...user,
      beersList,
     logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

  
router.get('/login', (req, res) => {
  // if user is already logged in, send them back to homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
