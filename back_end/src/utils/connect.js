"use strict";

const Sequelize = require('sequelize');
const config = require('config');

const Season = require('../models/season');
const Team = require('../models/team');
const Team_season_stat = require('../models/team_season_stat');
const Team_game_stat = require('../models/team_game_stat');
const Player = require('../models/player');
const Player_season_stat = require('../models/player_season_stat');
const Player_game_stat = require('../models/player_game_stat');
const Content = require('../models/content');
const Comment = require('../models/comment');

const sequelize = new Sequelize(
    config.get('aws.database'),
    config.get('aws.username'),
    config.get('aws.password'),
    { host: config.get('aws.host'), dialect: config.get('aws.dialect'), port: config.get('aws.port') }
);

const db = {};

db.sequelize = sequelize;

db.Season = Season;
db.Team = Team;
db.Team_season_stat = Team_season_stat;
db.Team_game_stat = Team_game_stat;
db.Player = Player;
db.Player_season_stat = Player_season_stat;
db.Player_game_stat = Player_game_stat;
db.Content = Content;
db.Comment = Comment;

Season.init(sequelize);
Team.init(sequelize);
Team_season_stat.init(sequelize);
Team_game_stat.init(sequelize);
Player.init(sequelize);
Player_season_stat.init(sequelize);
Player_game_stat.init(sequelize);
Content.init(sequelize);
Comment.init(sequelize);

Season.associate(db);
Team.associate(db);
Team_season_stat.associate(db);
Team_game_stat.associate(db);
Player.associate(db);
Player_season_stat.associate(db);
Player_game_stat.associate(db);
Content.associate(db);
Comment.associate(db);

module.exports = db;