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

router.post('/loginEncrypted', function (req, res, next) {
    res.send({
        code: 100,
        msg: "登录解密",
        data: ""
    });
});


router.post('/hadEditTpl', function (req, res, next) {
    res.send({
        code: 100,
        msg: "已编辑的请帖列表",
        data: ""
    });
});


router.post('/hadEditTplOne', function (req, res, next) {
    res.send({
        code: 100,
        msg: "已编辑的请帖一个",
        data: ""
    });
});


router.post('/guestReplyTip', function (req, res, next) {
    res.send({
        code: 100,
        msg: "宾客回复提示",
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


router.post('/tplCopy', function (req, res, next) {
    res.send({
        code: 100,
        msg: "模板拷贝",
        data: ""
    });
});


router.post('/tplDelete', function (req, res, next) {
    res.send({
        code: 100,
        msg: "模板删除",
        data: ""
    });
});


router.post('/mp3List', function (req, res, next) {
    res.send({
        code: 100,
        msg: "mp3列表",
        data: ""
    });
});


router.post('/tplSave', function (req, res, next) {
    res.send({
        code: 100,
        msg: "模板保存",
        data: ""
    });
});


router.post('/updateImgCut', function (req, res, next) {
    res.send({
        code: 100,
        msg: "修改图片的截取",
        data: ""
    });
});


router.post('/userShareImgGet', function (req, res, next) {
    res.send({
        code: 100,
        msg: "用户微信分享图片获取",
        data: ""
    });
});


router.get('/barrageList', function (req, res, next) {
    // res.send({
    //     code: 100,
    //     msg: "获取弹幕列表",
    //     data: ""
    // });
    res.send({
        "code": 200,  // 成功 200，失败 250
        "msg": "获取成功",
        "data":
            [
                {
                    user_name: "xxx",
                    message: "真好",
                    msg_id: "xxx",
                    is_reply: "xxx",
                    time: "xxx"
                },
                {
                    user_name: "xxx",
                    msg_id: "xxx",
                    is_reply: "xxx",
                    username: "xxx",
                    message: "真好2",
                    time: "xxx"
                },
                {
                    username: "xxx",
                    message: "真好3",
                    time: "xxx"
                }
            ]
    });
});


router.get('/barrageSave', function (req, res, next) {
    res.send({
        code: 100,
        msg: "宾客弹幕保存",
        data: ""
    });
});


router.post('/banquetInfoFill', function (req, res, next) {
    res.send({
        code: 100,
        msg: "赴宴信息填写接口",
        data: ""
    });
});


module.exports = router;
