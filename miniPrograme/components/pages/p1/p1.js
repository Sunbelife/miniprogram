const app = getApp();
const util = require('../../../utils/util.js');
// 写评论
const api = require('../../../utils/api.js');
/*
 *  self.triggerEvent('writeover');
 * */
Component({
    behaviors: [],
    properties: {
        item: null // 简化的定义方式
    },
    data: {
        text: "曾经我们在同一个学校学习，而今我们在同一个城市打拼。我们相互扶持，谱写我们美好的明天！或许你还有些许担心，",
        animatedStep0: false,
        animatedStep1: false,
        animatedStep2: false
    },
    ready(){

    },
    methods: {
        show(){
            console.log("show");
            util.setTimeOutFlag(this, 3, 0);
        },
        hide(){
            console.log("hide");
            util.setTimeOutFlagHide(this, 3);
        },
        editInfo(){
            const arr = [];
            
            arr.push({
                type: "image",
                top: "50vh",
                left: "375rpx"
            });

            arr.push({
                type: "text",
                text: this.data.text,
                bottom: "250rpx",
                left: "375rpx"
            });

            util.posCssComplete(arr);

            console.log(arr);
            return arr;
        }
    }

});