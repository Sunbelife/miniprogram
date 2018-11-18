
const app = getApp();

Page({
  data: {
   
  },

  onLoad: function () {

  },
  share: function () {
    wx.showShareMenu({
      withShareTicket: true,
      success(e){
        console.log(e);
      },
      fail(e){
        console.log(e);
      },
      complete(e){
        console.log(e);
      }
    })
  },
  onShareAppMessage: function (res) {


    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
});
