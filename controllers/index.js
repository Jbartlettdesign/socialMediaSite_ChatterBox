//index at root of routes for collecting all routes

//all the routes go to the inside index, then come to this outside index
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home_routes');
//where the api endpoint comes from
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use((req,res) => {
    res.status(404).end();
});

module.exports = router;
