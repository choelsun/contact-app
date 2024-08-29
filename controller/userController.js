// Node.js v18 LTS 이상에서는 파일이름.js 형식으로 import 해야함
import db from "../models/index.js";

// MVC 패턴

// DB에 CRUD 하는 작업 -> 자바 스크립트 함수(=메소드) -> 라우트에서 사용 할 수 있게 export하는 목적
// 작명 : 동사+명사(단수, 복수)
// 비동기 통신 : callback function --> AJAX --> Promise --> async / await(현재 최신 문법)
// localhost:3000/add -> req.body로 전달되는 각종 데이터 (POST통신)
const createUser = async (req, res) => {
    const {name, phone, email, relationship} = req.body; // 요청 바디에서 각 필드 값을 추출 (구조분해할당 문법)
    try {
        // console.log(name, phone, email, relationship);
        // 이상 없으면 DB에 데이터를 삽입 .reate({데이터}) 호출 ==> INSERT
        const result = await db.User.create({
            name,
            phone,
            email,
            relationship
    })
    res.json ({
        status: 201,
        result
    });
    
    } catch (error)  {
        console.log('Error : ' + error);
    }
}
// removeUser, modifyUser, deleteUser

const userControl = {
    createUser
}

export default userControl;