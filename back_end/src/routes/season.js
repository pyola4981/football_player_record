"use strict";

const express = require('express');
const ctrl_s = require('../controllers/season');
const ctrl_t = require('../controllers/team');
const ctrl_p = require('../controllers/player');
const router = express.Router();

//season
router.get("/add", (req, res) => {
    res.render("../views/season/add");
});

router.get("/:seasonid/update", (req, res) => {
    res.render("../views/season/update");
});

router.post("/add", ctrl_s.addSeason);
router.get("/show", ctrl_s.showSeason);
router.post("/:seasonid/update", ctrl_s.updateSeason);
router.post("/:seasonid/delete", ctrl_s.deleteSeason);

//team
router.get("/:seasonid/team/add", (req, res) => {
    res.render("../views/team/add");
});

router.get("/team/addselect", ctrl_t.teamAddSelect);

router.get("/:seasonid/team/:teamid/select", ctrl_t.select);

router.post("/:seasonid/team/add", ctrl_t.addTeam);
router.get("/:seasonid/team/show", ctrl_t.showTeam);
router.post("/:seasonid/team/:teamid/update", ctrl_t.updateTeam);
router.post("/:seasonid/team/:teamid/delete", ctrl_t.deleteTeam);

//team_game_stat
router.get("/team/:teamid/player/:playerid/teamgs/add", (req, res) => {
    res.render("../views/teamgs/add");
});

router.get("/:seasonid/teamgs/addselect", ctrl_t.teamgsAddSelect);

router.get("/team/:teamid/player/:playerid/teamgs/select", ctrl_t.selectgs);

router.post("/team/:teamid/player/:playerid/teamgs/add", ctrl_t.addTeamGameStat);
router.get("/team/:teamid/player/:playerid/teamgs/show", ctrl_t.showTeamGameStat);
router.post("/team/:teamid/player/:playerid/teamgs/:teamgsid/update", ctrl_t.updateTeamGameStat);
router.post("/team/:teamid/player/:playerid/teamgs/:teamgsid/delete", ctrl_t.deleteTeamGameStat);

//player
router.get("/team/:teamid/player/add", (req, res) => {
    res.render("../views/player/add");
});

router.get("/:seasonid/player/addselect", ctrl_p.playerAddSelect);

router.post("/team/:teamid/player/add", ctrl_p.addPlayer);
router.get("/team/:teamid/player/show", ctrl_p.showPlayer);
router.post("/team/:teamid/player/:playerid/update", ctrl_p.updatePlayer);
router.post("/team/:teamid/player/:playerid/delete", ctrl_p.deletePlayer);

//player_game_stat
router.get("/player/:playerid/teamgs/:teamgsid/playergs/add", (req, res) => {
    res.render("../views/playergs/add");
});

router.get("/player/:playerid/teamgs/:teamgsid/playergs/select", ctrl_p.select);

router.post("/player/:playerid/teamgs/:teamgsid/playergs/add", ctrl_p.addPlayerGameStat);
router.get("/player/:playerid/teamgs/:teamgsid/playergs/show", ctrl_p.showPlayerGameStat);
router.post("/player/:playerid/teamgs/:teamgsid/playergs/:playergsid/update", ctrl_p.updatePlayerGameStat);
router.post("/player/:playerid/teamgs/:teamgsid/playergs/:playergsid/delete", ctrl_p.deletePlayerGameStat);

//team_season_stat
router.get("/team/:teamid/teamss/show", ctrl_t.showTeamSeasonStat);
router.post("/team/:teamid/teamss/add", ctrl_t.addTeamSeasonStat);

//player_season_stat
router.get("/player/:playerid/playerss/show", ctrl_p.showPlayerSeasonStat);
router.post("/player/:playerid/playerss/add", ctrl_p.addPlayerSeasonStat);

module.exports = router;