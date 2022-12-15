"use strict";

const { Season } = require('../utils/connect');
const { Content } = require('../utils/connect');
const { Comment } = require('../utils/connect');

const model = require('../utils/connect');

const { Op } = require('sequelize');

exports.addSeasonContent = (req, res) => {
    const { title, content, tag, password } = req.body;
    const seasonid = req.params.seasonid;

    console.log(req);

    if(!password) {
        return res.status(400).json({
            message: "Please enter password."
        });
    } else {
        Content.create({
            title: title,
            content: content,
            tag: tag,
            password: password,
            season_id: seasonid,
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

exports.addAllContent = (req, res) => {
    const { title, content, tag, password } = req.body;

    console.log(req);

    if(!password) {
        return res.status(400).json({
            message: "Please enter password."
        });
    } else {
        Content.create({
            title: title,
            content: content,
            tag: tag,
            password: password,
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

exports.showSeasonContent = (req, res) => {
    const seasonid = req.params.seasonid;

    Content.findAll({
        where: { season_id: seasonid } })
    .then((data) => {
        res.render("../views/season_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showAllContent = (req, res) => {

    Content.findAll({where: { season_id: null }})
    .then((data) => {
        res.render("../views/all_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.seasonContentSelect = (req, res) => {
    Season.findAll()
    .then((data) => {
        res.render("../views/season_content/select", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.seasonContentAddSelect = (req, res) => {
    Season.findAll()
    .then((data) => {
        res.render("../views/season_content/addselect", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.readSeasonContent = (req, res) => {
    const contentid = req.params.contentid;

    Content.findAll({
        where: { id: contentid } })
    .then((content) => {
        Comment.findAll({
            where: { content_id: contentid }
        }).then((comment) => {
            res.render("../views/season_content/read", {
                datas: content,
                comment: comment
            });
        })
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.readAllContent = (req, res) => {
    const contentid = req.params.contentid;

    Content.findAll({
        where: { id: contentid } })
    .then((content) => {
        Comment.findAll({
            where: { content_id: contentid }
        }).then((comment) => {
            res.render("../views/all_content/read", {
                datas: content,
                comment: comment
            });
        })
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.deleteSeasonContent = (req, res) => {
    const password = req.body;
    const contentid = req.params.contentid;
    const seasonid = req.params.seasonid;

    Content.findOne({ attributes: ['password'], 
    where: { id: contentid }})
    .then((check) => {
        if(password.password != check.password) {
            return res.status(400).json({
                message: "비밀번호가 틀렸습니다."
            });
        }
        else {
            Content.destroy({where: { id: contentid }})
        .then(() => {
            res.redirect(`/board/season/${seasonid}/content/show`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
        }
    })
}

exports.showSeasonTeamContent = (req, res) => {
    const seasonid = req.params.seasonid;

    Content.findAll({
        where: { season_id: seasonid,
        tag: '팀' } })
    .then((data) => {
        res.render("../views/season_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showSeasonPlayerContent = (req, res) => {
    const seasonid = req.params.seasonid;

    Content.findAll({
        where: { season_id: seasonid,
        tag: '선수' } })
    .then((data) => {
        res.render("../views/season_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showAllTeamContent = (req, res) => {

    Content.findAll({
        where: { season_id: null,
        tag: '팀' } })
    .then((data) => {
        res.render("../views/all_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.showAllPlayerContent = (req, res) => {

    Content.findAll({
        where: { season_id: null,
        tag: '선수' } })
    .then((data) => {
        res.render("../views/all_content/show", {
            datas: data
        });
    }).catch((err) => {
        return res.status(500).json({ err });
    });
}

exports.deleteAllContent = (req, res) => {
    const password = req.body;
    const contentid = req.params.contentid;

    Content.findOne({ attributes: ['password'], 
    where: { id: contentid }})
    .then((check) => {
        if(password.password != check.password) {
            return res.status(400).json({
                message: "비밀번호가 틀렸습니다."
            });
        }
        else {
            Content.destroy({where: { id: contentid }})
        .then(() => {
            res.redirect(`/board/content/show`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
        }
    })
}