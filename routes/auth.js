const router = require('express').Router();
const { authController } = require('../controllers');
const { verifyAccessToken } = require('../services/JWT');

/*
  curl --request POST http://localhost:3030/login  \
  --header 'Content-Type: application/json' \
  --data '{
    "email": "MarkSparks@gmail.com"
  }'
*/
router.post('/login', authController.login);

/*
  curl --request POST http://localhost:3030/refresh_tokens  \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiandnIjoiZGQ0MTBkOTYtZjQzMy00NTkzLWFmNDMtYzUwM2RhNDEyOWE1IiwiaWF0IjoxNjA2ODM2MzI3LCJleHAiOjE2MDY5MzYzMjd9.yvE8HVmufZ24y85Ey1iKsTVJBQTwlPS9BVQF1H__r2g'  \
  --header 'Content-Type: application/json' \
  --data '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiandnIjoiZGQ0MTBkOTYtZjQzMy00NTkzLWFmNDMtYzUwM2RhNDEyOWE1IiwicmVmcmVzaCI6dHJ1ZSwiaWF0IjoxNjA2ODM2MzI3LCJleHAiOjE2MDcxMzYzMjd9.XkMZ2RxeUSiYuG-McD1lR91yuXVZe5cFJK2T9TgHUjM"
  }'
*/
router.post('/refresh_tokens', authController.refreshToken);

/*
  curl --request GET http://localhost:3030/check_access \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiandnIjoiZGQ0MTBkOTYtZjQzMy00NTkzLWFmNDMtYzUwM2RhNDEyOWE1IiwiaWF0IjoxNjA2ODM2MzI3LCJleHAiOjE2MDY5MzYzMjd9.yvE8HVmufZ24y85Ey1iKsTVJBQTwlPS9BVQF1H__r2g'
*/
router.get('/check_access', verifyAccessToken, authController.checkAccess);

module.exports = router;
