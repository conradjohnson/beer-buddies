
const router = require('express').Router();



router.get('/:state', async (req, res) => {
    try {
     fetch(`https://beermapping.com/webservice/locstate/${process.env.BEER_KEY}/${req.params.state}&s=json`).then(resp => resp.json())
.then(data=> res.json(data))
  
      
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  });


// router.put('/:id', withAuth, async (req, res) => {
//    console.log('put again!' + req.body.title);
//     try {
//         const updateData = await Post.update(
//             {...req.body },
//             {where:{id:req.params.id}}
//             );
//         if (!updateData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//           }
//           res.status(200).json(updateData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.delete('/:id', withAuth, async (req, res) => {
//     console.log('gonna del.');
//   try {
//     const postData = await Post.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!postData) {
//       res.status(404).json({ message: 'No post found with this id!' });
//       return;
//     }

//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;

