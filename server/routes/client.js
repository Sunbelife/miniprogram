var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
    res.send({
        "code": 200,  // 成功 200，失败 250
        "msg": "验证成功",
        "data": "null"
    });
});

router.get('/musicList', function (req, res, next) {
    res.send({
        "code": 200,
        "msg": "获取成功",
        "data": [{
            "music_id": 2,
            "music_name": "西风更破",
            "music_type": "1",
            "music_time": "2018-12-04",
            "music_url": "https:\/\/www.360.cn"
        }, {
            "music_id": 3,
            "music_name": "Take me to your heart",
            "music_type": "2",
            "music_time": "2018-12-08",
            "music_url": "www.google.com"
        }, {
            "music_id": 4,
            "music_name": "Happy Birthday to you",
            "music_type": "2",
            "music_time": "2018-12-08",
            "music_url": "www.baidu.com"
        }]
    });
});

router.get('/musicDel', function (req, res, next) {
    res.send({
        "code": 200,  // 成功 200，失败 250
        "msg": "验证成功",
        "data": "null"
    });
});

router.get('/musicUpload', function (req, res, next) {
    res.send({
        // code: 100,
        // msg: "音乐上传",
        // data: ""
    });
});

router.get('/marryInfo', function (req, res, next) {
    res.send({
        "code": 200,
        "msg": "获取成功",
        "data": [{
            "marry_id": 1,
            "marry_man": "大刘",
            "marry_women": "小刘"
        }, {
            "marry_id": 2,
            "marry_man": "大张",
            "marry_women": "小张"
        }]
    });
});

// 赴宴人员信息不对吧，赴宴人员是数组吧
router.get('/banquetInfo', function (req, res, next) {
    res.send({
        code: 100,
        msg: "赴宴信息",
        data: ""
    });
});

router.get('/tplList', function (req, res, next) {
    res.send({
        "code": 200,
        "msg": "获取成功",
        "data": [{
            "model_id": 1,
            "model_name": "白色风格",
            "model_type": 1,
            "model_pic_url": "www.baidu.com",
            "model_time": "2018-12-08 00:00:00"
        }, {
            "model_id": 2,
            "model_name": "黑色风格",
            "model_type": 1,
            "model_pic_url": "www.baidu.com",
            "model_time": "2018-12-08 00:00:00"
        }, {
            "model_id": 3,
            "model_name": "绿色风格",
            "model_type": 1,
            "model_pic_url": "www.baidu.com",
            "model_time": "2018-12-08 00:00:00"
        }, {
            "model_id": 4,
            "model_name": "黄色风格",
            "model_type": 1,
            "model_pic_url": "www.baidu.com",
            "model_time": "2018-12-08 00:00:00"
        }]
    });
});

router.get('/tplDel', function (req, res, next) {
    res.send({
        "code": 200,  // 成功 200，失败 250
        "msg": "验证成功",
        "data": "null"
    });
});





module.exports = router;
