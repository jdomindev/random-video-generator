// These import necessary modules and set some initial variables
require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const port = process.env.PORT;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
	windowMs: 30 * 1000, // 30 second
	max: 10, // limit each IP to 10 requests per windowMs
})

//  apply to all requests
app.use(limiter)

// Routes

const videoData = require('./fetch')
// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
router.get("/", (req, res) => res.send("Hello World!"));

router.use('/fetch', videoData)

// Our Goodreads relay route!
// app.get("/api/search", async (req, res) => {
// 	try {
// 		// This uses string interpolation to make our search query string
// 		// it pulls the posted query param and reformats it for goodreads
// 		const searchString = `q=${req.query.q}`;

// 		// It uses node-fetch to call the goodreads api, and reads the key from .env
// 		const response = await fetch(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREADS_API_KEY}&${searchString}`);
// 		//more info here https://www.goodreads.com/api/index#search.books
// 		const xml = await response.text();

// 		// Goodreads API returns XML, so to use it easily on the front end, we can
// 		// convert that to JSON:
// 		const json = convert.xml2json(xml, { compact: true, spaces: 2 });

// 		// The API returns stuff we don't care about, so we may as well strip out
// 		// everything except the results:
// 		const results = JSON.parse(json).GoodreadsResponse.search.results;

// 		return res.json({
//             success: true,
//             results
//         })
// 	} catch (err) {
// 		return res.status(500).json({
// 			success: false,
// 			message: err.message,
// 		})
// 	}
// })

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
router.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = router