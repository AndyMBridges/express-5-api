import express from "express"
import session from "express-session"
import morgan from "morgan"
import helmet from "helmet"
import routes from "./routes/index"

const app = express()

app.use(morgan("dev"))
app.use(express.urlencoded({
	extended: true
}))

app.use(routes)

// Ensure cookies are only sent over a secure connection (Mitigate MITM attacks)
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		// Only allow top-level navigation using GET method (Mitigate CSRF attacks)
		sameSite: 'lax',
		secure: true,
		// Ensure cookies are inaccessibile	via JS (Mitigate XSS attacks)	
		httpOnly: true
	}
}))

// Prevent inline script execution (Mitigate XSS attacks)
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'none'"], // Enforce an allow list (Mitigate XSS attacks)
		scriptSrc: ["'self'", "https:"]
	},
	reportOnly: true // Only send the report for testing, block in production
}))

// Ensure all requests are HTTPS requests (Mitigate MITM attacks)
app.use(helmet.hsts({
	maxAge: 60 * 60 * 24 * 365, // 1 year
	preload: true
}))

app.use((req, res) => {
	res.status(404).send("Not Found")
})

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send(err.message)
})

app.listen(3000, () => {
	console.log('Listening on port 3000')
})

