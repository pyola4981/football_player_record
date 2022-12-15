"use strict";

const Sequelize = require('sequelize');

module.exports = class Player extends Sequelize.Model {
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
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                position: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                height: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                weight: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                }
            },
            {  // 테이블 자체에 대한 설정
                sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
                timestamps: true, /* true : 각각 레코드가 생성, 수정될 때의 시간이 자동으로 입력된다. */
                paranoid: true,
                modelName: 'Player', /* 모델 이름을 설정. */
                tableName: 'playerinfo', /* 데이터베이스의 테이블 이름. */
                charset: 'utf8', /* 인코딩 */
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.Player.belongsTo(db.Team, { foreignKey: 'team_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Player.hasMany(db.Player_season_stat, { foreignKey: 'player_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Player.hasMany(db.Team_game_stat, { foreignKey: 'player_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
        db.Player.hasMany(db.Player_game_stat, { foreignKey: 'player_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    }
};