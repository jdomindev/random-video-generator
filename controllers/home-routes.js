const router = require('express').Router();

router.get('/', (req, res) => res.render('home'))
router.get('/search', async (req, res) => {
	fetch()
})

module.exports = router;