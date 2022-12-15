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

exports.addPlayer = (req, res) => {
    const { name, position, age, height, weight } = req.body;
    const teamid = req.params.teamid;

    Player.create({
        name: name,
        position: position,
        age: age,
        height: height,
        weight: weight,
        team_id: teamid
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.showPlayer = (req, res) => {
    const teamid = req.params.teamid;

    Player.findAll({ where: { team_id: teamid } })
    .then((data2) => {
        res.render("../views/player/show", {
            datas2: data2
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.select = (req, res) => {
    const playerid = req.params.playerid;

    Team_game_stat.findAll({ where: { player_id: playerid } })
    .then((data) => {
        res.render("../views/playergs/select", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.playerAddSelect = (req, res) => {
    const seasonid = req.params.seasonid;

    Team.findAll({
        where: { season_id: seasonid } })
    .then((data) => {
        res.render("../views/player/addselect", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.palyergsAddSelect = (req, res) => {
    const gameid = req.params.gameid;
    const teamid = req.params.teamid;

    Player.findAll({ 
        include:[{ 
            model: Team_game_stat,
            where: { id: gameid } }],
        where: { team_id: teamid } })
    .then((data2) => {
        res.render("../views/playergs/show", {
            datas2: data2
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.updatePlayer = (req, res) => {
    const { name, position, age, height, weight } = req.body;
    const playerid = req.params.playerid;

    Player.update({
        name: name,
        position: position,
        age: age,
        height: height,
        weight: weight,
    }, {
        where: { id: playerid },
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.deletePlayer = (req, res) => {
    const playerid = req.params.playerid;
    const teamid = req.params.teamid;

    Player.destroy({where: { id: playerid }})
    .then(() => {
        res.redirect(`/season/team/${teamid}/player/show`)
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.addPlayerGameStat = (req, res) => {
    const { position, played, goal_for, assist, yellow_card, red_card,
    shot, pass, key_pass, dribble, tackle, foul, clear, rating } = req.body;
    const teamgsid = req.params.teamgsid;
    const playerid = req.params.playerid;

    Player_game_stat.findOne({ where: {game_id: teamgsid} })
    .then((data) => {
        console.log(data)
        if (data != null) {
            return res.status(400).json({
                message: "성적이 이미 기록되어 있습니다."
            });
        }else {
            Player_game_stat.create({
                position : position,
                played: played,
                goal_for : goal_for,
                shot : shot,
                assist : assist,
                pass : pass,
                key_pass : key_pass,
                dribble : dribble,
                yellow_card : yellow_card,
                red_card : red_card,
                tackle : tackle,
                foul : foul,
                clear : clear,
                rating : rating,
                game_id : teamgsid,
                player_id : playerid
            }).then(() => {
                return res.status(200).json({ 
                    code: 200,
                    message: "success."
                });
            }).catch((err) => {
                return res.status(500).json({ err });
            });
        }
    })
};

exports.showPlayerGameStat = (req, res) => {
    const teamgsid = req.params.teamgsid;
    const playerid = req.params.playerid;

    Player_game_stat.findAll({ 
        where: { 
            game_id: teamgsid,
        player_id: playerid
     } })
    .then((data) => {
        res.render("../views/playergs/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.updatePlayerGameStat = (req, res) => {
    const { position, played, goal_for, assist, yellow_card, red_card,
    shot, pass, key_pass, dribble, tackle, foul, clear, rating } = req.body;
    const playergsid = req.params.playergsid;

    Player_game_stat.update({
        position : position,
        played: played,
        goal_for : goal_for,
        shot : shot,
        assist : assist,
        pass : pass,
        key_pass : key_pass,
        dribble : dribble,
        yellow_card : yellow_card,
        red_card : red_card,
        tackle : tackle,
        foul : foul,
        clear : clear,
        rating : rating,
    }, {
        where: { id: playergsid },
    }).then(() => {
        return res.status(200).json({ 
            code: 200,
            message: "success."
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
};

exports.deletePlayerGameStat = (req, res) => {
    const playergsid = req.params.playergsid;
    const playerid = req.params.playerid;
    const teamgsid = req.params.teamgsid;

    Player_game_stat.destroy({where: { id: playergsid }})
    .then(() => {
        res.redirect(`/season/player/${playerid}/teamgs/${teamgsid}/playergs/show`)
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showPlayerSeasonStat = (req, res) => {
    const playerid = req.params.playerid;

    Player_season_stat.findAll({ where: { player_id: playerid } })
    .then((data) => {
        res.render("../views/playerss/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.addPlayerSeasonStat = (req, res) => {
    const playerid = req.params.playerid;

    Player_game_stat.findAll({ where: { player_id: playerid } })
    .then((data) => {
        let played_sum = 0;
        let goal_for_sum = 0;
        let assist_sum = 0;
        let tackle_sum = 0;
        let foul_sum = 0;
        let clear_sum = 0;
        let block_sum = 0;
        let key_pass_sum = 0;
        let pass_sum = 0;
        let dribble_sum = 0;
        let shot_sum = 0;
        for(let i=0; i<data.length; i++) {
            played_sum += data[i].played
            goal_for_sum += data[i].goal_for
            assist_sum += data[i].assist
            tackle_sum += data[i].tackle
            foul_sum += data[i].foul
            clear_sum += data[i].clear
            block_sum += data[i].block
            key_pass_sum += data[i].key_pass
            pass_sum += data[i].pass
            dribble_sum += data[i].dribble
            shot_sum += data[i].shot
        }
        Player_season_stat.create({
            played: data.length,
            minute: played_sum,
            goal_for: goal_for_sum,
            assist: assist_sum,
            tackle: tackle_sum,
            foul: foul_sum,
            clear: clear_sum,
            block: block_sum,
            key_pass: key_pass_sum,
            pass: pass_sum,
            dribble: dribble_sum,
            shot: shot_sum,
            player_id: playerid
        }).then(() => {
            res.redirect(`/season/player/${playerid}/playerss/show`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}