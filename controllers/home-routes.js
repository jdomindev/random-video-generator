const router = require('express').Router();


router.get('/', (req, res) => res.render('home'))

router.get('/search', async (req, res) => {
	// fetch(), res.render('search', {})
})

module.exports = router;