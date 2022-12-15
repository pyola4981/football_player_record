"use strict";

const { Season } = require('../utils/connect');
const { Content } = require('../utils/connect');
const { Comment } = require('../utils/connect');

const model = require('../utils/connect');

const { Op } = require('sequelize');

exports.addComment = (req, res) => {
    const { content, password } = req.body;
    const contentid = req.params.contentid;

    if(!password) {
        return res.status(400).json({
            message: "Please enter password."
        });
    } else {
        Comment.create({
            content: content,
            password: password,
            content_id: contentid,
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

exports.deleteSeasonComment = (req, res) => {
    const password = req.body;
    const contentid = req.params.contentid;
    const commentid = req.params.commentid;

    Comment.findOne({ attributes: ['password'], 
    where: { id: commentid }})
    .then((check) => {
        if(password.password != check.password) {
            return res.status(400).json({
                message: "비밀번호가 틀렸습니다."
            });
        }
        else {
            Comment.destroy({where: { id: commentid }})
        .then(() => {
            res.redirect(`/board/content/${contentid}/read`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
        }
    })
}

exports.deleteAllComment = (req, res) => {
    const password = req.body;
    const contentid = req.params.contentid;
    const commentid = req.params.commentid;

    Comment.findOne({ attributes: ['password'], 
    where: { id: commentid }})
    .then((check) => {
        if(password.password != check.password) {
            return res.status(400).json({
                message: "비밀번호가 틀렸습니다."
            });
        }
        else {
            Comment.destroy({where: { id: commentid }})
        .then(() => {
            res.redirect(`/board/content/${contentid}/all/read`)
        }).catch((err) => {
            return res.status(500).json({ err });
        });
        }
    })
}
