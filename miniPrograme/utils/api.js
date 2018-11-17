const apiUrl = getApp().globalData.domain + '/api';
const apiUrlFiles = '../apiDataBack';
function isPublic() {
    return !!getApp().isPublish;
}

const wxRequest = (params, url) => {
    console.log(params, url);
    // wx.showLoading({
    //     title: '加载中...'
    // });

    const WZToken = wx.getStorageSync('WZToken');
    console.log('WZToken', WZToken);
    wx.request({
        url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            WZToken: WZToken ? WZToken : '',
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
    getUserInfo: '/GetWxxcxUserInfo',

    index: '/ckindex',

    // 景区
    scenicSpot: '/scenic',

    scenicSpotDetail: '/scenicdetail',


    // 森林人家
    forestFamily: '/homestay',
    forestFamilyDetail: '/hoteldetail',


    // 商铺
    stores: '/shop',
    storesDetail: '/shopdetail',

    // 餐饮
    farmhouse: '/restaurant',
    farmhouseDetail: '/restaurantdetail',
    ewmGen: '/create_qrcode',

    // 酒店
    hotel: '/hotel',
    hotelDetail: '/hoteldetail',


    // 特产
    specialProduct: '/goods',
    specialProductDetail: '/goodsshopindex',

    // 新闻
    news: '/getArticleList',
    newsInfo: '/getTravelInfo',
    newsDetail: '/getCmsbyId',
    newsTypes: '/getArticleType',

    // 旅游咨询电话
    travelTelephone: '/getTravelTel',
    // 一键住宿
    oneKeyLodging: '/quickNavHotel',
    // newsDetail: '/getCmsDetail',

    // 订单
    orderGenerator: '/addorder',
    orderGenerator_stores: '/handleshoporder',
    orderConfirm: '/orderconfirm',
    prepay: '/prepay',
    order: '/getuserorder',
    orderDel: '/delorder',

    // 评论
    comment: '/getusercommentlist', //用户评论
    commentMore: '/getcomment', //更多用户评论
    commentDel: '/delcomment',
    commentWrite: '/comment',

    complaint: '/addcomplaint', // 投诉
    complaintList: '/getcomplaint', // 投诉列表
    complaintDel: '/delcomplaint', // 投诉删除

    // 收藏
    collection: '/getcollection',
    collectionOperator: '/collection',
    collectionCancelOperator: '/delcollection',
    allScenicSpot: '/getScenicPoint',

    // 游记
    travels: '/travellist',
    travelsDel: '/delnotes',
    travelsWrite: '/addtravelnotes',

    // 上传图片
    uploadImg: '/uploadwxxcximg',
    // 城市风光
    city: '/getCityPanorama',
    // 交通指南
    trafficGuide: '/getCkShoppingGuide',
    // city: '/getIndexPanorama',

    orderDetail: '/getorderdetail',

    //识别
    authocr: '/getImgUrlByMedieIdCard'

};


const urlsFiles = {
    // 登录
    login: '/login.js',
    getUserInfo: '/getUserInfo.js',


    index: '/index.js',

    // 景区
    scenicSpot: '/scenic',
    scenicSpotDetail: '/scenicSpotDetail.js',

    // 商铺
    stores: '/shop',
    storesDetail: '/storesDetail.js',

    // 餐饮
    farmhouse: '/restaurant',
    farmhouseDetail: '/farmhouseDetail.js',

    forestFamilyDetail: '/farmhouseDetail.js',

    // 酒店
    hotel: '/hotel',
    hotelDetail: '/hotelDetail.js',

    // 特产
    specialProduct: '/goods',
    specialProductDetail: '/specialProductDetail.js',

    // 新闻
    news: '/news.js',
    newsDetail: '/getCmsbyId',
    // newsDetail: '/getCmsDetail',

    // 订单
    orderGenerator: '/addorder',
    orderGenerator_stores: '/handleshoporder',
    orderConfirm: '/orderconfirm',
    prepay: '/prepay',
    order: '/getuserorder',
    orderDel: '/delorder',

    // 评论
    comment: '/getusercommentlist', //用户评论
    commentMore: '/getcomment', //更多用户评论
    commentDel: '/delcomment',
    commentWrite: '/comment',

    complaint: '/complaint.js', // 投诉
    complaintList: '/getcomplaint', // 投诉列表
    complaintDel: '/delcomplaint', // 投诉删除
    // 收藏
    collection: '/getcollection',
    collectionOperator: '/collectionOperator.js',
    collectionCancelOperator: '/collectionCancelOperator.js',

    // 游记
    travels: '/travellist',
    travelsDel: '/delnotes',
    travelsWrite: '/addtravelnotes',

    // 上传图片
    uploadImg: '/uploadwxxcximg',

    orderDetail: '/getorderdetail'

};


// 登录
const login = (params) => {

    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.login}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.login);
        params.success(data);
        params.complete(data);
    }

};
// 获取用户信息
const getUserInfo = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.getUserInfo}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.getUserInfo);
        params.success(data);
        params.complete(data);
    }
};

// 首页
const getIndex = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.index}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.index);
        params.success(data);
        params.complete(data);
    }
};

// 景区详情
const scenicSpotDetail = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.scenicSpotDetail}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.scenicSpotDetail);
        params.success(data);
        params.complete && params.complete(data);
    }

};

const farmhouseDetail = (params) => {

    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.farmhouseDetail}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.farmhouseDetail);
        params.success(data);
        params.complete && params.complete(data);
    }

};
const storesDetail = (params) => {

    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.storesDetail}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.storesDetail);
        params.success(data);
        params.complete && params.complete(data);
    }


};

// 酒店详情
const hotelDetail = (params) => {

    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.hotelDetail}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.hotelDetail);
        params.success(data);
        params.complete && params.complete(data);
    }
};

// 特产详情
const specialProductDetail = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.specialProductDetail}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.specialProductDetail);
        params.success(data);
        params.complete && params.complete(data);
    }
};

// 收藏
const collectionOperator = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.collectionOperator}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.collectionOperator);
        params.success(data);
        params.complete && params.complete(data);
    }
};
// 取消收藏
const collectionCancelOperator = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.collectionCancelOperator}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.collectionCancelOperator);
        params.success(data);
        params.complete && params.complete(data);
    }
};
// 投诉
const complaint = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.complaint}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.complaint);
        params.success(data);
        params.complete && params.complete(data);
    }
};

// 投诉列表
const complaintList = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.complaintList}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.complaintList);
        params.success(data);
        params.complete && params.complete(data);
    }
};
// 投诉删除
const complaintDel = (params) => {
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.complaintDel}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.complaintDel);
        params.success(data);
        params.complete && params.complete(data);
    }
};

//新闻
const news = (params) => {
    console.log("新闻新闻新闻新闻新闻新闻");
    console.log(urlsFiles.news);
    if (isPublic()) {
        wxRequest(params, `${apiUrl}${urls.news}`);
    } else {
        const data = require(apiUrlFiles + urlsFiles.news);
        params.success(data);
        params.complete && params.complete(data);
    }

};


// 城市风光
const city = (params) => {
    wxRequest(params, `${apiUrl}${urls.city}`);
};
// 城市风光
const trafficGuide = (params) => {
    wxRequest(params, `${apiUrl}${urls.trafficGuide}`);
};

// 城市风光
const allScenicSpot = (params) => {
    wxRequest(params, `${apiUrl}${urls.allScenicSpot}`);
};

// 新闻类型
const newsTypes = (params) => {
    wxRequest(params, `${apiUrl}${urls.newsTypes}`);
};


// 旅游咨询电话
const travelTelephone = (params) => {
    wxRequest(params, `${apiUrl}${urls.travelTelephone}`);
};


// 一键住宿
const oneKeyLodging = (params) => {
    wxRequest(params, `${apiUrl}${urls.oneKeyLodging}`);
};

// 旅游助手
const newsInfo = (params) => {
    wxRequest(params, `${apiUrl}${urls.newsInfo}`);
};


const newsDetail = (params) => {
    wxRequest(params, `${apiUrl}${urls.newsDetail}`);
};


const orderGenerator = (params) => {
    wxRequest(params, `${apiUrl}${urls.orderGenerator}`);
};

const orderGenerator_stores = (params) => {
    wxRequest(params, `${apiUrl}${urls.orderGenerator_stores}`);
};
const travelsWrite = (params) => {
    wxRequest(params, `${apiUrl}${urls.travelsWrite}`);
};
const travelsDel = (params) => {
    wxRequest(params, `${apiUrl}${urls.travelsDel}`);
};
const getTravels = (params) => {
    wxRequest(params, `${apiUrl}${urls.travels}`);
};
const commentMore = (params) => {
    wxRequest(params, `${apiUrl}${urls.commentMore}`);
};

const commentDel = (params) => {
    wxRequest(params, `${apiUrl}${urls.commentDel}`);
};


const orderDel = (params) => {
    wxRequest(params, `${apiUrl}${urls.orderDel}`);
};

const commentWrite = (params) => {
    wxRequest(params, `${apiUrl}${urls.commentWrite}`);
};


const getScenicSpot = (params) => {
    wxRequest(params, `${apiUrl}${urls.scenicSpot}`);
};

const forestFamily = (params) => {
    wxRequest(params, `${apiUrl}${urls.forestFamily}`);
};
const forestFamilyDetail = (params) => {
    wxRequest(params, `${apiUrl}${urls.forestFamilyDetail}`);
};


const getStores = (params) => {
    wxRequest(params, `${apiUrl}${urls.stores}`);
};


const getOrder = (params) => {
    wxRequest(params, `${apiUrl}${urls.order}`);
};

const getOrderDetail = (params) => {
    wxRequest(params, `${apiUrl}${urls.orderDetail}`);
};
const getFarmhouse = (params) => {
    wxRequest(params, `${apiUrl}${urls.farmhouse}`);
};
const getHotel = (params) => {
    wxRequest(params, `${apiUrl}${urls.hotel}`);
};


const getCollection = (params) => {
    wxRequest(params, `${apiUrl}${urls.collection}`);
};
const getSpecialProduct = (params) => {
    wxRequest(params, `${apiUrl}${urls.specialProduct}`);
};


const getComment = (params) => {
    wxRequest(params, `${apiUrl}${urls.comment}`);
};


const orderConfirm = (params) => {
    wxRequest(params, `${apiUrl}${urls.orderConfirm}`);
};


const prepay = (params) => {
    wxRequest(params, `${apiUrl}${urls.prepay}`);
};

const authOcr = (params) => {
  wxRequest(params, `${apiUrl}${urls.authocr}`);
}

const ewmGen = (params) => {
  wxRequest(params, `${apiUrl}${urls.ewmGen}`);
}

function getUrl(name) {
    return `${apiUrl}${urls[name]}`
}



module.exports = {
    login,
    getUserInfo,
    getUrl,
    ewmGen,
    travelsWrite,
    prepay,

    getIndex,
    farmhouseDetail,
    scenicSpotDetail,
    specialProductDetail,
    travelsDel,
    getScenicSpot,
    commentDel,
    allScenicSpot,
    getStores,
    hotelDetail,
    orderDel,
    getOrderDetail,
    getSpecialProduct,
    getCollection,
    getFarmhouse,
    getComment,
    orderGenerator,
    orderConfirm,
    orderGenerator_stores,
    commentMore,
    commentWrite,
    getTravels,
    city,
    travelTelephone,
    collectionOperator,
    collectionCancelOperator,
    newsDetail,
    complaint,
    forestFamily,
    forestFamilyDetail,
    oneKeyLodging,
    newsInfo,
    news,
    newsTypes,
    getHotel,
    getOrder,
    complaintList,
    complaintDel,
    trafficGuide,
    storesDetail,
    authOcr
};
