// Node.js v18 LTS 이상에서는 파일이름.js 형식으로 import 해야함
import db from "../models/index.js";

// MVC 패턴

// DB에 CRUD 하는 작업 -> 자바 스크립트 함수(=메소드) -> 라우트에서 사용 할 수 있게 export하는 목적
// 작명 : 동사+명사(단수, 복수)
// 비동기 통신 : callback function --> AJAX --> Promise --> async / await(현재 최신 문법)
// localhost:3000/add -> req.body로 전달되는 각종 데이터 (POST통신)
const createUser = async (req, res) => {
    const { name, phone, email, relationship } = req.body; // 요청 바디에서 각 필드 값을 추출 (구조분해할당 문법)
    try {
        // console.log(name, phone, email, relationship);
        // 이상 없으면 DB에 데이터를 삽입 .reate({데이터}) 호출 ==> INSERT
        const result = await db.User.create({
            name,
            phone,
            email,
            relationship
        })
        res.json({
            status: 201,
            result
        });

    } catch (error) {
        console.log('Error : ' + error);
    }
}
// removeUser, modifyUser, deleteUser + findAllUsers
// async function findAllUsers(req, res) {
//           이 문법은 함수 선언문
// }
// 위, 아래 코드가 같음
const findAllUsers = async (req, res) => {
    try {
        //.findAll
        const users = await db.User.findAll();
        res.json({
            status: 200,
            users
        })
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const findOneUser = async (req, res) => {
    console.log("요청 아이디 : " + req.params.id);
    // const { id } = req.params.id
    try {
        const foundUser = await db.User.findAll({
            where: {
                id: req.params.id
            }
        });
        if (!foundUser) {
            res.json({
                status: 500,
                message: "사용자 정보 없음",
            });
        } else {
            res.json({
                status: 201,
                data: foundUser
            })
        }
    } catch (error) {
        console.log("에러메시지 : " + error);
    }
}

const updateUser = async (req, res) => {
    try {
        // 대상을 먼저 찾은 후 대상의 특정 값을 새로운 값으로 치환하고 업데이트 요청
        const result = await db.User.update(
            { email: req.body.email },
            {
            where: {
                id: req.body.id
            }
        });
        res.json ({
            status: 201,
            message: "ㅇㅋ 됨",
            data: result
        })
    } catch (error) {
        console.log("에러 메세지: " + error)
    }
}

const removeUser = async (req, res) => {
    console.log(" 삭제요청 아이디 : " + req.params.id)
    try {
        const removeUser = await db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status: 201,
            message: "선택하신 연락처 삭제 됨.",
            data: removeUser
        })
    } catch (error) {
        console.log(" 에러메세지 : " + error);
    }
}
const removeAllUsers = async (req, res) => {
    try {
        const removeAllUsers = await db.User.destroy({
            truncate: true
        });
        res.json({
            status: 201,
            message: "선택하신 연락처 삭제 됨.",
            data: removeAllUsers
        })

    } catch (error) {
        console.log(" 에러메세지 : " + error)
    }
}

const userControl = {
    createUser,
    findAllUsers,
    findOneUser,
    removeUser,
    removeAllUsers,
    updateUser
}

export default userControl;