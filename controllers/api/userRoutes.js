const router = require('express').Router();
const { User, Beer, Beerlist } = require('../../models');

router.post('/', async (req, res) => {
  console.log('new user attempt! name:' + req.body.name);
  try {
    
    const newUserData = await User.create(req.body);
    const newUser = newUserData.get({plain: true});
    console.log('user created!')
    //create beer checklist for user.
    const beersData = await Beer.findAll({
      order: [['id', 'ASC']],
    });
    const beers = beersData.map((beer) => beer.get({ plain: true }));
   
    console.log(beers);
    const beerList = [];
    let beerListItem = {};
    for (let i = 0; i < beers.length; i++ ){
      beerListItem = {
        user_id : newUser.id,
        beer_id : beers[i].id
      }
      beerList.push(beerListItem);
    }
    console.log(beerList);
    const newBeerList = await Beerlist.bulkCreate(beerList);
    req.session.save(() => {
      req.session.user_name = newUser.name;
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      
      res.status(202).json({ user: newUser, message: 'User Created and logged in!' });
    });
   
    
    
  } catch (err) {
    console.log("bottom error");
    console.log(err);
    res.status(400).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
