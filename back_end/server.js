"use strict";

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { sequelize } = require('./src/utils/connect');

const seasonRouter = require('./src/routes/season');
const boardRouter = require('./src/routes/board');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/season", seasonRouter);
app.use("/board", boardRouter);

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src`));

app.listen(config.get('server.port'), () => { // 서버 연결
    console.log(`Server Running on ${config.get('server.port')} Port!`);
});

sequelize.sync({ force: false }).then(() => { // DB 연결
    console.log("Success connecting DB");
}).catch((err) => {
    console.error(err);
});