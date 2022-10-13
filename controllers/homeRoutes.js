const router = require('express').Router();
const { User, Post, Comment, Beerlist, Beer } = require('../models');
const withAuth = require('../utils/auth');


// we can send an array of functions to check various things.  In this case,
// we're only sending one function 'withAuth' to use when getting the '/' path in our 
// webapp.  'withAuth' is checking to see if the req.session.logged_in is set to true. 
// if it is set to true, it allows the request to proceed to our async function. 
router.get('/',  async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['title', 'ASC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
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
     
      console.log(post);
      //const comment = commentData.get({ plain: true});
      //console.log("here is the comment" + comment);
    
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
      console.log(post);
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
      console.log(beersList);
     // console.log(userId);
          
     // console.log(user);
      res.render('dashboard', {
        ...user,
        beersList,
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
    console.log("query result" + userData);
    const user = userData.get({ plain: true });
    console.log(user);
    const userId = user.id;
    
    const beerListData = await Beerlist.findAll({ 
      where:{user_id: userId},
      include:{model:Beer}
    })
    
    const beersList = beerListData.map((beerlist) => beerlist.get({ plain: true }));
    console.log(beersList);
    console.log("userid:" + userId);
        
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
