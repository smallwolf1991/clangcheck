/**
 * Created by smallwolf on 2017/8/4.
 */
"use strict";
let request = require('request');
let crypto = require('crypto');
let iconv = require('iconv-lite');

function extendsFunc(ns) {
  ns.Request = async (opts) => {
    opts.timeout = opts.timeout || 30 * 1000;
    opts.json = opts.json === undefined ? true : opts.json;
    let throwError = opts.doesNotThrow === undefined ? true : !opts.doesNotThrow;
    delete opts.doesNotThrow;
    return await new Promise((resolve, reject) => {
      request(opts,
        function (error, response, body) {
          if (error && throwError) {
            return reject(new MJSERVER.Exception(MJSERVER.errors.ERROR_REQUEST, error.message));
          }
          else if (error && !throwError) {
            console.error('request error:', error);
            resolve(0);
          }
          if (opts.json) {
            if (body.errcode === 0) {
              resolve(body);
            }
            else if (throwError) {
              reject(new MJSERVER.Exception(body.errcode, `[${opts.url}]` + body.errmsg || body));
            }
            else {
              console.error('request error:', `[${opts.url}]` + body);
              resolve(0);
            }
          }
          else {
            resolve(body);
          }
        });
    });
  };
  ns.Request.post = async (url, data = {}, opts = {}) => {
    opts = Object.assign({}, {
      url: url,
      method: 'post',
      json: true,
      body: data,
    }, opts);
    return await ns.Request(opts);
  };
  ns.Request.get = async (url, qs = {}, opts = {}) => {
    opts = Object.assign({}, {
      url: url,
      method: 'get',
      json: true,
      qs: qs,
      headers: {
        'Cache-Control': 'no-cache'
      }
    }, opts);
    return await ns.Request(opts);
  };
  
  ns.ip2long = function ip2long(ip_address) {
    var output = false;
    if (ip_address.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
      var parts = ip_address.split('.');
      var output = 0;
      output = ( parts [0] * Math.pow(256, 3) ) +
        ( parts [1] * Math.pow(256, 2) ) +
        ( parts [2] * Math.pow(256, 1) ) +
        ( parts [3] * Math.pow(256, 0) );
    }
    
    return output << 0;
  }
  
  ns.long2ip = function long2ip(proper_address) {
    proper_address = proper_address >>> 0;
    var output = false;  // www.
    
    if (!isNaN(proper_address) && ( proper_address >= 0 || proper_address <= 4294967295 )) {
      output = Math.floor(proper_address / Math.pow(256, 3)) + '.' +
        Math.floor(( proper_address % Math.pow(256, 3) ) / Math.pow(256, 2)) + '.' +
        Math.floor(( ( proper_address % Math.pow(256, 3) ) % Math.pow(256, 2) ) /
          Math.pow(256, 1)) + '.' +
        Math.floor(( ( ( proper_address % Math.pow(256, 3) ) % Math.pow(256, 2) ) %
          Math.pow(256, 1) ) / Math.pow(256, 0));
    }
    
    return output;
  };
  
  ns.toCamel = (letter) => {
    letter = letter.replace(/[-_ ](\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
    return letter;
  };
  
  ns.checksum = (data, include) => {
    let tempObj = MJSERVER._.pick(data, include);
    let keys = Object.keys(tempObj);
    keys.sort((a, b) => {
      return a.localeCompare(b);
    });
    let str = '';
    for (let i = 0; i < keys.length; i++) {
      str += tempObj[keys[i]];
    }
    return ns.md5(str);
  };
  
  ns.checkPrivateAPIAccess = (targetToken, rightToken) => {
    if (targetToken !== rightToken) {
      throw new MJSERVER.Exception(MJSERVER.errors.ERROR_TOKEN_CHECK);
    }
  };
  
  ns.rsa = (str, encoding = 'utf8') => {
    let hash = crypto.createHash('sha256');
    return hash.update(str, encoding).digest('base64');
  };
  
  ns.md5 = (str, encoding = 'utf8') => {
    return crypto.createHash('md5').update(str, encoding).digest('hex');
  };
  
  ns.encrypt = (str, type, encoding = 'utf8') => {
    return crypto.createHash(type).update(str, encoding).digest('hex');
  };
  
  ns.genSign = (data, excludes = [], keyValue, keyField = 'key', encoding = 'utf8') => {
    let keys = Object.keys(data);
    let useKeys = keys.filter(key => {
      return !~excludes.indexOf(key);
    });
    useKeys.sort((k1, k2) => {
      return k1.localeCompare(k2);
    });
    let paramsStrArr = [];
    for (let i = 0; i < useKeys.length; i++) {
      let key = useKeys[i];
      let val = data[key];
      if (val === null || val === undefined) {
        val = '';
      }
      paramsStrArr.push(`${key}=${val}`);
    }
    paramsStrArr.unshift(`version=1`);
    paramsStrArr.push(`${keyField}=${keyValue}`);
    
    let paramsStr = paramsStrArr.join('&');
    let sign = ns.md5(paramsStr, encoding);
    return sign;
  };
  ns.genHeePaySign = (data, key, seqNames = ['version', 'agent_id', 'agent_bill_id', 'agent_bill_time', 'pay_type', 'pay_amt', 'notify_url', 'user_ip',]) => {
    const orderNames = seqNames;
    let keys = Object.keys(data);
    let useKeys = keys.filter(key => {
      return ~orderNames.indexOf(key);
    });
    useKeys.sort((k1, k2) => {
      return orderNames.indexOf(k1) > orderNames.indexOf(k2) ? 1 : -1;
    });
    let paramsStrArr = [];
    for (let i = 0; i < useKeys.length; i++) {
      let key = useKeys[i];
      let val = data[key];
      if (val === null || val === undefined) {
        val = '';
      }
      paramsStrArr.push(`${key}=${val}`);
    }
    paramsStrArr.push(`key=${key}`);
    
    let paramsStr = paramsStrArr.join('&');
    let sign = ns.md5(paramsStr);
    data.sign = sign;
    return data;
  };
  
  ns.randStr = function (len, seed) {
    seed = seed || '0123456789';
    let result = [];
    for (let i = 0; i < len; i++) {
      result.push(seed[Math.floor(Math.random() * seed.length)]);
    }
    return result.join('');
  };
  
  ns.toBase64 = function (content, encoding = 'utf8') {
    return iconv.encode(content, encoding).toString('base64');
  }
  
  ns.fromBase64 = function (content, encoding = 'utf8') {
    return iconv.decode(new Buffer(content, 'base64'), encoding);
  };
  
  ns.getIPv4 = (ip, sep = '.') => {
    let userIp = ip || '127.0.0.1';
    userIp = userIp.replace(/[\s\S]*?(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})[\s\S]*?/g, `$1${sep}$2${sep}$3${sep}$4`);
    return userIp;
  };
  
  ns.gb2312ToUtf8 = (str) => {
    let errMessage = '';
    if (!str) {
      return '';
    }
    try {
      let gb2312Str = str.replace(/%/g, ',0x').split(',');
      gb2312Str.shift();
      let buff = new Buffer(gb2312Str);
      errMessage = iconv.decode(buff, 'gb2312');
    }
    catch (e) {
      errMessage = '';
    }
    return errMessage;
  };
  ns.redisSetx = async function (key, value, ttl) {
    return new Promise((success, fail) => {
      MJSERVER.redis.setex(key, ttl, value, function (err, ret) {
        if (err) {
          return fail(err);
        }
        success(ret);
      });
    });
  };
  ns.redisGet = async function (key) {
    return new Promise((success, fail) => {
      MJSERVER.redis.get(key, function (err, ret) {
        if (err) {
          return fail(err);
        }
        success(ret);
      });
    });
  };
  
  ns.getAccessToken = async function getAccessToken() {
    
    const type = 'PUBLIC_ACCOUNT';
    var info = MJSERVER.config.WEICHAT_CONFIG[type];
    if (info == null) {
      throw new MJSERVER.Exception(-1, 'APP KEY Can\'t found.');
    }
    
    var opts = {
      url: MJSERVER.constants.OAUTH_INFO.getAccessToken2.url,
      method: 'get',
      json: false,
      qs: {
        appid: info.appid,
        secret: info.secret,
        grant_type: "client_credential"
      }
    };
    
    let res = await MJSERVER._.Request(opts);
    res = JSON.parse(res);
    if (res.errcode) {
      throw new MJSERVER.Exception(res.errcode, res.errmsg);
    }
    let ret = await ns.redisSetx(MJSERVER.constants.ACCESS_TOKEN_CACHE_KEY, res.access_token, 3600 * 2);
    console.log('refresh access token', Date.now());
    return res.access_token;
  };
  return ns;
}

module.exports = extendsFunc;