import axios from 'axios';

let env = "prod";

if (process.env.NODE_ENV === 'development') {
    env = 'dev';
}

let request = axios.create();

let baseURLOb = {
    dev:"/client",
    prod:"",
};

request.defaults.timeout = 2500;
request.defaults.baseURL = baseURLOb[env];

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


let apiOb = {
    dev: {
        login: "/login",
        musicList: "/musicList",
        musicDel: "/musicDel",
        musicUpload: "/musicUpload",
        marryInfo: "/marryInfo",
        banquetInfo: "/banquetInfo",
        tplList: "/tplList",
        tplDel: "/tplDel",
    },
    prod: {
        login: "/verify_user",
        musicList: "/get_music_list",
        musicDel: "/del_music",
        musicUpload: "/upload_music",
        marryInfo: "/get_attend_info_marry_man",
        banquetInfo: "/get_attend_info_attend_man",
        tplList: "/get_model_list",
        tplDel: "/del_model",
    }
};


let api = {
    // ok
    login: apiOb[env].login,
    // ok
    musicList: apiOb[env].musicList,
    // ok
    musicDel: apiOb[env].musicDel,
    musicUpload: apiOb[env].musicUpload,
    // ok
    marryInfo: apiOb[env].marryInfo,
    banquetInfo: apiOb[env].banquetInfo,
    tplList: apiOb[env].tplList,
    tplDel: apiOb[env].tplDel,
};

export {
    request,
    api
};
