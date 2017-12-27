var express = require('express');
var router = express.Router();
var debug = require('debug')('clangcheck:clang:check');

// sign = mac + ip + clang_id + bundleId + '!@#$%'
// http://47.104.80.5:5876/api/handlers/check?mac=dc:a9:04:86:c6:ff&ip=192.168.10.77&id=826232c5faf849a3a05aa2a2f7ca0952&bundleId=com.bjzhangyun.sxmj&sign=b80212b0e2159f72bb17ec9ca5e72e22

// clangswift no|2781044552|1d67e201540142de3ff050a9a83ea2a8            result|~Timestamp(s)>>>0|sign
// clangswift sign = md5(result + Timestamp(s) + '!@#$%')

// clanginfo 13|2781039533|72f7b253f49a4f62d7a6fcc6441eb1b3   count|~Timestamp(s)>>>0|sign
// clanginfo sign = md5(count + Timestamp(s) + '!@#$%')

router.get('/check', function (req, res) {
    let data = req.query;
    data = Object.assign({mac: null, ip: null, id: null, bundleId: null, sign: null}, data);

    // debug("MAC:%s, IP:%s, userId:%s, bundleId:%s | md5(mac + ip + id + bundleId + priStr) = %s", data.mac, data.ip, data.id, data.bundleId, data.sign);
    let reqRealSign = SM._.md5(`${data.mac}${data.ip}${data.id}${data.bundleId}!@#$%`);
    if (reqRealSign !== data.sign) {
        res.send('failed');
        return;
    }

    // 时间戳取反的无符号整数
    let curTimestamp = Math.floor(Date.now() / 1000);

    let notTimestamp = (~curTimestamp) >>> 0;

    let ret = 'yes';

    let sign = SM._.md5(`${ret}${curTimestamp}!@#$%`);
    ret = `${ret}|${notTimestamp}|${sign}`;
    debug(ret);
    res.send(ret);
});

module.exports = router;
