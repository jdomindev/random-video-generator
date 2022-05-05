const router = require('express').Router();
const homeRoutes = require('./home-routes')

router.use('/', homeRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });
  
module.exports = router;