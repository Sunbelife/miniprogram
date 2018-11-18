const apiUrl = getApp().globalData.domain + '/api';



const wxRequest = (params, url) => {
    console.log(params, url);
    // wx.showLoading({
    //     title: '加载中...'
    // });

    const Token = wx.getStorageSync('Token');
    console.log('Token', Token);
    wx.request({
        url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            WZToken: Token ? Token : '',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        success(res) {
            console.log(res);
            if (params.success) {
                params.success(res);
            }
        },
        fail(res) {
            console.log(res);
            if (params.fail) {
                params.fail(res);
            }
        },
        complete(res) {
            console.log(res);
            // wx.hideLoading();
            if (params.complete) {
                params.complete(res);
            }
        }
    });

};


const urls = {
    // 登录
    login: '/WxxcxLoginByCode',

};

// 登录
const login = (params) => {
    wxRequest(params, `${apiUrl}${urls.login}`);
};


function getUrl(name) {
    return `${apiUrl}${urls[name]}`
}



module.exports = {
    login,
    getUrl,
};
