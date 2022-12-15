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

exports.addTeam = (req, res) => {
    const { name, league, stadium } = req.body;
    const seasonid = req.params.seasonid;

    Team.create({
        name: name,
        league: league,
        stadium: stadium,
        season_id : seasonid
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "post success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.showTeam = (req, res) => {
    const seasonid = req.params.seasonid;

    Team.findAll({
        where: { season_id: seasonid } })
    .then((data) => {
        res.render("../views/team/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.teamAddSelect = (req, res) => {
    Season.findAll()
    .then((data) => {
        res.render("../views/team/addselect", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.teamgsAddSelect = (req, res) => {
    const seasonid = req.params.seasonid;

    Team.findAll({
        where: { season_id: seasonid } })
    .then((data) => {
        res.render("../views/teamgs/addselect", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.select = (req, res) => {
    const teamid = req.params.teamid;

    Team.findAll({ where: { id: teamid } })
    .then((data) => {
        res.render("../views/team/select", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.updateTeam = (req, res) => {
    const { name, league, stadium } = req.body;
    const seasonid = req.params.seasonid;
    const teamid = req.params.teamid;

    if(!name || !league) {
        return res.status(400).json({
            message: "Please enter name or league."
        });
    } else {
        Team.update({
            name: name,
            league: league,
            stadium: stadium,
        }, {
            where: { 
                id : teamid,
                season_id: seasonid },
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

exports.deleteTeam = (req, res) => {
    const seasonid = req.params.seasonid;
    const teamid = req.params.teamid;

    Team.destroy({where: { 
        id: teamid,
        season_id: seasonid }})
        .then(() => {
            res.redirect(`/season/${seasonid}/team/show`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
}

exports.addTeamGameStat = (req, res) => {
    const { opponent, tournament, date, result, goal_for, goal_against,
    shot, possession, pass, key_pass, dribble, tackle, clear, block, rating } = req.body;
    const teamid = req.params.teamid;
    const playerid = req.params.playerid;

    const play_date = new Date(date);

    Team_game_stat.create({
        opponent: opponent,
        tournament: tournament,
        date : play_date,
        result : result,
        goal_for : goal_for,
        goal_against : goal_against,
        shot : shot,
        possession : possession,
        pass : pass,
        key_pass : key_pass,
        dribble : dribble,
        tackle : tackle,
        clear : clear,
        block : block,
        rating : rating,
        team_id : teamid,
        player_id : playerid
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.showTeamGameStat = (req, res) => {
    const teamid = req.params.teamid;
    const playerid = req.params.playerid;

    Team_game_stat.findAll({ where: { team_id: teamid,
    player_id: playerid } })
    .then((data) => {
        res.render("../views/teamgs/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.selectgs = async (req, res) => {
    const teamid = req.params.teamid;

    Player.findAll({ where: { team_id: teamid } })
    .then((data2) => {
        res.render("../views/player/select", {
            datas2: data2
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.updateTeamGameStat = (req, res) => {
    const { opponent, tournament, date, result, goal_for, goal_against,
    shot, possession, pass, key_pass, dribble, tackle, clear, block, rating } = req.body;
    const teamgsid = req.params.teamgsid;

    const play_date = new Date(date);

    Team_game_stat.update({
        opponent: opponent,
        tournament: tournament,
        date : play_date,
        result : result,
        goal_for : goal_for,
        goal_against : goal_against,
        shot : shot,
        possession : possession,
        pass : pass,
        key_pass : key_pass,
        dribble : dribble,
        tackle : tackle,
        clear : clear,
        block : block,
        rating : rating,
    }, {
        where: { id : teamgsid },
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.deleteTeamGameStat = (req, res) => {
    const teamgsid = req.params.teamgsid;
    const teamid = req.params.teamid;
    const playerid = req.params.playerid;

    Team_game_stat.destroy({where: { id: teamgsid }})
    .then(() => {
        res.redirect(`/season/team/${teamid}/player/${playerid}/teamgs/show`)
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showTeamSeasonStat = (req, res) => {
    const teamid = req.params.teamid;

    Team_season_stat.findAll({ where: { team_id: teamid } })
    .then((data) => {
        res.render("../views/teamss/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.addTeamSeasonStat = (req, res) => {
    const teamid = req.params.teamid;

    Team_game_stat.findAll({ where: { team_id: teamid } })
    .then((data) => {
        let goal_for_sum = 0;
        let goal_against_sum = 0;
        let result_win = 0
        let result_draw = 0
        let result_lose = 0
        let point = 0
        for(let i=0; i<data.length; i++) {
            goal_for_sum += data[i].goal_for
            goal_against_sum += data[i].goal_against
            if (data[i].result == "승") {
                result_win += 1
            } else if (data[i].result == "무") {
                result_draw += 1
            } else if (data[i].result == "패") {
                result_lose += 1
            }  
        }
        point = result_win * 3 + result_draw

        Team_season_stat.create({
            played: data.length,
            win: result_win,
            draw: result_draw,
            lose: result_lose,
            goal_for: goal_for_sum,
            goal_against: goal_against_sum,
            goal_difference: goal_for_sum - goal_against_sum,
            point: point,
            team_id: teamid
        }).then(() => {
            res.redirect(`/season/team/${teamid}/teamss/show`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}
