// const express = require('express')
import express from "express";
const router = express.Router()
import userControl from '../controller/userController.js'

// 요청에 따른 응답 시간 (성능 측정 용도)
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// User(연락처) 생성
router.post('/', userControl.createUser);

// module.exports = router
export default router;