const router = require('express').Router();
const { userController } = require('../controllers');

/*
  curl --request POST http://localhost:3030/users \
  --header 'Content-Type: application/json' \
  --data '{
  "firstName": "FirstName",
  "lastName": "LastName",
  "email": "2020-11-24T19:34:59.746Z"
  }'
*/
router.post('/users', userController.create);

// curl --request DELETE http://localhost:3030/users/8
router.delete('/users/:userId', userController.delete);

module.exports = router;
