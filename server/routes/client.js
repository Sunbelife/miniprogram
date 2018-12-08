var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    res.send({
        code: 100,
        msg: "登录",
        data: ""
    });
});

router.post('/musicList', function (req, res, next) {
    res.send({
        code: 100,
        msg: "音乐列表",
        data: ""
    });
});

router.post('/musicDel', function (req, res, next) {
    res.send({
        code: 100,
        msg: "音乐删除",
        data: ""
    });
});

router.post('/musicUpload', function (req, res, next) {
    res.send({
        code: 100,
        msg: "音乐上传",
        data: ""
    });
});

router.post('/marryInfo', function (req, res, next) {
    res.send({
        code: 100,
        msg: "结婚信息",
        data: ""
    });
});

router.post('/banquetInfo', function (req, res, next) {
    res.send({
        code: 100,
        msg: "赴宴信息",
        data: ""
    });
});

router.post('/tplList', function (req, res, next) {
    res.send({
        code: 100,
        msg: "模板列表",
        data: ""
    });
});

router.post('/tplDel', function (req, res, next) {
    res.send({
        code: 100,
        msg: "模板删除",
        data: ""
    });
});





module.exports = router;
