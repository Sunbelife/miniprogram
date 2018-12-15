
const App = getApp();
Page({
    data: {
        
    },
    
    goHome(){
        console.log(123);
        // 需要重新加载
        wx.navigateBack()
    }


});
