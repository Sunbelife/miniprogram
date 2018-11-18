const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/api.js');


/*
* TODO 上传的图片大小显示一半，或者 .7 .6
* TODO 区域居中。
* TODO 滑动区域，图片的定位改变
*
*
* */

Component({
    behaviors: [],
    properties: {
        item: null // 简化的定义方式
    },
    data: {
        isLoading: false,
    },
    ready(){
    },
    methods: {
        hidePage(){
            this.triggerEvent('hidePage');
        },
        saveImage(){
            this.hidePage();
        },
    }

});