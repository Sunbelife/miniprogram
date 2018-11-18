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