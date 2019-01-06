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
        card_id: null, // 简化的定义方式
        open_id: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        items: [
            {name: 'banquet', value: '赴宴', checked: 'true'},
            {name: 'undetermined', value: '待定'},
            {name: 'anything', value: '有事'}
        ],
        userCount: 1,
        array: ['自驾', '公交', '打车', '步行', '其他'],
        objectArray: [
            {
                id: 1,
                name: '自驾'
            },
            {
                id: 2,
                name: '公交'
            },
            {
                id: 3,
                name: '打车'
            },
            {
                id: 4,
                name: '步行'
            },
            {
                id: 5,
                name: '其他'
            }
        ],

        index: 1,
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
    },
    methods: {
        hidePage() {
            // console.log(" !2312");

            this.triggerEvent('hidePage');
            wx.hideLoading();
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
        userPlus: function (e) {
            let userCount = this.data.userCount;
            userCount--;
            if (userCount < 1) {
                userCount = 1;
            }
            this.setData({
                userCount: userCount
            });
        },
        userAdd: function (e) {
            let userCount = this.data.userCount;
            userCount++;
            if (userCount > 100) {
                userCount = 100;
            }
            this.setData({
                userCount: userCount
            });
        },
        //    提交评论
        confirmComment: function (e) {
            const self = this;
            const value = e.detail.value;
            const name = value.name;
            const tel = value.tel;
            // console.log(name, tel);

            if (!/^1\d{10}$/.test(tel)) {
                wx.showToast({
                    title: '手机号格式不正确',
                    icon: 'none',
                    duration: 2000
                });
                return;
            }

            if (name.length > 30) {
                wx.showToast({
                    title: '姓名长度不能大于30',
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
                card_id: this.properties.card_id,
                open_id: this.properties.open_id,
                user_name: name,
                transit_type: this.data.objectArray[this.data.index].id,
                phone_num: tel,
                attend_num: this.data.userCount
            };

            // console.log("请求参数", req);

            api.banquetInfoFill({
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