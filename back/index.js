const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bievenue sur l'API de Naturama !" });
});

require('./routes/auth.routes')(app)
require('./routes/profile.routes')(app)
require('./routes/post.routes')(app)
require('./routes/rating.routes')(app)
require('./routes/image.routes')(app)

const db = require("./models");

db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`L'API écoute sur le port ${PORT}.`);
});