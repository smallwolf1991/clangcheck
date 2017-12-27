/**
 * Created by smallwolf on 2017/8/4.
 */
'use strict';

let myHandles = {};
let createDebug = require('debug');
let debug = createDebug('mjserver:resp');

function sendFormat(res, data, templ) {

    res.format({
        json: () => {
            res.json(data);
        },
        html: () => {
            res.send(data);
        }
    });

}

function executor(fn) {
    myHandles[fn.name] = fn;
    return function runHandle(req, res, next) {
        fn(req, res, next)
            .then(data => {
                if (data === undefined || req.timedout) {
                    return;
                }
                if (data === SM.constants.NEXT_SYMBOL) {
                    return next();
                }
                let ret = {
                    errcode: 0,
                    errmsg: 'OK',
                };
                debug(data);
                ret = Object.assign({}, ret, data);
                sendFormat(res, ret);
            })
            .catch(err => {
                console.error(`${req.method} ${req.url}`);
                console.error(err.stack || err);
                if (true) {
                    delete err.stack;
                }
                if (!err.errcode) {
                    err = new SM.Exception(SM.errors.ERROR_INTERNAL);
                }
                sendFormat(res, err, 'error');
            });
    };
}


module.exports = executor;