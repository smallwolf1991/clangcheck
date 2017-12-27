/**
 * Created by smallwolf on 2017/8/4.
 */
'use strict';
let debug = require('debug')('mjserver:global:attach');
let publicProps = new Proxy({}, {
    set: function (target, name, value, receiver) {
        if (publicProps[name]) {
            throw new Error(`${__filename} has some dup key. key:${name}`);
        }
        let success = Reflect.set(target, name, value, receiver);
        debug('attach prop: %s to global', name);
        return success;
    }
});
global.SM = publicProps;

publicProps.moment = require('moment');
publicProps.errors = require('./errors.js');
publicProps.Exception = require('./exception.js');
publicProps.constants = require('./constants.js');
publicProps.co = require('./co.js');
publicProps._ = require('lodash');
require('./lodash_extend.js')(publicProps._);

module.exports = publicProps;