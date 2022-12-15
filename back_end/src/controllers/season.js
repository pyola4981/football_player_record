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

exports.addSeason = (req, res) => {
    const year = req.body.year;

    console.log(req);

    if(!year) {
        return res.status(400).json({
            message: "Please enter year."
        });
    } else {
        Season.create({
            year: year
        }).then(() => {
            return res.status(200).json({ 
                code: 200,
                message: "post success."
            });
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    }
}

exports.showSeason = (req, res) => {
    Season.findAll()
    .then((data) => {
        res.render("../views/season/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.updateSeason = (req, res) => {
    const year = req.body.year;
    const seasonid = req.params.seasonid;

    if(!year) {
        return res.status(400).json({
            message: "Please enter year."
        });
    } else {
        Season.update({
            year: year
        }, {
            where: { id: seasonid },
        }).then(() => {
            return res.status(200).json({ 
                code: 200,
                message: "post success."
            });
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    }
}

exports.deleteSeason = (req, res) => {
    const seasonid = req.params.seasonid;

    Season.destroy({where: { id: seasonid }})
    .then(() => {
        res.redirect(`/season/show`)
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}