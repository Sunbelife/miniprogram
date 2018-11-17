const app = getApp();

Page({
    data: {
        items: [
            {name: 'banquet', value: '赴宴', checked: 'true'},
            {name: 'undetermined', value: '待定'},
            {name: 'anything', value: '有事'}
        ]
    },

    onLoad: function () {

    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    }
});
