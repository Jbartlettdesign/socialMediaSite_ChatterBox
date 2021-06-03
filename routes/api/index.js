//index in routes/api
const router = require('express').Router();

const userRoutes = require('./user_routes');

//this is where the users after api comes from
router.use('/users', userRoutes);

module.exports = router;