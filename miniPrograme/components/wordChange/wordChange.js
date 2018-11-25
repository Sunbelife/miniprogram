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
        curWordChangeInfo: null, // 简化的定义方式
        curShowPage: null, // 简化的定义方式
        item: null // 简化的定义方式
    },
    data: {
        isLoading: false,
    },
    ready(){
        console.log(this.properties.curWordChangeInfo);
    },
    methods: {
        hidePage(){
            this.triggerEvent('hidePage');
        },
        submit(e){
            const value = e.detail.value;
            console.log(value);
            const desc = value.desc.trim();
            console.log(desc);

            this.triggerEvent('saveWord', {
                curShowPage: this.properties.curShowPage,
                curWordChangeInfo: this.properties.curWordChangeInfo,
                newWord: desc
            });

        }
    }

});