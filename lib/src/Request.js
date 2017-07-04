const _ = require('lodash');
const request = require('request');
const querystring = require('querystring');
const Exception = require('./Exception');

class VoodooRequest {

    constructor() { }

    urlJoin() {
        let str = [].slice.call(arguments).join('/');
        str = str.replace(/:\//g, '://');
        // remove consecutive slashes
        str = str.replace(/([^:\s])\/+/g, '$1/');
        // remove trailing slash before parameters or hash
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');
        // replace ? in parameters with &
        str = str.replace(/(\?.+)\?/g, '$1&');
        return str;
    }

    getUriBase() {
        const PROTOCOL = 'https';
        const URI = 'www.voodoosms.com/vapi/server/';
        return `${PROTOCOL}://${URI}`;
    }

    buildQuery (args) {
        return _.isObject(args) && !_.isEmpty(args) ? `?${querystring.stringify(args)}` : '';
    }

    getUrl(method, args) {
        return this.urlJoin(this.getUriBase(), method, this.buildQuery(args));
    }

    getResponse(method, params) {
        return this.getResponseAsync(method, params);
        // custom response validation could be here
    }

    getResponseAsync(method, params) {
        let options = {
            method: 'GET',
            url: this.getUrl(method, params),
            header: {}
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                resolve(JSON.parse(body));
            });
        });
    }

}

module.exports = VoodooRequest;