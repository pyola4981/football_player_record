"use strict";

const Sequelize = require('sequelize');

module.exports = class Team_game_stat extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {  // 테이블 필드에 대한 설정
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true, // 중복 X
                    primaryKey: true,
                },
                opponent: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                tournament: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                date: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                },
                result: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                goal_for: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                goal_against: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                shot: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                possession: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                pass: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                key_pass: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                dribble: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                tackle: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                clear: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                block: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                rating: {
                    type: Sequelize.FLOAT(3,1),
                    allowNull: false,
                }
            },
            {  // 테이블 자체에 대한 설정
                sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
                timestamps: true, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */
                paranoid: true,
                modelName: 'Team_game_stat', /* 모델 이름을 설정. */
                tableName: 'team_game_statinfo', /* 데이터베이스의 테이블 이름. */
                charset: 'utf8', /* 인코딩 */
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.Team_game_stat.belongsTo(db.Team, { foreignKey: 'team_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Team_game_stat.belongsTo(db.Player, { foreignKey: 'player_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Team_game_stat.hasMany(db.Player_game_stat, { foreignKey: 'game_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    }
};