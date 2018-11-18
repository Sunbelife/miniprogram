const util = require('../../utils/util.js');
const api = require('../../utils/api.js');


Component({
    properties: {
        item: null
    },
    data: {
        touchStart: 0,
        touchEnd: 0,
        isPlay: false,
        pages: [1, 2, 3],
        page: 0,
        pageTranslateY: 0
    },
    ready(){
        // 显示第一个页面
        this.movePage(0);
        
        if(util.isDev()){
            // 开发指定到页面 0 开始的
            // this.movePage(2);
        }
    },
    methods: {
        movePage(page){

            // 隐藏
            util.each(this.data.pages, (k, v)=> {
                this.selectComponent("#p" + (k)).hide();
            });

            // 定位过去
            this.setData({
                page: page,
                pageTranslateY: -((page) * 100)
            });

            // 显示
            this.selectComponent("#p" + page).show();
            console.log("#p" + page);

            this.triggerEvent('pageMove',this.selectComponent("#p" + page).editInfo());


        },
        
        touchStart(e){
            this.setData({
                touchStart: e.touches[0].pageY
            });
            // console.log(this.data.touchStart);
        },
        touchMove(e){
            this.setData({
                touchEnd: e.touches[0].pageY
            });
        },
        touchEnd(){
            let page = this.data.page;
            let oriPage = page;
            // console.log(this.data.touchEnd, this.data.touchStart);
            if (this.data.touchEnd < this.data.touchStart) {
                page++;
            } else {
                page--;
            }
            // console.log(page);
            // 边界处理 是否允许滑动
            if (page < 0) {
                page = 0;
            }
            const max = this.data.pages.length - 1;
            if (page > max) {
                page = max;
            }

            // 不等于才移动
            if(oriPage !== page){
                this.movePage(page);
            }

        },

        togglePlay(){
            this.setData({
                isPlay: !this.data.isPlay
            });
        },
        pageClick(){
            this.triggerEvent('pageClick');
        }
    }

});