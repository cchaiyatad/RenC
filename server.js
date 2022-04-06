const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')

// TODO: routes
// const hospitals = require('./routes/hospitals')
// const auth = require('./routes/auth')
// const appointments = require('./routes/appointments')

const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(cors())

const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000,
    max: 10
})
app.use(limiter)

// TODO: edit app.us
// app.use("/api/v1/hospitals", hospitals);
// app.use("/api/v1/auth", auth);
// app.use("/api/v1/appointments", appointments);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
});