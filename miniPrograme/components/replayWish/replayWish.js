const app = getApp();
const util = require('../../utils/util.js');
// 写评论
const api = require('../../utils/api.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        blessing: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        items: [
            {name: 'banquet', value: '赴宴', checked: 'true'},
            {name: 'undetermined', value: '待定'},
            {name: 'anything', value: '有事'}
        ],
        userCount: 1,
        array: ['飞机', '开车', '公交车', '火车'],
        objectArray: [
            {
                id: 0,
                name: '飞机'
            },
            {
                id: 1,
                name: '开车'
            },
            {
                id: 2,
                name: '公交车'
            },
            {
                id: 3,
                name: '火车'
            }
        ],
        index: 2,
        name: '',
        tel: '',
    },
    ready() {
        if (util.isDev()) {
            this.setData({
                name: "张三",
                tel: "13325252545"
            })
        }
        // console.log(this.properties.blessing);
    },
    methods: {
        hidePage() {
            // console.log(" !2312");

            this.triggerEvent('submit');
        },
        bindPickerChange: function (e) {
            // console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                index: e.detail.value
            })
        },
        radioChange: function (e) {
            // console.log('radio发生change事件，携带value值为：', e.detail.value)
        },
        //    提交评论
        confirmComment: function (e) {
            const self = this;
            const value = e.detail.value;
            const msg = value.msg;
            // console.log( msg);
            if (!msg) {
                util.toast("回复不能为空");
                return;
            }

            if (msg.length > 30) {
                wx.showToast({
                    title: '回复长度不能大于30',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }


            if (this.data.isLoading) {
                return;
            }

            // 防止重复提交
            this.setData({
                isLoading: true
            });

            wx.showLoading({
                title: '提交中...'
            });


            const req = {
                msg_id: this.properties.blessing.id,
                message: msg
            };

            api.barrageReply({
                method: "POST",
                data: req,
                success: (resLogin) => {
                    // console.log(resLogin);

                    wx.hideLoading();

                    self.setData({
                        isLoading: false
                    });
                    self.hidePage();


                }
            });



        }
    }

});