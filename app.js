const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router/index');

const port = 4000;

const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser('secret'));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));


app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));



app.use('/api/v1/requests', router);

(
    async () => {
                    try {
                        app.listen(port, () => {
                        console.log(`Listening on port ${port}`);

                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
)();