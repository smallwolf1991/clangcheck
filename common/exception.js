/**
 * Created by smallwolf on 2017/8/4.
 */
'use strict';

let _stackTraceLimit = 10;

class Exception extends Error {

    static get stackTraceLimit() {
        return _stackTraceLimit;
    };

    static set stackTraceLimit(value) {
        _stackTraceLimit = value;
    };

    static captureStackTrace(targetObject, constructorOpt) {
        Error.captureStackTrace(targetObject, constructorOpt);
    }

    constructor(code, msg, errData) {
        // Error.captureStackTrace = (targetObject, constructorOpt) => {
        //   Error.captureStackTrace(targetObject, constructorOpt);
        // };
        let tempMsg = '';
        if (SM._.isArray(code)) {
            tempMsg = code[1];
            code = code[0];
        }
        if (SM._.isFunction(tempMsg)) {
            msg = tempMsg(msg);
        }
        else if (SM._.isEmpty(msg)) {
            msg = tempMsg;
        }
        Error.stackTraceLimit = _stackTraceLimit;
        super(`${Exception.name} -> ${msg}[${code}]`);
        this.errcode = code;
        this.errmsg = msg || 'Unknown error';
        this.fallback = errData;
    }
}

Exception.stackTraceLimit = 5;

module.exports = Exception;