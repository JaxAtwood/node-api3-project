const express = require('express');
const User = require("./userDb");
const Post = require("../posts/postDb");

const router = express.Router();


//insert(): calling insert passing it a resource object will add it to the database and return the new resource.
router.post('/', validateUser, (req, res) => {
  const user = req.body;

  User.insert(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Could not add this user, sorry" });
    })
});


//insert(): calling insert passing it a resource object will add it to the database and return the new resource.
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body;

    Post.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "No Post for you" })
      })
    });


// get(): calling find returns a promise that resolves to an array of all the resources contained in the database.
router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "500/catch for the GET users call" });
    })
});


// getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});


//getById(): takes an id as the argument and returns a promise that resolves to the resource with that id if found.
router.get('/:id/posts', validateUserId, (req, res) => {
  const {id} = req.params;

  User.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: `ID #${req.params.id} does not have any comments` });
    })
});


//remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete('/:id', validateUserId, (req, res) => {
  User.remove(req.params.id)
    .then(() => {
        return res.status(200).json({ message: `Bye Felicia - ID #${req.params.id} is out`})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: `You are stuck with ID #${id}, deal with it` });
    })
});


//update(): accepts two arguments, the first is the id of the resource to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
router.put('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  const userUpdate = req.body;

  User.update(id, userUpdate)
    .then(user => {
      if(user) {
        User.getById(id)
          .then(user => {
            res.status(200).json(user);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Could not get user" });
          })
      }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Could not update this user" })
      })
  });



//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;

  User.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ errorMessage: `User with this ID # ${req.params.id} does not exist` })
    }
  })
}


function validateUser(req, res, next) {
  const {name} = req.body;

  if (!name) {
    return res.status(400).json({ errorMessage: "Cannot be empty" });
  }
  req.body = { name };
  next();
}

function validatePost(req, res, next) {
 const {id: user_id} = req.params;
 const {text} = req.body;

 if (!req.body || !{text}) {
   return res.status(400).json({errorMessage: "Cannot be empty" });
 }
 req.body = {user_id, text};
 next();
}

module.exports = router;
