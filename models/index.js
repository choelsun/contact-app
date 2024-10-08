// 생성되어 있던 기본 코드는 모두 삭제!
import dotenv from "dotenv";
dotenv.config;

// json 포맷을 node.js에서 불러올 때는 assert {type: 'json'}을 삽입
import config from "../config/config.json" assert {type: 'json'};
const env = process.env.NODE_ENV || "development";
const configEnv = config[env]; // username, database, password, host...
// console.log(env);
// import User from "./User.js"; // User 모델 불러오기

import User from "./User.js";
import Memo from "./Memo.js";

import { Sequelize } from "sequelize";
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
  port: 3306,
  logging: (msg) => console.log(msg)
});
User.init(sequelize); // User 모델의 컬럼, 자료형 --> mariaDB에 생성
Memo.init(sequelize); 

// // DB 연결 테스트
// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

await sequelize.sync({ force : false }).then(() => {
  console.log('======== 모델과 데이터베이스가 맵핑 되었습니다 =========');
}).catch((error) => {
  console.log('======== 에러내용 ========' + error)
});


const db = {}; // 여러 객체(모델)를 한번에 저장해서 db라는 이름으로 내보내기


//객체, 속성= 값
db.sequelize = sequelize; // 시퀄라이즈, 인스턴스(db접속정보)
db.User = User;
db.Memo = Memo;
// Model - Table 동기화(Synchronization) ==> Promises 객체를 반환 : 비동기

User.associate(db);
Memo.associate(db);

export default db;
