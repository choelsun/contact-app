// const { Sequelize, DataTypes, Model } = require('sequelize');
import { Sequelize, DataTypes, Model, ForeignKeyConstraintError } from "sequelize";
// import { FOREIGNKEYS } from "sequelize/lib/query-types";
// import { FOREIGNKEYS } from "sequelize/lib/query-types";
// Sequelize의 defaultValue는 NULL

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                // Model attributes are defined here : 시퀄라이즈는 기본적으로 ID컬럼을 생성하고 PK로 정의함
                name: {
                    type: DataTypes.STRING(30),
                    allowNull: false,
                    
                },
                phone: {
                    type: DataTypes.STRING(11),
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: DataTypes.STRING(100),
                    // allowNull: is ture: NOT NULL
                    unique: true
                },
                relationship: {
                    type: DataTypes.ENUM('Family', 'friend', 'others'),
                    // defaultValue: null
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW
                }
            },
            {
                // Other model options go here
                sequelize, // DB 연결을 위한 시퀄라이즈 인스턴스
                timestamps: false,
                underscored: true,
                modelName: 'User', // 시퀄라이즈 모델 이름
                tableName: 'users',// 데이터베이스 테이블 이름 (기본 값: 모델 이름의 복수형)
                paranoid: false,   // 테이블 삭제 복구를 원하면 true, 아니면 false (삭제 날짜를 기록)
                charset: "utf8mb4",// 이모지 삽입을 위해서는 ut8mb4 형식
                collate: "utf8mb4_general_ci"
            },
        );
    }
    static associate(db) {
        User.hasMany(db.Memo, {foreignKey: "user_id", sourceKey: "id"});
        // db.User.hasMany (dv.User.Memo, {ForeignKey: "user_id", so})
    } 
}



// 모델 외부에서 User 정보를 생성할 때 참조
export default User;