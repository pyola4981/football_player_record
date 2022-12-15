"use strict";

const { Season } = require('../utils/connect');
const { Team } = require('../utils/connect');
const { Team_season_stat } = require('../utils/connect');
const { Team_game_stat } = require('../utils/connect');
const { Player } = require('../utils/connect');
const { Player_season_stat } = require('../utils/connect');
const { Player_game_stat } = require('../utils/connect');

const model = require('../utils/connect');

const { Op } = require('sequelize');