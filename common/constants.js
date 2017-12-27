/**
 * Created by Administrator on 2017/7/31 0031.
 */
let _constant = {};
let CONSTANT = new Proxy(_constant, {
    set: function (target, name, value, receiver) {
        if (_constant[name]) {
            throw new Error(`${__filename} has some dup key. key:${name}`);
        }
        let success = Reflect.set(target, name, value, receiver);
        return success;
    }
});
CONSTANT.SESSION_KEY = 'test';
CONSTANT.NEXT_SYMBOL = Symbol['NEXT_SYMBOL'];
CONSTANT.MJ_TYPE = {
    TONG: 0,
    TIAO: 1,
    WAN: 2,
    FENG: 3,
    ZHONG: 4,
    FA: 5,
    BAIBAN: 6,

};
CONSTANT.MANUAL_TYPE = {
    GET_ROOMS: 'rooms',
    GET_ROOM_DETAIL: 'room',
    DEAL_INIT: 'initial',
    DEAL_MANUAL: 'manual',
    SET_REMAIN: 'remain',
    DEAL_SPEC_BY_USERID: 'userspec',
};
CONSTANT.STATISTIC_INTERVAL = 5 * 60 * 1000;
CONSTANT.TABLE_PREFIX = 't_';
CONSTANT.DEFAULT_COIN = 0;
CONSTANT.DEFAULT_GEM = 10;
CONSTANT.DEFAUTLT_INVITION_GEM = 3;
CONSTANT.DEFAUTLT_SHARE_GEM = 3;
CONSTANT.OAUTH_INFO = {
    getCode: {
        url: (appId, redirectUri, scope, state) => {
            return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        }
    },
    getAccessToken: {
        url: "https://api.weixin.qq.com/sns/oauth2/access_token"
    },
    getUserInfo: {
        url: "https://api.weixin.qq.com/sns/userinfo"
    },
    getAccessToken2: {
        url: 'https://api.weixin.qq.com/cgi-bin/token'
    },
    getTicket: {
        //access_token=ACCESS_TOKEN&type=jsapi
        url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket'
    },
    getFile: {
        //access_token=ACCESS_TOKEN&media_id=jsapi
        url: 'http://file.api.weixin.qq.com/cgi-bin/media/get'
    }
};
CONSTANT.RESULT_TYPE = {
    SUCCESS: 1,
    FAIL: 0
};
CONSTANT.GEM_COST_TYPE = {
    RECHAGE: 10,
    CREATE_ROOM_COST: 1,
    CREATE_ROOM_NOJOIN_COST: 2,
    CREATE_ROOM_RETURNED: 6,
    SYS_COST: 5,
    SYS_SEND: 4,
    PROXY_ASSIGN: 3,//代理充值
    PROXY_RECHARGE_COST: 7,//代理充值消耗
};
CONSTANT.ROOM_TYPE = {
    NORMAL: 1,
    WAIT_ROOM: 2
};
CONSTANT.PAY_STATUS = {
    SUBMIT_ORDER: 1,
    WAIT_PAYING: 2,
    CANCLE_PAY: 3,
    SUCCESS_PAY: 4,
    FAIL_PAY: 5
};
CONSTANT.INVITION_STATUS = {
    NO_ACTIVE: 1,
    ACTIVE: 2
};

CONSTANT.COMMON_STATUS = {
    NORMAL: 1,
    LOCK: 2,
    DELETE: -1,
};

CONSTANT.GENDER = {
    SECRET: 0,
    MAN: 1,
    WOMAN: 2
};

CONSTANT.PRODUCTS_MAP = {
    "1": {price: 0.01, gems: 1, name: '1个房卡'},
    "2": {price: 0.01, gems: 5, name: '5个房卡'},
    "3": {price: 0.01, gems: 10, name: '10个房卡'},
    "4": {price: 0.01, gems: 20, name: '20张房卡'},
    "5": {price: 0.01, gems: 40, name: '40个房卡'},
    "6": {price: 0.01, gems: 80, name: '80个房卡'},
    "7": {price: 0.01, gems: 160, name: '160个房卡'},
};
CONSTANT.PAY_TYPE = {
    // 2	汇元个人会员余额支付
    // 10	骏卡支付（话费通卡）
// 12	手机卡支付
// 13	神州行
// 14	联通卡
// 15	电信卡
// 18	银行卡快捷支付
// 22	支付宝
// 30	微信支付
// 35	盛大卡支付
// 40	第三方卡支付
// 41	盛大一卡通
// 42	网易一卡通
// 44	完美一卡通
};
CONSTANT.GUI_COUNT = [0, 1, 2, 3, 4];
CONSTANT.WAN_FA_MAP = {
    cg: 136,
    fhz: 136,
    bdf: 108,
    kpqz: 52,
    tbnn: 52,
    tbnn1: 52,
};
CONSTANT.ACCESS_TOKEN_CACHE_KEY = 'wechat:access_token';
CONSTANT.JS_TICKET_CACHE_KEY = 'wechat:js_ticket';

CONSTANT.PROXY_LEVEL = {
    ZONGDAI: 1,
    HUIZHANG: 2,
    GAOJIDAILI: 3,
    DAILI: 4
};
CONSTANT.ROOM_PAY_TYPE = {
    AA: 1,
    SINGLE: 2
};

module.exports = CONSTANT;