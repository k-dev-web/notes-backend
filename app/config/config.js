'use strict';
const config = require('./conf.json')

module.exports.get = function get(env) {
    return config[env] || config.default;
}
