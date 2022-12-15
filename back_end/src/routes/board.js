"use strict";

const express = require('express');
const ctrl_cont = require('../controllers/content');
const ctrl_comm = require('../controllers/comment');
const router = express.Router();

//season_content
router.get("/season/:seasonid/content/add", (req, res) => {
    res.render("../views/season_content/add");
});

router.get("/season/select", ctrl_cont.seasonContentSelect);
router.get("/season/addselect", ctrl_cont.seasonContentAddSelect);
router.post("/season/:seasonid/content/add", ctrl_cont.addSeasonContent);
router.get("/season/:seasonid/content/show", ctrl_cont.showSeasonContent);
router.get("/season/:seasonid/content/team/show", ctrl_cont.showSeasonTeamContent);
router.get("/season/:seasonid/content/player/show", ctrl_cont.showSeasonPlayerContent);
router.get("/content/:contentid/read", ctrl_cont.readSeasonContent);
router.post("/season/:seasonid/content/:contentid/delete", ctrl_cont.deleteSeasonContent);
//router.post("/season/:seasonid/content/:contentid/update", ctrl_cont.updateSeasonContent);

//all_content
router.get("/content/add", (req, res) => {
    res.render("../views/all_content/add");
});

router.post("/content/add", ctrl_cont.addAllContent);
router.get("/content/show", ctrl_cont.showAllContent);
router.get("/content/team/show", ctrl_cont.showAllTeamContent);
router.get("/content/player/show", ctrl_cont.showAllPlayerContent);
router.post("/content/:contentid/delete", ctrl_cont.deleteAllContent);
router.get("/content/:contentid/all/read", ctrl_cont.readAllContent);

//comment
router.get("/season/:seasonid/content/:contentid/comment/add", (req, res) => {
    res.render("../views/comment/add");
});

router.get("/content/:contentid/comment/add", (req, res) => {
    res.render("../views/comment/addall");
});

router.post("/season/:seasonid/content/:contentid/comment/add", ctrl_comm.addComment);
router.post("/content/:contentid/comment/:commentid/delete", ctrl_comm.deleteSeasonComment);

router.post("/content/:contentid/comment/add", ctrl_comm.addComment);
router.post("/content/:contentid/all/comment/:commentid/delete", ctrl_comm.deleteAllComment);

module.exports = router;