// ESM (ES6 Module, Ecma Script Module) -> import, export를 사용
// CommonJs Module :                    -> require, module.exports 또는 exports

// const express = require('express') 이 문장을 아래로 변경 해주면 ES6 타입
import express from "express";

const app = express()

app.get('/', function (req, res) {
    res.send('GET 요청')
});

app.post('/', function (req, res) {
    res.send('POST 요청')
});

app.put('/', function (req, res) {
    res.send('PUT 요청')
});

app.delete('/', function (req, res) {
    res.send('DELETE 요청')
});
app.listen(3000)