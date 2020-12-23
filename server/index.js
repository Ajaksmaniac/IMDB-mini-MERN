const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const users = require("./routes/api/users");
const movies = require("./routes/api/movies");
const comments = require("./routes/api/comments");

const app = express();
require('dotenv').config()
const port =process.env.PORT || 1333;



app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

// DB Config
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
app.use(cors({
    origin: process.env.CORS_ORIGIN,

}));

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/movie", movies);
app.use("/api/comments", comments);




app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`)
});