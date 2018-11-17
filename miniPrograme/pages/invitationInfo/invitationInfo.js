const app = getApp();
const util = require('../../utils/util.js');
/*
*  TODO 红色的标点
*  
* */
Page({
    data: {
        date: '',
        time: '12:00',
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园'
        }],
        covers: [{
            latitude: 23.099994,
            longitude: 113.344520,
            iconPath: '/images/location.png'
        }, {
            latitude: 23.099994,
            longitude: 113.304520,
            iconPath: '/images/location.png'
        }]
    },
    mapCtx: {},
    onLoad: function () {

        this.setData({
            date: util.getCurDate()
        });
        this.mapCtx = wx.createMapContext('myMap');
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    getCenterLocation: function () {
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude)
                console.log(res.latitude)
            }
        })
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    },
    translateMarker: function () {
        this.mapCtx.translateMarker({
            markerId: 1,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345211,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    }

});
