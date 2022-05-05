// These import necessary modules and set some initial variables
const path = require('path');
require("dotenv").config();
const express = require("express");
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const rateLimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 3000;
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
// app.use('/', express.static(__dirname));

// const fetch = require('./public/js/fetch')

// // app.use('/fetch', videoData)
// app.get('/search', async (req, res) => {
// 	fetch()
// })

const hbs = exphbs.create();


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

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
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));