// ESM (ES6 Module, Ecma Script Module) -> import, export를 사용
// CommonJs Module :                    -> require, module.exports 또는 exports

// const express = require('express') 이 문장을 아래로 변경 해주면 ES6 타입
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import userRouter from "./routes/userRouter.js";

// app.set(process.env.NODE_ENV, "development");
// console.log(process.env.NODE_ENV); // NODE_ENV 환경변수

// 미들웨어 (middlewre)
app.use(express.json()); // json 데이터를 express에서 처리 가능
app.use("/", userRouter);

app.listen(3000)