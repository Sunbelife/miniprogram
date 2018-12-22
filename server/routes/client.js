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
            "music_id": 7,
            "music_name": "天空 - 王菲",
            "music_type": "0",
            "music_upload_time": "2018-12-16",
            "music_url": "https:\/\/xcx.lyy99.com\/uploads\/music\/20181216\/03971c99b7ea8b7aece7ab35cae0607e.mp3"
        }, {
            "music_id": 8,
            "music_name": "矜持 - 王菲",
            "music_type": "0",
            "music_upload_time": "2018-12-16",
            "music_url": "https:\/\/xcx.lyy99.com\/uploads\/music\/20181216\/cff64b158a26fbb59d66d7ccd28a4ff0.mp3"
        }, {
            "music_id": 9,
            "music_name": "只愿为你守着约 - 王菲",
            "music_type": "0",
            "music_upload_time": "2018-12-16",
            "music_url": "https:\/\/xcx.lyy99.com\/uploads\/music\/20181216\/a195261ae15b4349869c668da8678a90.mp3"
        }, {
            "music_id": 10,
            "music_name": "This Mortal Coil - With Tomorrow",
            "music_type": "1",
            "music_upload_time": "2018-12-16",
            "music_url": "https:\/\/xcx.lyy99.com\/uploads\/music\/20181216\/8e9e3170f61f0abb6f0bc937ce5c423f.mp3"
        }, {
            "music_id": 11,
            "music_name": "追光者",
            "music_type": "1",
            "music_upload_time": "2018-12-22",
            "music_url": "https:\/\/xcx.lyy99.com\/uploads\/music\/20181222\/ecdb4931cd5d112650cb591c14ccdcff.mp3"
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
            "id": 1,
            "card_id": "b61310c77621cbda8a066ef8bfac394c",
            "boy_name": "小刘",
            "girl_name": "小花",
            "marr_time": "2018-10-20 20:30:00",
            "contact_num": "110",
            "marr_addr": "地球",
            "create_time": "2018-12-12 17:05:11"
        }, {
            "id": 1,
            "card_id": "b61310c77621cbda8a066ef8bfac394c",
            "boy_name": "小刘",
            "girl_name": "小花",
            "marr_time": "2018-10-20 20:30:00",
            "contact_num": "110",
            "marr_addr": "地球",
            "create_time": "2018-12-12 17:05:11"
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
